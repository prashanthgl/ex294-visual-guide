import React, { useState } from 'react'
import PageHeader from '../components/PageHeader'
import CodeBlock from '../components/CodeBlock'
import InfoBox from '../components/InfoBox'

const CATEGORIES = [
  { key: 'packages', label: 'Packages & Repos', icon: '📦', color: '#34d399' },
  { key: 'services', label: 'Services', icon: '⚙', color: '#818cf8' },
  { key: 'firewall', label: 'Firewall', icon: '🛡', color: '#fb7185' },
  { key: 'filesystem', label: 'Filesystems', icon: '💾', color: '#38bdf8' },
  { key: 'storage', label: 'Storage (LVM)', icon: '🗄', color: '#f97316' },
  { key: 'files', label: 'File Content', icon: '📄', color: '#fbbf24' },
  { key: 'archive', label: 'Archiving', icon: '🗜', color: '#a78bfa' },
  { key: 'cron', label: 'Scheduling', icon: '🕐', color: '#34d399' },
  { key: 'security', label: 'Security', icon: '🔐', color: '#fb7185' },
  { key: 'users', label: 'Users & Groups', icon: '👥', color: '#38bdf8' },
]

export default function AutomationTasks() {
  const [activeCategory, setActiveCategory] = useState('packages')

  return (
    <div className="page-container fade-in">
      <PageHeader
        title="Automate RHCSA Tasks"
        icon="⚡"
        description="Complete, working Ansible playbooks for every RHCSA task category — packages, services, firewall, storage, users, SELinux, and more."
        tags={['dnf', 'service', 'firewalld', 'LVM', 'user', 'SELinux', 'cron', 'template']}
      />

      <p>
        The RHCE exam requires you to automate standard system administration tasks using Ansible.
        This section provides <strong>complete, production-ready playbooks</strong> for every
        RHCSA task category you're expected to automate.
      </p>

      {/* Category grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '10px', margin: '1.5rem 0',
      }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            style={{
              padding: '14px 12px',
              borderRadius: 'var(--radius-lg)',
              border: `1px solid ${activeCategory === cat.key ? cat.color : 'var(--border-subtle)'}`,
              background: activeCategory === cat.key ? `${cat.color}15` : 'var(--bg-card)',
              color: activeCategory === cat.key ? cat.color : 'var(--text-muted)',
              cursor: 'pointer', transition: 'all 150ms',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
              boxShadow: activeCategory === cat.key ? `0 0 16px ${cat.color}33` : 'none',
            }}
          >
            <span style={{ fontSize: '1.4rem' }}>{cat.icon}</span>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, textAlign: 'center' }}>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* ── SOFTWARE PACKAGES ─────────────────────────────────── */}
      {activeCategory === 'packages' && (
        <>
          <h2 className="section-title">Software Packages &amp; Repositories</h2>

          <CodeBlock
            language="yaml"
            filename="playbooks/packages.yml"
            code={`---
- name: Manage software packages and repositories
  hosts: all
  become: true

  vars:
    required_packages:
      - httpd
      - php
      - php-mysqlnd
      - mod_ssl
    removed_packages:
      - telnet
      - ftp
    custom_repo_url: http://repo.example.com/rhel9/

  tasks:

    # ── INSTALL SINGLE PACKAGE ─────────────────────────────────
    - name: Install a package
      ansible.builtin.dnf:
        name: nginx
        state: present      # present | absent | latest | installed

    # ── INSTALL MULTIPLE PACKAGES ──────────────────────────────
    - name: Install required packages
      ansible.builtin.dnf:
        name: "{{ required_packages }}"
        state: present

    # ── ENSURE LATEST VERSION ──────────────────────────────────
    - name: Update specific packages to latest
      ansible.builtin.dnf:
        name:
          - kernel
          - openssl
          - openssh
        state: latest

    # ── REMOVE PACKAGES ────────────────────────────────────────
    - name: Remove insecure packages
      ansible.builtin.dnf:
        name: "{{ removed_packages }}"
        state: absent

    # ── INSTALL A PACKAGE GROUP ────────────────────────────────
    - name: Install Development Tools group
      ansible.builtin.dnf:
        name: "@Development Tools"
        state: present

    - name: Install minimal environment group
      ansible.builtin.dnf:
        name: "@^minimal-environment"
        state: present

    # ── UPDATE ALL PACKAGES ────────────────────────────────────
    - name: Update all packages
      ansible.builtin.dnf:
        name: "*"
        state: latest
      when: update_all | default(false)

    # ── CONFIGURE A CUSTOM YUM/DNF REPOSITORY ──────────────────
    - name: Add a custom DNF repository
      ansible.builtin.yum_repository:
        name: myapp-stable
        description: MyApp Stable Repository
        baseurl: "{{ custom_repo_url }}"
        enabled: true
        gpgcheck: true
        gpgkey: "{{ custom_repo_url }}/RPM-GPG-KEY-myapp"
        state: present

    # ── DISABLE A REPO ─────────────────────────────────────────
    - name: Disable a repository
      ansible.builtin.yum_repository:
        name: epel
        enabled: false
        state: present

    # ── IMPORT AN RPM GPG KEY ──────────────────────────────────
    - name: Import GPG key for custom repo
      ansible.builtin.rpm_key:
        state: present
        key: "{{ custom_repo_url }}/RPM-GPG-KEY-myapp"

    # ── INSTALL FROM LOCAL RPM ─────────────────────────────────
    - name: Copy an RPM to remote host
      ansible.builtin.copy:
        src: files/mypackage-1.0.rpm
        dest: /tmp/mypackage.rpm

    - name: Install local RPM file
      ansible.builtin.dnf:
        name: /tmp/mypackage.rpm
        state: present
        disable_gpg_check: true   # only if no GPG key is set up

    # ── QUERY INSTALLED PACKAGES ───────────────────────────────
    - name: Gather package facts
      ansible.builtin.package_facts:
        manager: auto

    - name: Check if a specific package is installed
      ansible.builtin.debug:
        msg: "httpd {{ ansible_facts.packages['httpd'][0].version }} is installed"
      when: "'httpd' in ansible_facts.packages"`}
          />

          <InfoBox type="exam">
            The exam frequently asks you to install packages and ensure a repo is configured.
            Remember: <code>state: present</code> = install, <code>state: absent</code> = remove,
            <code> state: latest</code> = update to newest version.
          </InfoBox>
        </>
      )}

      {/* ── SERVICES ──────────────────────────────────────────── */}
      {activeCategory === 'services' && (
        <>
          <h2 className="section-title">Services</h2>

          <CodeBlock
            language="yaml"
            filename="playbooks/services.yml"
            code={`---
- name: Manage systemd services
  hosts: all
  become: true

  tasks:

    # ── BASIC SERVICE MANAGEMENT ───────────────────────────────
    - name: Start and enable httpd (start now + auto-start on boot)
      ansible.builtin.service:
        name: httpd
        state: started      # started | stopped | restarted | reloaded
        enabled: true       # enable in systemd (start at boot)

    - name: Stop and disable telnet (if running)
      ansible.builtin.service:
        name: telnet
        state: stopped
        enabled: false

    - name: Restart a service (always restarts, even if running)
      ansible.builtin.service:
        name: sshd
        state: restarted

    - name: Reload a service (reload config, no downtime)
      ansible.builtin.service:
        name: nginx
        state: reloaded

    # ── SYSTEMD-SPECIFIC MODULE ────────────────────────────────
    # Use systemd module when you need daemon-reload or masking
    - name: Reload systemd daemon (after unit file changes)
      ansible.builtin.systemd:
        daemon_reload: true

    - name: Enable and start a service with daemon_reload
      ansible.builtin.systemd:
        name: myapp
        state: started
        enabled: true
        daemon_reload: true    # reload unit files before acting

    - name: Mask a service (prevent it from being started)
      ansible.builtin.systemd:
        name: bluetooth
        masked: true

    # ── DEPLOY SYSTEMD UNIT FILE ───────────────────────────────
    - name: Deploy custom systemd service unit
      ansible.builtin.copy:
        content: |
          [Unit]
          Description=My Application Service
          After=network.target

          [Service]
          Type=simple
          User=myapp
          WorkingDirectory=/opt/myapp
          ExecStart=/opt/myapp/bin/myapp --port 8080
          Restart=on-failure
          RestartSec=5

          [Install]
          WantedBy=multi-user.target
        dest: /etc/systemd/system/myapp.service
        mode: '0644'
      notify:
        - Reload systemd daemon
        - Start myapp

    # ── CHECK SERVICE STATUS ───────────────────────────────────
    - name: Gather service facts
      ansible.builtin.service_facts:

    - name: Check if httpd is running
      ansible.builtin.debug:
        msg: "httpd is {{ ansible_facts.services['httpd.service'].state }}"
      when: "'httpd.service' in ansible_facts.services"

    # ── ENSURE A SERVICE IS NOT MASKED ────────────────────────
    - name: Unmask a previously masked service
      ansible.builtin.systemd:
        name: firewalld
        masked: false

  handlers:
    - name: Reload systemd daemon
      ansible.builtin.systemd:
        daemon_reload: true

    - name: Start myapp
      ansible.builtin.service:
        name: myapp
        state: started
        enabled: true`}
          />
        </>
      )}

      {/* ── FIREWALL ──────────────────────────────────────────── */}
      {activeCategory === 'firewall' && (
        <>
          <h2 className="section-title">Firewall Rules</h2>
          <p>
            Use the <code>ansible.posix.firewalld</code> module to manage <code>firewalld</code>
            zones, services, and port rules. Key parameters: <code>permanent: true</code> persists
            after reboot; <code>immediate: true</code> applies right now.
          </p>

          <InfoBox type="key">
            Always use <strong>both</strong> <code>permanent: true</code> AND
            <code> immediate: true</code> together — otherwise the rule is either only runtime
            (lost on reboot) or only permanent (requires firewalld restart to take effect).
          </InfoBox>

          <CodeBlock
            language="yaml"
            filename="playbooks/firewall.yml"
            code={`---
- name: Configure firewall rules
  hosts: all
  become: true

  tasks:

    # ── ENSURE FIREWALLD IS RUNNING ────────────────────────────
    - name: Install and start firewalld
      ansible.builtin.dnf:
        name: firewalld
        state: present

    - name: Ensure firewalld is started and enabled
      ansible.builtin.service:
        name: firewalld
        state: started
        enabled: true

    # ── ALLOW A SERVICE BY NAME ────────────────────────────────
    # firewalld knows common services: http, https, ssh, smtp, dns, ftp...
    - name: Allow HTTP and HTTPS traffic
      ansible.posix.firewalld:
        service: "{{ item }}"
        state: enabled
        permanent: true
        immediate: true
        zone: public           # default zone if omitted
      loop:
        - http
        - https

    # ── ALLOW A SPECIFIC PORT ──────────────────────────────────
    - name: Open custom application port
      ansible.posix.firewalld:
        port: 8080/tcp
        state: enabled
        permanent: true
        immediate: true

    - name: Open a UDP port
      ansible.posix.firewalld:
        port: 514/udp          # syslog UDP
        state: enabled
        permanent: true
        immediate: true

    - name: Open a port range
      ansible.posix.firewalld:
        port: 8000-9000/tcp
        state: enabled
        permanent: true
        immediate: true

    # ── REMOVE A RULE ─────────────────────────────────────────
    - name: Block telnet port
      ansible.posix.firewalld:
        port: 23/tcp
        state: disabled
        permanent: true
        immediate: true

    - name: Remove ssh service from public zone (don't do this on exam!)
      ansible.posix.firewalld:
        service: ssh
        state: disabled
        permanent: true
        immediate: true
        zone: public
      when: remove_ssh_access | default(false)   # safety guard!

    # ── MANAGE ZONES ──────────────────────────────────────────
    - name: Move an interface to the internal zone
      ansible.posix.firewalld:
        interface: eth1
        zone: internal
        state: enabled
        permanent: true
        immediate: true

    - name: Set the default zone
      ansible.builtin.command: firewall-cmd --set-default-zone=internal
      changed_when: false

    # ── RICH RULES ────────────────────────────────────────────
    - name: Allow connections from a specific IP
      ansible.posix.firewalld:
        rich_rule: 'rule family="ipv4" source address="192.168.1.100" port port="22" protocol="tcp" accept'
        state: enabled
        permanent: true
        immediate: true

    - name: Block a specific IP
      ansible.posix.firewalld:
        rich_rule: 'rule family="ipv4" source address="10.0.0.5" drop'
        state: enabled
        permanent: true
        immediate: true

    # ── RELOAD FIREWALLD ──────────────────────────────────────
    # Only needed when permanent rules are added WITHOUT immediate: true
    - name: Reload firewalld to apply permanent rules
      ansible.builtin.command: firewall-cmd --reload
      changed_when: false

    # ── VERIFY ────────────────────────────────────────────────
    - name: List active firewall rules
      ansible.builtin.command: firewall-cmd --list-all
      register: fw_rules
      changed_when: false

    - ansible.builtin.debug:
        var: fw_rules.stdout_lines`}
          />
        </>
      )}

      {/* ── FILESYSTEMS ───────────────────────────────────────── */}
      {activeCategory === 'filesystem' && (
        <>
          <h2 className="section-title">File Systems &amp; Mounts</h2>

          <CodeBlock
            language="yaml"
            filename="playbooks/filesystems.yml"
            code={`---
- name: Manage filesystems and mounts
  hosts: all
  become: true

  tasks:

    # ── CREATE A FILESYSTEM ────────────────────────────────────
    - name: Create an XFS filesystem on /dev/sdb1
      community.general.filesystem:
        fstype: xfs              # xfs | ext4 | ext3 | vfat | swap
        dev: /dev/sdb1
        force: false             # don't overwrite if filesystem exists
        opts: "-L DATALABEL"     # mkfs options: add a label

    - name: Create ext4 filesystem
      community.general.filesystem:
        fstype: ext4
        dev: /dev/sdc
        opts: "-m 2"             # 2% reserved for root (default 5%)

    # ── CREATE MOUNT DIRECTORY ────────────────────────────────
    - name: Create mount point directory
      ansible.builtin.file:
        path: /data
        state: directory
        owner: root
        group: root
        mode: '0755'

    # ── MOUNT A FILESYSTEM ────────────────────────────────────
    # state: mounted  → mount now AND add to /etc/fstab
    # state: present  → add to /etc/fstab ONLY (don't mount yet)
    # state: unmounted → unmount but keep fstab entry
    # state: absent   → unmount AND remove from fstab

    - name: Mount filesystem permanently
      ansible.posix.mount:
        path: /data              # mount point
        src: /dev/sdb1           # device or UUID
        fstype: xfs
        opts: defaults           # mount options
        dump: 0
        passno: 0
        state: mounted           # mount NOW + fstab entry

    # ── MOUNT BY UUID (more reliable than device name) ────────
    - name: Get UUID of a device
      ansible.builtin.command: blkid -s UUID -o value /dev/sdb1
      register: blkid_output
      changed_when: false

    - name: Mount by UUID
      ansible.posix.mount:
        path: /data
        src: "UUID={{ blkid_output.stdout }}"
        fstype: xfs
        opts: "defaults,noatime"
        state: mounted

    # ── MOUNT A NETWORK SHARE (NFS) ───────────────────────────
    - name: Mount NFS share
      ansible.posix.mount:
        path: /mnt/shared
        src: "nfs-server.example.com:/exports/data"
        fstype: nfs
        opts: "defaults,_netdev,rw"
        state: mounted

    # ── SWAP ──────────────────────────────────────────────────
    - name: Create a swap file
      ansible.builtin.command:
        cmd: dd if=/dev/zero of=/swapfile bs=1M count=1024
        creates: /swapfile      # skip if file already exists

    - name: Set swap file permissions
      ansible.builtin.file:
        path: /swapfile
        mode: '0600'

    - name: Initialize the swap file
      ansible.builtin.command:
        cmd: mkswap /swapfile
      when: not ansible_facts.mounts | selectattr('device','eq','/swapfile') | list

    - name: Enable swap and add to fstab
      ansible.posix.mount:
        path: swap
        src: /swapfile
        fstype: swap
        opts: defaults
        state: present

    - name: Activate swap
      ansible.builtin.command: swapon /swapfile
      failed_when: false
      changed_when: false

    # ── UNMOUNT ───────────────────────────────────────────────
    - name: Unmount and remove from fstab
      ansible.posix.mount:
        path: /data
        state: absent`}
          />

          <InfoBox type="tip">
            The <code>ansible.posix.mount</code> module directly manages <code>/etc/fstab</code>.
            With <code>state: mounted</code>, it both mounts the filesystem <em>and</em> adds
            the fstab entry — you don't need a separate task for each.
          </InfoBox>
        </>
      )}

      {/* ── STORAGE (LVM) ─────────────────────────────────────── */}
      {activeCategory === 'storage' && (
        <>
          <h2 className="section-title">Storage Devices &amp; LVM</h2>
          <p>
            Automate the complete LVM workflow: partition disks, create physical volumes,
            build volume groups, create logical volumes, format them, and mount them —
            all in a single playbook.
          </p>

          <div style={{
            background: 'var(--bg-card)', border: '1px solid #f97316',
            borderRadius: 'var(--radius-lg)', padding: '1.5rem', margin: '1rem 0',
          }}>
            <h3 style={{ color: '#f97316', marginBottom: '1rem', fontSize: '0.9rem' }}>
              LVM Concept Hierarchy
            </h3>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', lineHeight: '2' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ color: '#38bdf8' }}>/dev/sdb, /dev/sdc</span>
                <span style={{ color: '#4b5563' }}>→</span>
                <span style={{ color: '#34d399' }}>pvcreate</span>
                <span style={{ color: '#4b5563' }}>→</span>
                <span style={{ color: '#818cf8', fontWeight: 700 }}>Physical Volumes (PVs)</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ color: '#818cf8' }}>PV1 + PV2</span>
                <span style={{ color: '#4b5563' }}>→</span>
                <span style={{ color: '#34d399' }}>vgcreate</span>
                <span style={{ color: '#4b5563' }}>→</span>
                <span style={{ color: '#fbbf24', fontWeight: 700 }}>Volume Group (VG): "datavg"</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ color: '#fbbf24' }}>datavg</span>
                <span style={{ color: '#4b5563' }}>→</span>
                <span style={{ color: '#34d399' }}>lvcreate</span>
                <span style={{ color: '#4b5563' }}>→</span>
                <span style={{ color: '#fb7185', fontWeight: 700 }}>Logical Volumes: datalv, loglv</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ color: '#fb7185' }}>/dev/datavg/datalv</span>
                <span style={{ color: '#4b5563' }}>→</span>
                <span style={{ color: '#34d399' }}>mkfs.xfs</span>
                <span style={{ color: '#4b5563' }}>→</span>
                <span style={{ color: '#c084fc', fontWeight: 700 }}>Mounted at /data</span>
              </div>
            </div>
          </div>

          <CodeBlock
            language="yaml"
            filename="playbooks/lvm-full-workflow.yml"
            code={`---
- name: Complete LVM setup — partition, PV, VG, LV, format, mount
  hosts: storage_servers
  become: true

  vars:
    disk_device: /dev/sdb          # target disk
    vg_name: datavg
    lv_name: datalv
    lv_size: 10g                   # 10 GiB; or "100%FREE" for all space
    fs_type: xfs
    mount_point: /data

  tasks:

    # ── STEP 1: PARTITION THE DISK ─────────────────────────────
    # Note: If the whole disk is used as a PV, skip partitioning
    - name: Create a primary partition using whole disk
      community.general.parted:
        device: "{{ disk_device }}"
        number: 1
        state: present
        part_end: "100%"
        flags: [ lvm ]            # mark as LVM partition type

    # ── STEP 2: CREATE PHYSICAL VOLUME ────────────────────────
    - name: Create LVM physical volume on partition
      community.general.lvg:
        pvs: "{{ disk_device }}1"  # the partition we just created
        vg: "{{ vg_name }}"        # create this VG from the PV
        state: present

    # To use the whole disk directly (no partition):
    # pvs: /dev/sdb

    # To use multiple disks in one VG:
    # pvs: /dev/sdb,/dev/sdc

    # ── STEP 3: CREATE LOGICAL VOLUME ─────────────────────────
    - name: Create logical volume
      community.general.lvol:
        vg: "{{ vg_name }}"
        lv: "{{ lv_name }}"
        size: "{{ lv_size }}"
        state: present

    # ── STEP 4: FORMAT THE LOGICAL VOLUME ─────────────────────
    - name: Create XFS filesystem on the logical volume
      community.general.filesystem:
        fstype: "{{ fs_type }}"
        dev: "/dev/{{ vg_name }}/{{ lv_name }}"
        force: false

    # ── STEP 5: CREATE MOUNT POINT ────────────────────────────
    - name: Create mount directory
      ansible.builtin.file:
        path: "{{ mount_point }}"
        state: directory
        mode: '0755'

    # ── STEP 6: MOUNT AND ADD TO FSTAB ────────────────────────
    - name: Mount the logical volume permanently
      ansible.posix.mount:
        path: "{{ mount_point }}"
        src: "/dev/{{ vg_name }}/{{ lv_name }}"
        fstype: "{{ fs_type }}"
        opts: defaults
        state: mounted

    # ── EXTEND A LOGICAL VOLUME ───────────────────────────────
    - name: Extend an existing logical volume
      community.general.lvol:
        vg: datavg
        lv: datalv
        size: 20g             # new total size
        resizefs: true        # also resize the filesystem (xfs or ext4)
        state: present

    # ── GROW XFS FILESYSTEM ───────────────────────────────────
    # xfs_growfs works on a MOUNTED filesystem (unlike resize2fs)
    - name: Grow XFS filesystem to fill LV
      ansible.builtin.command: xfs_growfs /data
      changed_when: false

    # ── REMOVE LVM STACK ──────────────────────────────────────
    - name: Remove logical volume
      community.general.lvol:
        vg: datavg
        lv: datalv
        state: absent
        force: true           # required if LV is active/mounted

    - name: Remove volume group
      community.general.lvg:
        vg: datavg
        state: absent
        force: true`}
          />
        </>
      )}

      {/* ── FILE CONTENT ──────────────────────────────────────── */}
      {activeCategory === 'files' && (
        <>
          <h2 className="section-title">File Content Management</h2>

          <CodeBlock
            language="yaml"
            filename="playbooks/file-content.yml"
            code={`---
- name: Manage file content
  hosts: all
  become: true

  tasks:

    # ── COPY A FILE ───────────────────────────────────────────
    - name: Copy a file from control node
      ansible.builtin.copy:
        src: files/httpd.conf       # relative to playbook/role files/ dir
        dest: /etc/httpd/conf/httpd.conf
        owner: root
        group: root
        mode: '0644'
        backup: true              # create backup before overwriting
      notify: Restart httpd

    # ── COPY WITH INLINE CONTENT ──────────────────────────────
    - name: Write content directly to a file
      ansible.builtin.copy:
        content: |
          # Managed by Ansible — do not edit manually
          ServerName {{ ansible_fqdn }}
          DocumentRoot /var/www/html
          ErrorLog /var/log/httpd/error.log
        dest: /etc/httpd/conf.d/custom.conf
        mode: '0644'

    # ── DEPLOY A TEMPLATE ─────────────────────────────────────
    - name: Render and deploy Jinja2 template
      ansible.builtin.template:
        src: templates/app.conf.j2  # .j2 file with Jinja2 variables
        dest: /etc/myapp/app.conf
        owner: myapp
        group: myapp
        mode: '0640'
        validate: /usr/bin/myapp --check-config %s

    # ── ENSURE A LINE EXISTS ──────────────────────────────────
    # lineinfile: manage individual lines, regex-aware
    - name: Set kernel sysctl in sysctl.conf
      ansible.builtin.lineinfile:
        path: /etc/sysctl.conf
        regexp: '^net.ipv4.ip_forward'
        line: 'net.ipv4.ip_forward = 1'
        state: present
        create: true              # create file if it doesn't exist

    - name: Comment out a line
      ansible.builtin.lineinfile:
        path: /etc/sysconfig/network
        regexp: '^NETWORKING=no'
        line: '#NETWORKING=no'

    - name: Remove a line matching a pattern
      ansible.builtin.lineinfile:
        path: /etc/hosts
        regexp: '^10\.0\.0\.5\s'
        state: absent

    - name: Insert a line after a specific line
      ansible.builtin.lineinfile:
        path: /etc/ssh/sshd_config
        insertafter: '^#MaxAuthTries'
        line: 'MaxAuthTries 3'

    # ── INSERT/REPLACE A BLOCK ────────────────────────────────
    # blockinfile: manage a block of text bounded by markers
    - name: Add proxy settings to /etc/environment
      ansible.builtin.blockinfile:
        path: /etc/environment
        marker: "# {mark} ANSIBLE MANAGED — proxy settings"
        block: |
          http_proxy=http://proxy.example.com:8080
          https_proxy=http://proxy.example.com:8080
          no_proxy=localhost,127.0.0.1,.example.com
        state: present
        create: true

    - name: Remove the managed block
      ansible.builtin.blockinfile:
        path: /etc/environment
        marker: "# {mark} ANSIBLE MANAGED — proxy settings"
        state: absent

    # ── REPLACE ALL OCCURRENCES ───────────────────────────────
    - name: Replace all occurrences of old domain
      ansible.builtin.replace:
        path: /etc/httpd/conf/httpd.conf
        regexp: 'old\.example\.com'
        replace: 'new.example.com'
        backup: true

    # ── MANAGE FILE ATTRIBUTES ────────────────────────────────
    - name: Set file permissions and ownership
      ansible.builtin.file:
        path: /opt/myapp
        owner: myapp
        group: myapp
        mode: '2755'    # setgid bit + rwxr-xr-x
        recurse: true   # apply recursively to all children
        state: directory

    - name: Create a symlink
      ansible.builtin.file:
        src: /opt/myapp-2.5.0
        dest: /opt/myapp
        state: link

    - name: Remove a file
      ansible.builtin.file:
        path: /tmp/oldfile.conf
        state: absent

    - name: Recursively remove a directory
      ansible.builtin.file:
        path: /tmp/old-deploy
        state: absent

    # ── FETCH FROM REMOTE ─────────────────────────────────────
    - name: Pull a log file back to control node
      ansible.builtin.fetch:
        src: /var/log/myapp/error.log
        dest: "logs/{{ inventory_hostname }}-error.log"
        flat: true    # don't create hostname subdirectory`}
          />
        </>
      )}

      {/* ── ARCHIVING ─────────────────────────────────────────── */}
      {activeCategory === 'archive' && (
        <>
          <h2 className="section-title">Archiving &amp; Compression</h2>

          <CodeBlock
            language="yaml"
            filename="playbooks/archiving.yml"
            code={`---
- name: Archive and extract files
  hosts: all
  become: true

  tasks:

    # ── CREATE AN ARCHIVE ─────────────────────────────────────
    - name: Create a tar.gz archive
      community.general.archive:
        path:
          - /etc/httpd           # include these paths
          - /var/www/html
        dest: /tmp/web-backup-{{ ansible_date_time.date }}.tar.gz
        format: gz               # gz | bz2 | xz | zip
        exclude_path:
          - /var/www/html/cache  # exclude this sub-path

    - name: Archive a single directory
      community.general.archive:
        path: /opt/myapp
        dest: /backup/myapp.tar.gz
        format: gz
        owner: backup
        group: backup
        mode: '0640'

    # ── EXTRACT AN ARCHIVE ────────────────────────────────────
    - name: Extract a local archive to remote host
      ansible.builtin.unarchive:
        src: files/myapp-2.5.0.tar.gz   # local file on control node
        dest: /opt/
        creates: /opt/myapp-2.5.0       # skip if this path already exists

    - name: Extract a remote archive (already on the remote host)
      ansible.builtin.unarchive:
        src: /tmp/myapp.tar.gz
        dest: /opt/
        remote_src: true       # src is on the REMOTE host

    - name: Extract a zip file
      ansible.builtin.unarchive:
        src: /tmp/config.zip
        dest: /etc/myapp/
        remote_src: true
        owner: myapp
        group: myapp

    # ── DOWNLOAD AND EXTRACT ───────────────────────────────────
    - name: Download and extract a release tarball
      ansible.builtin.unarchive:
        src: "https://releases.example.com/myapp-{{ app_version }}.tar.gz"
        dest: /opt/
        remote_src: false      # default: copy src from control node
        creates: "/opt/myapp-{{ app_version }}/bin/myapp"

    # ── COMPRESS A SINGLE FILE ────────────────────────────────
    - name: Compress a log file with gzip
      ansible.builtin.command:
        cmd: gzip -k /var/log/myapp.log   # -k keeps original
        creates: /var/log/myapp.log.gz

    # ── LIST ARCHIVE CONTENTS ─────────────────────────────────
    - name: List contents of an archive
      ansible.builtin.command:
        cmd: tar -tzf /tmp/myapp.tar.gz
      register: archive_list
      changed_when: false

    - ansible.builtin.debug:
        var: archive_list.stdout_lines`}
          />
        </>
      )}

      {/* ── TASK SCHEDULING ───────────────────────────────────── */}
      {activeCategory === 'cron' && (
        <>
          <h2 className="section-title">Task Scheduling</h2>

          <CodeBlock
            language="yaml"
            filename="playbooks/scheduling.yml"
            code={`---
- name: Manage scheduled tasks
  hosts: all
  become: true

  tasks:

    # ── CRON JOB ──────────────────────────────────────────────
    # The 'name' field is used as the job identifier (used for idempotency)
    - name: Schedule nightly backup at 2:30 AM
      ansible.builtin.cron:
        name: "Nightly backup"     # REQUIRED — used to track the job
        minute: "30"
        hour: "2"
        day: "*"
        month: "*"
        weekday: "*"
        job: "/usr/local/bin/backup.sh >> /var/log/backup.log 2>&1"
        user: root
        state: present

    # ── COMMON CRON PATTERNS ──────────────────────────────────
    - name: Run every 5 minutes
      ansible.builtin.cron:
        name: "Health check"
        minute: "*/5"
        job: "/usr/local/bin/healthcheck.sh"

    - name: Run on weekdays at 8 AM
      ansible.builtin.cron:
        name: "Daily report"
        minute: "0"
        hour: "8"
        weekday: "1-5"            # 0=Sunday, 1=Monday, ... 5=Friday, 6=Saturday
        job: "/usr/local/bin/daily-report.sh"

    - name: Run first day of every month
      ansible.builtin.cron:
        name: "Monthly cleanup"
        minute: "0"
        hour: "0"
        day: "1"
        job: "/usr/local/bin/monthly-cleanup.sh"

    # ── SPECIAL TIME STRINGS ──────────────────────────────────
    - name: Run at reboot
      ansible.builtin.cron:
        name: "On reboot"
        special_time: reboot      # reboot | yearly | annually | monthly | weekly | daily | hourly
        job: "/usr/local/bin/startup-check.sh"

    - name: Run hourly
      ansible.builtin.cron:
        name: "Hourly sync"
        special_time: hourly
        job: "/usr/local/bin/sync.sh"

    # ── SET ENVIRONMENT VARIABLES FOR CRON ──────────────────
    - name: Set MAILTO for cron output
      ansible.builtin.cron:
        name: MAILTO
        env: true                 # this is an environment variable, not a job
        value: "admin@example.com"

    - name: Set PATH for cron
      ansible.builtin.cron:
        name: PATH
        env: true
        value: "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin"

    # ── CRON FOR A SPECIFIC USER ──────────────────────────────
    - name: Add cron job for non-root user
      ansible.builtin.cron:
        name: "User backup"
        hour: "3"
        minute: "0"
        job: "rsync -av ~/data /backup/{{ ansible_user }}"
        user: deployer            # manages /var/spool/cron/deployer

    # ── REMOVE A CRON JOB ────────────────────────────────────
    - name: Remove a scheduled task
      ansible.builtin.cron:
        name: "Old backup job"
        state: absent

    # ── SYSTEMD TIMER (modern alternative to cron) ────────────
    - name: Create systemd timer unit
      ansible.builtin.copy:
        content: |
          [Unit]
          Description=Run backup daily

          [Timer]
          OnCalendar=*-*-* 02:30:00
          Persistent=true

          [Install]
          WantedBy=timers.target
        dest: /etc/systemd/system/backup.timer
        mode: '0644'
      notify: Reload systemd and enable timer

  handlers:
    - name: Reload systemd and enable timer
      ansible.builtin.systemd:
        name: backup.timer
        state: started
        enabled: true
        daemon_reload: true`}
          />
        </>
      )}

      {/* ── SECURITY ──────────────────────────────────────────── */}
      {activeCategory === 'security' && (
        <>
          <h2 className="section-title">Security — SELinux &amp; ACLs</h2>

          <CodeBlock
            language="yaml"
            filename="playbooks/security.yml"
            code={`---
- name: Configure SELinux and access controls
  hosts: all
  become: true

  tasks:

    # ── SELINUX MODE ──────────────────────────────────────────
    - name: Set SELinux to enforcing mode
      ansible.posix.selinux:
        policy: targeted         # policy: targeted | minimum | mls
        state: enforcing         # enforcing | permissive | disabled
      # Note: changing to/from disabled requires a REBOOT

    - name: Set SELinux to permissive (for troubleshooting)
      ansible.posix.selinux:
        policy: targeted
        state: permissive

    # ── SELINUX BOOLEANS ──────────────────────────────────────
    - name: Allow Apache to connect to network
      ansible.posix.seboolean:
        name: httpd_can_network_connect
        state: true
        persistent: true         # survive reboots (getsebool -a to list)

    - name: Allow Apache to read user home directories
      ansible.posix.seboolean:
        name: httpd_read_user_content
        state: true
        persistent: true

    - name: Allow Samba to share home directories
      ansible.posix.seboolean:
        name: samba_enable_home_dirs
        state: true
        persistent: true

    # ── SELINUX FILE CONTEXTS ─────────────────────────────────
    # Set file context mapping (like semanage fcontext)
    - name: Set SELinux context for a custom web directory
      community.general.sefcontext:
        target: '/opt/mywebapp(/.*)?'
        setype: httpd_sys_content_t
        state: present
      notify: Restore SELinux context

    - name: Set context for writable web dir
      community.general.sefcontext:
        target: '/opt/mywebapp/cache(/.*)?'
        setype: httpd_sys_rw_content_t
        state: present
      notify: Restore SELinux context

    # ── PORT CONTEXTS ─────────────────────────────────────────
    - name: Allow Apache to listen on port 8080
      community.general.seport:
        ports: 8080
        proto: tcp
        setype: http_port_t
        state: present

    # ── POSIX ACLs ────────────────────────────────────────────
    # ACLs extend standard Unix permissions (rwx) to specific users/groups
    - name: Give user 'developer' read+write on /opt/myapp
      ansible.posix.acl:
        path: /opt/myapp
        entity: developer        # username or group name
        etype: user              # user | group | other | mask
        permissions: rw          # r | w | x | rw | rwx | --- etc.
        state: present

    - name: Set group read access on a directory
      ansible.posix.acl:
        path: /shared/data
        entity: developers
        etype: group
        permissions: r-x
        state: present

    - name: Set default ACL (inherited by new files)
      ansible.posix.acl:
        path: /shared/projects
        entity: developers
        etype: group
        permissions: rwx
        state: present
        default: true           # new files/dirs inherit this ACL

    - name: Remove an ACL entry
      ansible.posix.acl:
        path: /opt/myapp
        entity: olduser
        etype: user
        state: absent

    - name: Remove ALL ACLs from a file
      ansible.posix.acl:
        path: /tmp/file.txt
        state: absent
        recalculate_mask: no

    # ── SYSCTL — kernel security parameters ───────────────────
    - name: Disable IP forwarding
      ansible.posix.sysctl:
        name: net.ipv4.ip_forward
        value: '0'
        state: present
        sysctl_file: /etc/sysctl.d/99-security.conf
        reload: true

    - name: Enable TCP SYN cookies
      ansible.posix.sysctl:
        name: net.ipv4.tcp_syncookies
        value: '1'
        state: present
        reload: true

  handlers:
    - name: Restore SELinux context
      ansible.builtin.command: restorecon -Rv /opt/mywebapp
      changed_when: false`}
          />
        </>
      )}

      {/* ── USERS & GROUPS ────────────────────────────────────── */}
      {activeCategory === 'users' && (
        <>
          <h2 className="section-title">Users &amp; Groups</h2>

          <CodeBlock
            language="yaml"
            filename="playbooks/users-groups.yml"
            code={`---
- name: Manage users and groups
  hosts: all
  become: true

  vars:
    admin_users:
      - name: alice
        uid: 1010
        groups: [wheel, developers]
        shell: /bin/bash
        comment: "Alice Admin"
      - name: bob
        uid: 1011
        groups: [developers]
        shell: /bin/bash
    service_users:
      - name: svc_myapp
        uid: 2001
        system: true
        shell: /sbin/nologin
        home: /opt/myapp
        comment: "MyApp Service Account"

  tasks:

    # ── CREATE A GROUP ────────────────────────────────────────
    - name: Create required groups
      ansible.builtin.group:
        name: "{{ item }}"
        state: present
      loop:
        - developers
        - operators
        - dbadmins

    - name: Create group with specific GID
      ansible.builtin.group:
        name: myapp
        gid: 3000
        state: present

    # ── CREATE USERS ──────────────────────────────────────────
    - name: Create admin users
      ansible.builtin.user:
        name: "{{ item.name }}"
        uid: "{{ item.uid }}"
        groups: "{{ item.groups }}"
        shell: "{{ item.shell }}"
        comment: "{{ item.comment | default('') }}"
        create_home: true
        state: present
      loop: "{{ admin_users }}"

    - name: Create service accounts
      ansible.builtin.user:
        name: "{{ item.name }}"
        uid: "{{ item.uid }}"
        system: "{{ item.system }}"
        shell: "{{ item.shell }}"
        home: "{{ item.home }}"
        create_home: true
        comment: "{{ item.comment }}"
        state: present
      loop: "{{ service_users }}"

    # ── SET PASSWORD ──────────────────────────────────────────
    # Passwords must be pre-hashed — NEVER store plaintext
    # Generate hash: python3 -c "from passlib.hash import sha512_crypt; print(sha512_crypt.hash('MyP@ssw0rd'))"
    # Or: openssl passwd -6 'MyP@ssw0rd'

    - name: Set user password (hashed)
      ansible.builtin.user:
        name: alice
        password: "$6$rounds=656000$randomsalt$hashedpassword..."  # use ansible vault!
        update_password: always    # always | on_create

    # ── SSH AUTHORIZED KEYS ───────────────────────────────────
    - name: Add SSH public key for alice
      ansible.posix.authorized_key:
        user: alice
        key: "{{ lookup('file', 'keys/alice.pub') }}"
        state: present

    - name: Add SSH key from a URL
      ansible.posix.authorized_key:
        user: bob
        key: https://github.com/bob.keys
        state: present

    - name: Set exclusive keys (remove others)
      ansible.posix.authorized_key:
        user: deployer
        key: "{{ lookup('file', 'keys/deployer.pub') }}"
        exclusive: true           # removes all other authorized keys

    # ── SUDO CONFIGURATION ────────────────────────────────────
    - name: Configure sudo for developers group (no password)
      ansible.builtin.copy:
        content: "%developers ALL=(ALL) NOPASSWD: ALL\n"
        dest: /etc/sudoers.d/developers
        mode: '0440'
        validate: /usr/sbin/visudo -cf %s   # validate before deploying!

    - name: Restrict sudo to specific commands
      ansible.builtin.copy:
        content: |
          alice ALL=(ALL) NOPASSWD: /usr/bin/systemctl restart httpd
          alice ALL=(ALL) NOPASSWD: /usr/bin/systemctl status httpd
        dest: /etc/sudoers.d/alice-httpd
        mode: '0440'
        validate: /usr/sbin/visudo -cf %s

    # ── ADD USER TO ADDITIONAL GROUP ──────────────────────────
    - name: Add alice to wheel group (preserve existing groups)
      ansible.builtin.user:
        name: alice
        groups: wheel
        append: true             # IMPORTANT: append=true preserves existing groups
                                 # append=false (default) REPLACES groups!

    # ── REMOVE A USER ─────────────────────────────────────────
    - name: Remove departed employee
      ansible.builtin.user:
        name: exemployee
        state: absent
        remove: true             # also removes home directory and mail spool

    # ── LOCK/EXPIRE USER ACCOUNT ──────────────────────────────
    - name: Lock a user account
      ansible.builtin.user:
        name: tempcontractor
        expires: -1              # -1 = lock (no expiry set), 0 = Jan 1 1970 (locked)
        password_lock: true      # prepends ! to password hash in /etc/shadow

    - name: Set account expiration date
      ansible.builtin.user:
        name: contractor
        expires: 1735689600      # Unix timestamp for 2025-01-01
                                 # Use: date -d "2025-01-01" +%s`}
          />

          <InfoBox type="warning">
            <strong>Critical: <code>append: true</code> vs default</strong>
            When using the <code>user</code> module with <code>groups:</code>, the default
            behavior (<code>append: false</code>) <em>replaces</em> all supplementary groups!
            Always use <code>append: true</code> when you only want to ADD to groups.
          </InfoBox>
        </>
      )}
    </div>
  )
}
