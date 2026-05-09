import React, { useState } from 'react'
import PageHeader from '../components/PageHeader'
import CodeBlock from '../components/CodeBlock'
import InfoBox from '../components/InfoBox'

// Variable precedence levels — lowest (1) to highest (22)
const PRECEDENCE_LEVELS = [
  { level: 1,  label: 'command line values (e.g. -e)', color: '#fb7185' },
  { level: 2,  label: 'role defaults (defaults/main.yml)', color: '#f97316' },
  { level: 3,  label: 'inventory file group vars', color: '#fbbf24' },
  { level: 4,  label: 'inventory group_vars/all', color: '#fbbf24' },
  { level: 5,  label: 'playbook group_vars/all', color: '#fbbf24' },
  { level: 6,  label: 'inventory group_vars/*', color: '#fbbf24' },
  { level: 7,  label: 'playbook group_vars/*', color: '#a3e635' },
  { level: 8,  label: 'inventory file host vars', color: '#34d399' },
  { level: 9,  label: 'inventory host_vars/*', color: '#34d399' },
  { level: 10, label: 'playbook host_vars/*', color: '#34d399' },
  { level: 11, label: 'host facts / cached set_facts', color: '#38bdf8' },
  { level: 12, label: 'play vars', color: '#818cf8' },
  { level: 13, label: 'play vars_prompt', color: '#818cf8' },
  { level: 14, label: 'play vars_files', color: '#818cf8' },
  { level: 15, label: 'role vars (vars/main.yml)', color: '#a78bfa' },
  { level: 16, label: 'block vars', color: '#c084fc' },
  { level: 17, label: 'task vars (only for the task)', color: '#c084fc' },
  { level: 18, label: 'include_vars', color: '#e879f9' },
  { level: 19, label: 'set_facts / registered vars', color: '#f472b6' },
  { level: 20, label: 'role (and include_role) params', color: '#fb7185' },
  { level: 21, label: 'include params', color: '#fb7185' },
  { level: 22, label: '-e "var=value" (command line extra vars)', color: '#ff4466' },
]

function PrecedencePyramid() {
  const [hovered, setHovered] = useState(null)
  const sorted = [...PRECEDENCE_LEVELS].reverse() // 22 → 1 from top to bottom
  const total = sorted.length

  return (
    <div style={{ margin: '2rem 0' }}>
      <h3 style={{ color: 'var(--text-primary)', fontSize: '1rem', marginBottom: '1rem' }}>
        Variable Precedence — Lowest (1) to Highest (22)
      </h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
        Higher number wins. Hover any bar to see its description.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {sorted.map((item, i) => {
          const pct = 40 + ((total - i) / total) * 60 // pyramid shape
          const isHovered = hovered === item.level
          return (
            <div
              key={item.level}
              style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              onMouseEnter={() => setHovered(item.level)}
              onMouseLeave={() => setHovered(null)}
            >
              <span style={{
                width: '26px', textAlign: 'right', fontSize: '0.7rem',
                color: isHovered ? item.color : '#4b5563', fontFamily: 'var(--font-mono)',
                fontWeight: isHovered ? 700 : 400, transition: 'all 150ms',
              }}>{item.level}</span>
              <div style={{
                width: `${pct}%`, height: '22px',
                background: isHovered
                  ? item.color
                  : `${item.color}55`,
                borderRadius: '3px',
                display: 'flex', alignItems: 'center', paddingLeft: '10px',
                transition: 'all 150ms ease',
                cursor: 'default',
                boxShadow: isHovered ? `0 0 12px ${item.color}66` : 'none',
              }}>
                <span style={{
                  fontSize: '0.7rem', color: isHovered ? '#000' : item.color,
                  fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap',
                  overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  {item.label}
                </span>
              </div>
            </div>
          )
        })}
      </div>
      <div style={{
        display: 'flex', gap: '2rem', marginTop: '1rem',
        fontSize: '0.78rem', color: 'var(--text-muted)',
      }}>
        <span>⬆ Higher priority (wins)</span>
        <span>⬇ Lower priority (gets overridden)</span>
      </div>
    </div>
  )
}

const COMMON_MODULES = [
  {
    category: 'Files & Content',
    color: '#38bdf8',
    modules: [
      { name: 'ansible.builtin.copy', desc: 'Copy local file to remote host (or write inline content)' },
      { name: 'ansible.builtin.template', desc: 'Render a Jinja2 .j2 template and copy to remote' },
      { name: 'ansible.builtin.file', desc: 'Manage file/dir/symlink attributes (mode, owner, state)' },
      { name: 'ansible.builtin.fetch', desc: 'Pull a file from remote back to the control node' },
      { name: 'ansible.builtin.lineinfile', desc: 'Ensure a line exists (or doesn\'t) in a file' },
      { name: 'ansible.builtin.blockinfile', desc: 'Insert/remove a block of text in a file' },
      { name: 'ansible.builtin.replace', desc: 'Replace all occurrences of a regex pattern in a file' },
      { name: 'ansible.builtin.find', desc: 'Find files matching criteria on remote hosts' },
      { name: 'ansible.builtin.stat', desc: 'Get file/path information (exists, size, mode, md5)' },
    ],
  },
  {
    category: 'Commands & Scripts',
    color: '#fbbf24',
    modules: [
      { name: 'ansible.builtin.command', desc: 'Run a command (no shell, safer, no pipes/redirects)' },
      { name: 'ansible.builtin.shell', desc: 'Run a shell command (supports pipes, redirects, env)' },
      { name: 'ansible.builtin.script', desc: 'Copy a local script to remote and execute it' },
      { name: 'ansible.builtin.raw', desc: 'Execute raw SSH commands (no Python needed on remote)' },
    ],
  },
  {
    category: 'Packages & Repos',
    color: '#34d399',
    modules: [
      { name: 'ansible.builtin.dnf', desc: 'Manage packages with DNF (RHEL 8+)' },
      { name: 'ansible.builtin.yum', desc: 'Manage packages with YUM (RHEL 7)' },
      { name: 'ansible.builtin.package', desc: 'Generic package module (auto-detects dnf/yum/apt)' },
      { name: 'ansible.builtin.dnf_repository', desc: 'Manage DNF/YUM repository definitions (.repo files)' },
      { name: 'ansible.builtin.rpm_key', desc: 'Import/remove an RPM GPG key' },
    ],
  },
  {
    category: 'Services & Systemd',
    color: '#818cf8',
    modules: [
      { name: 'ansible.builtin.service', desc: 'Manage services (start/stop/restart/enable/disable)' },
      { name: 'ansible.builtin.systemd', desc: 'Systemd-specific service management (daemon_reload etc.)' },
    ],
  },
  {
    category: 'Users & Groups',
    color: '#c084fc',
    modules: [
      { name: 'ansible.builtin.user', desc: 'Create/modify/delete user accounts' },
      { name: 'ansible.builtin.group', desc: 'Manage groups' },
      { name: 'ansible.posix.authorized_key', desc: 'Manage SSH authorized keys for a user' },
    ],
  },
  {
    category: 'Storage',
    color: '#f97316',
    modules: [
      { name: 'community.general.parted', desc: 'Manage disk partitions' },
      { name: 'community.general.lvg', desc: 'Manage LVM physical volumes and volume groups' },
      { name: 'community.general.lvol', desc: 'Manage LVM logical volumes' },
      { name: 'ansible.builtin.filesystem', desc: 'Create a filesystem on a block device' },
      { name: 'ansible.posix.mount', desc: 'Mount filesystems and manage /etc/fstab' },
    ],
  },
  {
    category: 'Networking & Firewall',
    color: '#fb7185',
    modules: [
      { name: 'ansible.posix.firewalld', desc: 'Manage firewalld rules (services, ports, zones)' },
      { name: 'ansible.builtin.get_url', desc: 'Download files from HTTP/HTTPS/FTP' },
      { name: 'ansible.builtin.uri', desc: 'Interact with HTTP/HTTPS APIs' },
    ],
  },
  {
    category: 'Security (SELinux)',
    color: '#fbbf24',
    modules: [
      { name: 'ansible.posix.selinux', desc: 'Manage SELinux mode (enforcing/permissive/disabled)' },
      { name: 'ansible.posix.seboolean', desc: 'Toggle SELinux booleans' },
      { name: 'community.general.sefcontext', desc: 'Manage SELinux file context mappings' },
      { name: 'ansible.posix.acl', desc: 'Set POSIX ACLs on files and directories' },
    ],
  },
  {
    category: 'Archives & Scheduling',
    color: '#38bdf8',
    modules: [
      { name: 'community.general.archive', desc: 'Create compressed archives (tar.gz, zip, etc.)' },
      { name: 'ansible.builtin.unarchive', desc: 'Extract archives on remote hosts' },
      { name: 'ansible.builtin.cron', desc: 'Manage crontab entries' },
      { name: 'ansible.builtin.at', desc: 'Schedule one-time commands with the at command' },
    ],
  },
]

export default function CoreConcepts() {
  const [activeModCat, setActiveModCat] = useState(0)
  const [activeLoop, setActiveLoop] = useState('loop')

  return (
    <div className="page-container fade-in">
      <PageHeader
        title="Core Ansible Concepts"
        icon="◈"
        description="Master the fundamental building blocks of Ansible: modules, variables and their 22 precedence levels, facts, loops, and conditionals."
        tags={['Modules', 'Variables', 'Facts', 'Loops', 'Conditionals', 'register']}
      />

      {/* ── MODULES ─────────────────────────────────────────────── */}
      <h2 className="section-title">Modules</h2>
      <p>
        Modules are the <strong>units of work</strong> in Ansible — each task calls exactly one module.
        Ansible ships with hundreds of built-in modules (namespace <code>ansible.builtin</code>), and
        thousands more are available through Content Collections. Modules are <em>idempotent</em>:
        running them multiple times produces the same result (they only change things when needed).
      </p>

      <InfoBox type="key">
        Always prefer the <strong>Fully Qualified Collection Name (FQCN)</strong> such as
        <code> ansible.builtin.copy</code> rather than just <code>copy</code>.
        This prevents ambiguity when multiple collections define a module with the same short name.
      </InfoBox>

      {/* Module category tabs */}
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '6px', paddingBottom: '4px', minWidth: 'max-content' }}>
          {COMMON_MODULES.map((cat, i) => (
            <button
              key={cat.category}
              onClick={() => setActiveModCat(i)}
              style={{
                padding: '6px 14px', borderRadius: 'var(--radius-md)',
                border: `1px solid ${activeModCat === i ? cat.color : 'var(--border-subtle)'}`,
                background: activeModCat === i ? `${cat.color}18` : 'var(--bg-card)',
                color: activeModCat === i ? cat.color : 'var(--text-muted)',
                fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
                transition: 'all 150ms', whiteSpace: 'nowrap',
              }}
            >
              {cat.category}
            </button>
          ))}
        </div>
      </div>

      {COMMON_MODULES.map((cat, i) => i === activeModCat && (
        <div key={cat.category} style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'grid', gap: '8px' }}>
            {cat.modules.map(m => (
              <div key={m.name} style={{
                background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)', padding: '12px 16px',
                display: 'flex', gap: '16px', alignItems: 'flex-start',
              }}>
                <code style={{
                  color: cat.color, fontFamily: 'var(--font-mono)', fontSize: '0.82rem',
                  background: `${cat.color}12`, padding: '3px 8px', borderRadius: '4px',
                  whiteSpace: 'nowrap', flexShrink: 0,
                }}>{m.name}</code>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{m.desc}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <CodeBlock
        language="yaml"
        filename="examples/modules-showcase.yml"
        code={`---
- name: Module examples
  hosts: webservers
  become: true
  tasks:

    # ── FILES ────────────────────────────────────────────────────
    - name: Create a directory
      ansible.builtin.file:
        path: /var/www/html
        state: directory
        owner: apache
        group: apache
        mode: '0755'

    - name: Copy a file with inline content
      ansible.builtin.copy:
        content: "Hello from Ansible!\\n"
        dest: /var/www/html/index.html
        owner: apache
        mode: '0644'

    - name: Render a Jinja2 template
      ansible.builtin.template:
        src: nginx.conf.j2    # file lives in templates/ of the role/playbook dir
        dest: /etc/nginx/nginx.conf
        mode: '0644'
      notify: Restart nginx

    - name: Ensure a line exists in /etc/hosts
      ansible.builtin.lineinfile:
        path: /etc/hosts
        line: "192.168.1.10  app.example.com"
        regexp: "^.*app\\.example\\.com"
        state: present

    - name: Insert a block with markers (idempotent)
      ansible.builtin.blockinfile:
        path: /etc/ssh/sshd_config
        block: |
          # Ansible managed block
          PermitRootLogin no
          MaxAuthTries 3
        marker: "# {mark} ANSIBLE MANAGED BLOCK"

    # ── PACKAGES ─────────────────────────────────────────────────
    - name: Install multiple packages
      ansible.builtin.dnf:
        name:
          - nginx
          - python3
          - firewalld
        state: present

    - name: Install the latest version
      ansible.builtin.dnf:
        name: httpd
        state: latest

    - name: Remove a package
      ansible.builtin.dnf:
        name: telnet
        state: absent

    # ── SERVICES ─────────────────────────────────────────────────
    - name: Start and enable a service
      ansible.builtin.service:
        name: nginx
        state: started
        enabled: true

    # ── COMMANDS ─────────────────────────────────────────────────
    # Use 'command' when you don't need shell features
    - name: Run a command
      ansible.builtin.command:
        cmd: /usr/bin/myapp --init
        creates: /var/lib/myapp/.initialized  # skip if file exists

    # Use 'shell' when you need pipes, redirects, or shell expansion
    - name: Count log lines
      ansible.builtin.shell:
        cmd: grep -c ERROR /var/log/app.log || true
      register: error_count
      changed_when: false   # reading is never a 'change'

    # ── GET FILE INFO ─────────────────────────────────────────────
    - name: Check if a config file exists
      ansible.builtin.stat:
        path: /etc/myapp/config.yml
      register: config_stat

    - name: Use the result
      ansible.builtin.debug:
        msg: "Config exists: {{ config_stat.stat.exists }}, size: {{ config_stat.stat.size | default(0) }}"
      when: config_stat.stat.exists`}
      />

      {/* ── VARIABLES ───────────────────────────────────────────── */}
      <h2 className="section-title">Variables</h2>
      <p>
        Ansible variables make playbooks reusable across different environments and hosts.
        They can be defined in <strong>many places</strong> — and when the same variable name
        appears in multiple places, Ansible uses a strict 22-level precedence order to decide
        which value wins.
      </p>

      <PrecedencePyramid />

      <InfoBox type="exam">
        The exam often tests variable precedence. Remember the golden rule:
        <strong> command-line extra vars (<code>-e</code>) always win</strong> (level 22).
        Role defaults always lose (level 2). Variables set in <code>role/vars/main.yml</code>
        override almost everything except <code>-e</code> and registered vars.
      </InfoBox>

      <h3 style={{ color: 'var(--text-primary)', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        Defining Variables — All the Ways
      </h3>

      <CodeBlock
        language="yaml"
        filename="playbooks/variables-demo.yml"
        code={`---
# ── 1. PLAY-LEVEL VARS ────────────────────────────────────────
- name: Variable demonstration
  hosts: all
  vars:
    app_name: myapp
    app_port: 8080
    app_config:           # dict variable
      debug: false
      workers: 4
    app_packages:         # list variable
      - python3
      - gunicorn
      - nginx

  # ── 2. EXTERNAL VARS FILE ────────────────────────────────────
  vars_files:
    - vars/common.yml
    - "vars/{{ ansible_distribution }}.yml"   # per-OS var file

  # ── 3. INTERACTIVE PROMPT ────────────────────────────────────
  vars_prompt:
    - name: db_password
      prompt: "Enter database password"
      private: true       # hides input

  tasks:
    # ── 4. SET_FACT — create variables at runtime ─────────────
    - name: Set a fact derived from other facts
      ansible.builtin.set_fact:
        app_url: "http://{{ ansible_default_ipv4.address }}:{{ app_port }}"
        timestamp: "{{ ansible_date_time.iso8601 }}"

    # ── 5. REGISTER — capture command output ──────────────────
    - name: Get current kernel version
      ansible.builtin.command: uname -r
      register: kernel_output
      changed_when: false

    - name: Print the captured output
      ansible.builtin.debug:
        msg: "Kernel: {{ kernel_output.stdout }}"

    # ── 6. INCLUDE_VARS — load vars from a file dynamically ──
    - name: Load environment-specific variables
      ansible.builtin.include_vars:
        file: "vars/{{ env | default('dev') }}.yml"

    # ── 7. ACCESS DICT AND LIST ───────────────────────────────
    - name: Access nested variables
      ansible.builtin.debug:
        msg:
          - "App: {{ app_name }}"
          - "Debug mode: {{ app_config.debug }}"
          - "Workers: {{ app_config['workers'] }}"
          - "First package: {{ app_packages[0] }}"
          - "All packages: {{ app_packages | join(', ') }}"

    # ── 8. DEFAULT FILTER — safe access ──────────────────────
    - name: Use default value if variable not defined
      ansible.builtin.debug:
        msg: "Log level: {{ log_level | default('info') }}"

# ── COMMAND LINE EXTRA VARS (highest precedence) ──────────────
# ansible-playbook site.yml -e "app_port=9090 env=prod"
# ansible-playbook site.yml -e @extra_vars.yml  (from file)`}
      />

      <h3 style={{ color: 'var(--text-primary)', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        host_vars / group_vars Directory Structure
      </h3>
      <CodeBlock
        language="bash"
        title="Variable files directory structure"
        code={`# These directories can live next to your playbook OR in the inventory directory
# Ansible automatically loads them — no need to reference them explicitly

inventory/
├── hosts                    # main inventory file
├── group_vars/
│   ├── all.yml              # applies to every host
│   ├── all/                 # alternative: directory form
│   │   ├── vars.yml
│   │   └── vault.yml        # encrypted secrets
│   ├── webservers.yml       # applies to [webservers] group
│   └── dbservers/
│       ├── vars.yml
│       └── vault.yml
└── host_vars/
    ├── web1.example.com.yml # applies to one specific host
    └── db1.example.com/
        ├── vars.yml
        └── vault.yml`}
      />

      {/* ── FACTS ───────────────────────────────────────────────── */}
      <h2 className="section-title">Facts</h2>
      <p>
        Facts are variables that Ansible <strong>automatically gathers</strong> about managed hosts
        at the start of each play (unless disabled). They live inside the <code>ansible_facts</code> dict
        and expose OS version, IP addresses, memory, disk layout, and hundreds of other system properties.
      </p>

      <InfoBox type="info">
        <strong>How gathering works under the hood:</strong> Ansible runs the
        <code> setup</code> module on each host at play start. The module reads from
        <code> /proc</code>, <code>/sys</code>, <code>/etc/os-release</code>, <code>dmidecode</code>,
        <code> ip</code>, and other system sources. Results are cached and available for the entire play.
      </InfoBox>

      <CodeBlock
        language="yaml"
        filename="examples/facts-demo.yml"
        code={`---
- name: Working with facts
  hosts: all
  # gather_facts: true is the DEFAULT — you rarely need to write it
  # gather_facts: false  ← speeds things up if you don't need facts

  tasks:
    # ── PRINT ALL FACTS (great for exploring) ─────────────────
    - name: Show all gathered facts
      ansible.builtin.debug:
        var: ansible_facts

    # ── COMMON FACTS ──────────────────────────────────────────
    - name: Display key system facts
      ansible.builtin.debug:
        msg:
          - "Hostname:        {{ ansible_hostname }}"
          - "FQDN:            {{ ansible_fqdn }}"
          - "OS:              {{ ansible_distribution }} {{ ansible_distribution_version }}"
          - "OS Family:       {{ ansible_os_family }}"    # RedHat, Debian, etc.
          - "Kernel:          {{ ansible_kernel }}"
          - "Architecture:    {{ ansible_architecture }}"
          - "RAM total (MB):  {{ ansible_memtotal_mb }}"
          - "CPUs:            {{ ansible_processor_vcpus }}"
          - "Primary IPv4:    {{ ansible_default_ipv4.address }}"
          - "Primary iface:   {{ ansible_default_ipv4.interface }}"
          - "All IPv4 addrs:  {{ ansible_all_ipv4_addresses }}"

    # ── DISK FACTS ────────────────────────────────────────────
    - name: Show disk information
      ansible.builtin.debug:
        msg: "Mount {{ item.key }}: {{ item.value.size_total | int // 1073741824 }} GB total"
      loop: "{{ ansible_mounts | map(attribute='mount') | zip(ansible_mounts) | list }}"
      # Simpler approach:
    - ansible.builtin.debug:
        msg: "{{ ansible_mounts | map(attribute='mount') | list }}"

    # ── USING FACTS IN CONDITIONALS ───────────────────────────
    - name: Install RHEL-specific package
      ansible.builtin.dnf:
        name: subscription-manager
        state: present
      when: ansible_os_family == "RedHat"

    - name: Install on Ubuntu
      ansible.builtin.apt:
        name: apt-transport-https
      when: ansible_distribution == "Ubuntu"

# ── MAGIC VARIABLES (not facts, but always available) ─────────
# inventory_hostname    — the name of the current host as in inventory
# inventory_hostname_short — without domain suffix
# groups['webservers']  — list of all hosts in a group
# group_names           — list of groups current host belongs to
# hostvars['web1']      — access another host's vars/facts
# play_hosts            — list of active hosts in current play
# ansible_play_hosts    — same as play_hosts

    - name: Use hostvars to reference another host
      ansible.builtin.debug:
        msg: "db01's IP is {{ hostvars['db01'].ansible_default_ipv4.address }}"
      when: "'db01' in hostvars"

# ── CUSTOM FACTS ──────────────────────────────────────────────
# Place executable scripts or .ini/.json files in:
#   /etc/ansible/facts.d/*.fact
# They appear under ansible_local.*

    - name: Deploy a custom fact script
      ansible.builtin.copy:
        content: |
          #!/bin/bash
          echo '{"app_version": "2.5.1", "install_date": "2024-01-15"}'
        dest: /etc/ansible/facts.d/myapp.fact
        mode: '0755'

    - name: Re-gather facts after deploying custom fact
      ansible.builtin.setup:
        filter: ansible_local

    - name: Access the custom fact
      ansible.builtin.debug:
        msg: "App version: {{ ansible_local.myapp.app_version }}"

# ── CACHING FACTS ─────────────────────────────────────────────
# In ansible.cfg:
#   [defaults]
#   fact_caching = jsonfile
#   fact_caching_connection = /tmp/ansible_facts_cache
#   fact_caching_timeout = 3600   # seconds`}
      />

      {/* ── LOOPS ───────────────────────────────────────────────── */}
      <h2 className="section-title">Loops</h2>
      <p>
        Loops let you repeat a task multiple times with different data, avoiding copy-paste
        in your playbooks. The modern keyword is <code>loop</code> (which replaced older
        <code> with_*</code> keywords, though those still work).
      </p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem', flexWrap: 'wrap' }}>
        {['loop', 'loop+dict', 'with_sequence', 'loop_control', 'nested'].map(t => (
          <button key={t} onClick={() => setActiveLoop(t)} style={{
            padding: '6px 16px', borderRadius: 'var(--radius-md)',
            border: `1px solid ${activeLoop === t ? 'var(--accent-sky)' : 'var(--border-subtle)'}`,
            background: activeLoop === t ? 'var(--accent-sky-glow)' : 'var(--bg-card)',
            color: activeLoop === t ? 'var(--accent-sky)' : 'var(--text-muted)',
            fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', transition: 'all 150ms',
          }}>{t}</button>
        ))}
      </div>

      {activeLoop === 'loop' && (
        <CodeBlock language="yaml" filename="loops/basic-loop.yml" code={`---
- name: Basic loop examples
  hosts: all
  become: true
  tasks:

    # ── LOOP OVER A LIST ──────────────────────────────────────
    - name: Create multiple users
      ansible.builtin.user:
        name: "{{ item }}"
        state: present
        shell: /bin/bash
      loop:
        - alice
        - bob
        - charlie

    # ── LOOP OVER A LIST OF DICTS ─────────────────────────────
    - name: Create users with properties
      ansible.builtin.user:
        name: "{{ item.name }}"
        uid: "{{ item.uid }}"
        groups: "{{ item.groups }}"
        shell: "{{ item.shell | default('/bin/bash') }}"
      loop:
        - { name: alice, uid: 1010, groups: wheel }
        - { name: bob,   uid: 1011, groups: users }
        - { name: svc_app, uid: 2000, groups: '', shell: /sbin/nologin }

    # ── LOOP OVER A VARIABLE ──────────────────────────────────
    # Define the list in vars for cleaner playbooks
    vars:
      required_packages:
        - httpd
        - mod_ssl
        - php
        - php-mysqlnd

    tasks:
      - name: Install web stack
        ansible.builtin.dnf:
          name: "{{ item }}"
          state: present
        loop: "{{ required_packages }}"

    # ── REGISTERING LOOP RESULTS ──────────────────────────────
    - name: Check if each service is running
      ansible.builtin.service_facts:
      register: svc_facts

    - name: Run command in a loop and capture results
      ansible.builtin.command: systemctl is-active "{{ item }}"
      loop: [httpd, nginx, sshd]
      register: svc_check
      failed_when: false
      changed_when: false

    - name: Print each result
      ansible.builtin.debug:
        msg: "{{ item.item }} is {{ item.stdout }}"
      loop: "{{ svc_check.results }}"

    # Tip: use item.item to get the loop variable, item.stdout for output`} />
      )}

      {activeLoop === 'loop+dict' && (
        <CodeBlock language="yaml" filename="loops/dict-loop.yml" code={`---
- name: Looping over dictionaries
  hosts: all
  vars:
    firewall_ports:
      http:  "80/tcp"
      https: "443/tcp"
      ssh:   "22/tcp"

    vhosts:
      app1:
        port: 8080
        docroot: /var/www/app1
      app2:
        port: 8081
        docroot: /var/www/app2

  tasks:
    # ── DICT ITEMS ────────────────────────────────────────────
    # dict2items converts a dict to [{key:k, value:v}, ...] pairs
    - name: Open firewall ports
      ansible.posix.firewalld:
        port: "{{ item.value }}"
        state: enabled
        permanent: true
        immediate: true
      loop: "{{ firewall_ports | dict2items }}"

    - name: Show key/value pairs
      ansible.builtin.debug:
        msg: "Service {{ item.key }} uses port {{ item.value }}"
      loop: "{{ firewall_ports | dict2items }}"

    # ── SUBELEMENTS ───────────────────────────────────────────
    # Access nested list elements in dicts
    vars:
      users:
        - name: alice
          ssh_keys:
            - "ssh-rsa AAAA...key1"
            - "ssh-rsa AAAA...key2"
        - name: bob
          ssh_keys:
            - "ssh-rsa AAAA...key3"

    tasks:
      - name: Add all SSH keys for all users
        ansible.posix.authorized_key:
          user: "{{ item.0.name }}"
          key: "{{ item.1 }}"
        loop: "{{ users | subelements('ssh_keys') }}"
        # item.0 = the user dict, item.1 = each ssh key`} />
      )}

      {activeLoop === 'with_sequence' && (
        <CodeBlock language="yaml" filename="loops/sequence.yml" code={`---
- name: Sequence and range loops
  hosts: all
  tasks:

    # ── WITH_SEQUENCE / loop with range ───────────────────────
    # Create numbered items (still works, though 'loop' with range() is preferred)
    - name: Create 5 test files
      ansible.builtin.file:
        path: "/tmp/testfile_{{ item }}"
        state: touch
      with_sequence: start=1 end=5

    # Modern equivalent using range()
    - name: Create 5 test files (modern)
      ansible.builtin.file:
        path: "/tmp/testfile_{{ item }}"
        state: touch
      loop: "{{ range(1, 6) | list }}"

    # ── FORMATTED SEQUENCE ────────────────────────────────────
    - name: Create zero-padded directories
      ansible.builtin.file:
        path: "/opt/app/worker{{ item }}"
        state: directory
      with_sequence: start=1 end=10 format="%02d"
      # Creates: worker01, worker02, ... worker10

    # ── GENERATE AND FILTER ───────────────────────────────────
    - name: Only even numbers
      ansible.builtin.debug:
        msg: "Even: {{ item }}"
      loop: "{{ range(0, 11, 2) | list }}"
      # Produces: 0, 2, 4, 6, 8, 10`} />
      )}

      {activeLoop === 'loop_control' && (
        <CodeBlock language="yaml" filename="loops/loop-control.yml" code={`---
- name: loop_control options
  hosts: all
  tasks:

    # ── CUSTOM LOOP VARIABLE NAME ─────────────────────────────
    # Default is 'item' — change it to avoid conflicts in nested loops
    - name: Create users (using 'user' instead of 'item')
      ansible.builtin.user:
        name: "{{ user.name }}"
        uid: "{{ user.uid }}"
      loop:
        - { name: alice, uid: 1010 }
        - { name: bob, uid: 1011 }
      loop_control:
        loop_var: user      # rename loop variable

    # ── CUSTOM LABEL ─────────────────────────────────────────
    # Default output shows the entire item dict — confusing for large dicts
    - name: Install packages with clean output
      ansible.builtin.dnf:
        name: "{{ pkg.name }}"
        state: "{{ pkg.state | default('present') }}"
      loop:
        - { name: httpd, state: present }
        - { name: telnet, state: absent }
        - { name: wget, state: present }
      loop_control:
        label: "{{ pkg.name }}"   # only show package name in output

    # ── PAUSE BETWEEN ITERATIONS ──────────────────────────────
    - name: Restart services with delay between each
      ansible.builtin.service:
        name: "{{ item }}"
        state: restarted
      loop: [httpd, php-fpm, redis]
      loop_control:
        pause: 5    # seconds to pause between each iteration

    # ── INDEX VARIABLE ────────────────────────────────────────
    - name: Show iteration number
      ansible.builtin.debug:
        msg: "Item {{ loop_idx + 1 }} of {{ items | length }}: {{ item }}"
      vars:
        items: [alpha, beta, gamma]
      loop: "{{ items }}"
      loop_control:
        index_var: loop_idx`} />
      )}

      {activeLoop === 'nested' && (
        <CodeBlock language="yaml" filename="loops/nested.yml" code={`---
# Ansible does not support nested loops directly with 'loop'
# Use 'with_nested' (old) or the 'product' filter (modern)

- name: Nested loop patterns
  hosts: all
  vars:
    environments: [dev, staging, prod]
    services: [api, web, worker]

  tasks:
    # ── NESTED LOOP WITH PRODUCT FILTER ───────────────────────
    - name: Create directory for each env+service combination
      ansible.builtin.file:
        path: "/opt/{{ item[0] }}/{{ item[1] }}"
        state: directory
      loop: "{{ environments | product(services) | list }}"
      # Creates: /opt/dev/api, /opt/dev/web, /opt/dev/worker,
      #          /opt/staging/api, ... /opt/prod/worker

    # ── WITH_NESTED (older, equivalent) ───────────────────────
    - name: With_nested example
      ansible.builtin.debug:
        msg: "env={{ item[0] }} svc={{ item[1] }}"
      with_nested:
        - [dev, staging, prod]
        - [api, web, worker]

    # ── INCLUDE_TASKS FOR TRUE NESTED LOOPS ───────────────────
    # When you need a loop inside a loop, split into files:
    # outer.yml:
    - name: Outer loop — per environment
      ansible.builtin.include_tasks: inner_tasks.yml
      loop: "{{ environments }}"
      loop_control:
        loop_var: env_name

# inner_tasks.yml:
# - name: Inner loop — per service in env
#   ansible.builtin.file:
#     path: "/opt/{{ env_name }}/{{ svc }}"
#     state: directory
#   loop: "{{ services }}"
#   loop_control:
#     loop_var: svc`} />
      )}

      {/* ── CONDITIONALS ────────────────────────────────────────── */}
      <h2 className="section-title">Conditionals</h2>
      <p>
        The <code>when</code> keyword skips a task when the condition is <em>False</em>.
        Conditions are Jinja2 expressions — they don't need the double-brace
        <code>{` {{ }}`}</code> syntax (Ansible evaluates them automatically).
      </p>

      <CodeBlock
        language="yaml"
        filename="examples/conditionals.yml"
        code={`---
- name: Conditional task execution
  hosts: all
  become: true
  vars:
    install_nginx: true
    env: production

  tasks:

    # ── SIMPLE CONDITION ──────────────────────────────────────
    - name: Install nginx (only if flag is set)
      ansible.builtin.dnf:
        name: nginx
        state: present
      when: install_nginx          # True/False variable

    # ── COMPARING VALUES ──────────────────────────────────────
    - name: Enable debug logging only in dev
      ansible.builtin.lineinfile:
        path: /etc/myapp/config.ini
        line: "log_level = DEBUG"
        regexp: "^log_level"
      when: env == "dev"

    # ── OS FAMILY CHECK ───────────────────────────────────────
    - name: Use dnf on RedHat family
      ansible.builtin.dnf:
        name: httpd
        state: present
      when: ansible_os_family == "RedHat"

    - name: Use apt on Debian family
      ansible.builtin.apt:
        name: apache2
        state: present
      when: ansible_os_family == "Debian"

    # ── MULTIPLE CONDITIONS (AND) ─────────────────────────────
    # List form = AND (all must be true)
    - name: Deploy in production on RHEL 9
      ansible.builtin.template:
        src: prod.conf.j2
        dest: /etc/myapp/config.conf
      when:
        - env == "production"
        - ansible_distribution == "RedHat"
        - ansible_distribution_major_version == "9"

    # ── MULTIPLE CONDITIONS (OR) ──────────────────────────────
    - name: Run on web or app servers
      ansible.builtin.command: /usr/bin/cache-warmup
      when: >
        'webservers' in group_names or
        'appservers' in group_names

    # ── CHECKING IF VARIABLE IS DEFINED ──────────────────────
    - name: Use custom config if provided
      ansible.builtin.template:
        src: "{{ custom_template }}"
        dest: /etc/myapp/config.conf
      when: custom_template is defined

    - name: Skip if undefined
      ansible.builtin.debug:
        msg: "optional_var = {{ optional_var }}"
      when: optional_var is defined and optional_var | length > 0

    # ── USING REGISTERED RESULTS ──────────────────────────────
    - name: Check if httpd is running
      ansible.builtin.command: systemctl is-active httpd
      register: httpd_status
      failed_when: false
      changed_when: false

    - name: Restart httpd only if it was running before
      ansible.builtin.service:
        name: httpd
        state: restarted
      when: httpd_status.rc == 0     # rc=0 means 'active'

    # ── STRING TESTS ─────────────────────────────────────────
    - name: Check for substring
      ansible.builtin.debug:
        msg: "Running on a virtual machine"
      when: "'VMware' in ansible_product_name or 'KVM' in ansible_product_name"

    - name: Regex match
      ansible.builtin.debug:
        msg: "Interface starts with ens"
      when: ansible_default_ipv4.interface | regex_search('^ens')

    # ── BLOCK-LEVEL WHEN ──────────────────────────────────────
    # Apply a single 'when' to a block of tasks
    - name: RedHat-specific setup
      block:
        - name: Enable EPEL repo
          ansible.builtin.dnf:
            name: epel-release
            state: present
        - name: Install RHEL tools
          ansible.builtin.dnf:
            name: [subscription-manager, insights-client]
            state: present
        - name: Configure subscription
          ansible.builtin.command: subscription-manager register --auto-attach
      when: ansible_os_family == "RedHat"  # applies to ALL tasks in block`}
      />

      <InfoBox type="tip">
        <strong>Jinja2 tests you'll use often in <code>when</code> conditions:</strong>
        <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.2rem' }}>
          <li><code>is defined</code> / <code>is undefined</code> — variable exists?</li>
          <li><code>is none</code> / <code>is not none</code> — value is null?</li>
          <li><code>is string</code> / <code>is number</code> / <code>is iterable</code> — type check</li>
          <li><code>is file</code> / <code>is directory</code> — path type check</li>
          <li><code>| length &gt; 0</code> — non-empty string or list?</li>
          <li><code>in group_names</code> — host is in a specific group?</li>
        </ul>
      </InfoBox>

      <style>{`
        .fmt-btn {
          padding: 6px 18px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);
          background: var(--bg-card);
          color: var(--text-muted);
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 150ms;
        }
        .fmt-btn.active {
          border-color: var(--accent-primary);
          background: var(--accent-primary-subtle);
          color: var(--accent-primary);
        }
        .format-toggle {
          display: flex;
          gap: 8px;
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  )
}
