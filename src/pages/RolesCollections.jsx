import React, { useState } from 'react'
import PageHeader from '../components/PageHeader'
import CodeBlock from '../components/CodeBlock'
import InfoBox from '../components/InfoBox'

function DirTree({ items, color = '#818cf8' }) {
  return (
    <div style={{
      fontFamily: 'var(--font-mono)', fontSize: '0.83rem',
      lineHeight: '1.8', color: 'var(--text-secondary)',
      background: '#0d1117', padding: '1.25rem 1.5rem',
      borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)',
      margin: '1rem 0', overflowX: 'auto',
    }}>
      {items.map((item, i) => (
        <div key={i} style={{ whiteSpace: 'pre', color: item.special ? color : item.dir ? 'var(--accent-sky)' : 'var(--text-secondary)' }}>
          {item.prefix || ''}<span style={{ color: item.dir ? 'var(--accent-sky)' : item.special ? color : 'var(--text-secondary)' }}>{item.name}</span>
          {item.comment && <span style={{ color: '#4d6073', fontStyle: 'italic' }}>   {item.comment}</span>}
        </div>
      ))}
    </div>
  )
}

export default function RolesCollections() {
  const [activeTab, setActiveTab] = useState('roles')

  const tabs = [
    { key: 'roles', label: 'Roles' },
    { key: 'galaxy', label: 'Ansible Galaxy' },
    { key: 'collections', label: 'Content Collections' },
    { key: 'requirements', label: 'requirements.yml' },
  ]

  return (
    <div className="page-container fade-in">
      <PageHeader
        title="Roles &amp; Collections"
        icon="⬡"
        description="Build reusable automation with roles, share and consume content from Ansible Galaxy, and leverage Content Collections for namespaced modules and plugins."
        tags={['Roles', 'ansible-galaxy', 'Collections', 'Galaxy', 'Automation Hub', 'FQCN']}
      />

      <div style={{ display: 'flex', gap: '6px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)} style={{
            padding: '7px 18px', borderRadius: 'var(--radius-md)',
            border: `1px solid ${activeTab === t.key ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
            background: activeTab === t.key ? 'var(--accent-primary-subtle)' : 'var(--bg-card)',
            color: activeTab === t.key ? 'var(--accent-primary)' : 'var(--text-muted)',
            fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', transition: 'all 150ms',
          }}>{t.label}</button>
        ))}
      </div>

      {/* ── ROLES ─────────────────────────────────────────────── */}
      {activeTab === 'roles' && (
        <>
          <h2 className="section-title">Ansible Roles</h2>
          <p>
            A role is a <strong>structured directory of tasks, variables, files, and templates</strong>
            that packages related automation logic into a reusable unit. Roles enforce a consistent
            directory layout that Ansible understands automatically — no explicit path references needed.
          </p>

          <h3 style={{ color: 'var(--text-primary)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
            Role Directory Structure
          </h3>

          <DirTree items={[
            { name: 'roles/', dir: true, prefix: '' },
            { name: 'myrole/', dir: true, prefix: '└── ' },
            { name: 'tasks/', dir: true, prefix: '    ├── ', comment: '# REQUIRED: main.yml auto-loaded at play start' },
            { name: 'main.yml', prefix: '    │   ├── ', comment: '# entry point — import other task files from here' },
            { name: 'install.yml', prefix: '    │   ├── ' },
            { name: 'configure.yml', prefix: '    │   └── ' },
            { name: 'handlers/', dir: true, prefix: '    ├── ', comment: '# handlers auto-merged into play' },
            { name: 'main.yml', prefix: '    │   └── ' },
            { name: 'defaults/', dir: true, prefix: '    ├── ', comment: '# LOWEST priority variables (easy to override)' },
            { name: 'main.yml', prefix: '    │   └── ', special: true, comment: '# define role defaults here — all overridable' },
            { name: 'vars/', dir: true, prefix: '    ├── ', comment: '# HIGH priority variables (not meant to be overridden)' },
            { name: 'main.yml', prefix: '    │   └── ' },
            { name: 'files/', dir: true, prefix: '    ├── ', comment: '# static files for copy module (no path needed)' },
            { name: 'httpd.conf', prefix: '    │   └── ' },
            { name: 'templates/', dir: true, prefix: '    ├── ', comment: '# Jinja2 templates for template module' },
            { name: 'nginx.conf.j2', prefix: '    │   └── ' },
            { name: 'meta/', dir: true, prefix: '    ├── ', comment: '# role metadata and dependencies' },
            { name: 'main.yml', prefix: '    │   └── ', special: true, comment: '# galaxy_info + dependencies' },
            { name: 'tests/', dir: true, prefix: '    ├── ', comment: '# optional: test inventory + playbook' },
            { name: 'inventory', prefix: '    │   ├── ' },
            { name: 'test.yml', prefix: '    │   └── ' },
            { name: 'README.md', prefix: '    └── ', comment: '# required for Galaxy publishing' },
          ]} />

          <InfoBox type="key">
            <strong>defaults vs vars — the key difference:</strong>
            <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.2rem' }}>
              <li><code>defaults/main.yml</code> — precedence level 2 (lowest). Use for values you <em>expect users to override</em>. Example: <code>nginx_port: 80</code></li>
              <li><code>vars/main.yml</code> — precedence level 15 (high). Use for values that should <em>not</em> be overridden. Example: internal paths the role depends on.</li>
            </ul>
          </InfoBox>

          <h3 style={{ color: 'var(--text-primary)', marginTop: '1.5rem' }}>Creating a Role</h3>

          <CodeBlock
            language="bash"
            title="Creating and scaffolding roles"
            code={`# Create a role skeleton (generates all directories and empty main.yml files)
ansible-galaxy role init myrole
ansible-galaxy role init --init-path roles/ myrole   # inside roles/ dir

# The generated structure:
# myrole/
# ├── defaults/main.yml
# ├── files/
# ├── handlers/main.yml
# ├── meta/main.yml
# ├── README.md
# ├── tasks/main.yml
# ├── templates/
# ├── tests/
# │   ├── inventory
# │   └── test.yml
# └── vars/main.yml`}
          />

          <CodeBlock
            language="yaml"
            filename="roles/webserver/tasks/main.yml"
            code={`---
# tasks/main.yml — role entry point
# Import sub-task files by phase
- name: Import installation tasks
  ansible.builtin.import_tasks: install.yml
  tags: [install]

- name: Import configuration tasks
  ansible.builtin.import_tasks: configure.yml
  tags: [configure]

- name: Import service tasks
  ansible.builtin.import_tasks: service.yml
  tags: [service]`}
          />

          <CodeBlock
            language="yaml"
            filename="roles/webserver/tasks/install.yml"
            code={`---
# tasks/install.yml — installation phase
- name: Install web server packages
  ansible.builtin.dnf:
    name: "{{ webserver_packages }}"
    state: present

- name: Install optional modules
  ansible.builtin.dnf:
    name: "{{ item }}"
    state: present
  loop: "{{ webserver_optional_modules }}"
  when: webserver_optional_modules | length > 0`}
          />

          <CodeBlock
            language="yaml"
            filename="roles/webserver/defaults/main.yml"
            code={`---
# defaults/main.yml — easily overridable defaults
webserver_packages:
  - httpd
  - mod_ssl

webserver_optional_modules: []

webserver_port: 80
webserver_ssl_port: 443
webserver_root: /var/www/html
webserver_server_name: "{{ ansible_fqdn }}"

webserver_enable_ssl: false
webserver_ssl_cert: /etc/pki/tls/certs/localhost.crt
webserver_ssl_key: /etc/pki/tls/private/localhost.key`}
          />

          <CodeBlock
            language="yaml"
            filename="roles/webserver/handlers/main.yml"
            code={`---
# handlers/main.yml — handlers are auto-available to the play
- name: Restart httpd
  ansible.builtin.service:
    name: httpd
    state: restarted

- name: Reload httpd
  ansible.builtin.service:
    name: httpd
    state: reloaded

- name: Validate httpd config
  ansible.builtin.command: httpd -t
  changed_when: false`}
          />

          <CodeBlock
            language="yaml"
            filename="roles/webserver/meta/main.yml"
            code={`---
# meta/main.yml — role metadata and dependencies
galaxy_info:
  author: your_username
  description: Configure Apache HTTP Server on RHEL/CentOS
  company: Example Corp
  license: Apache-2.0
  min_ansible_version: "2.9"
  platforms:
    - name: EL                  # Enterprise Linux
      versions:
        - "8"
        - "9"
  galaxy_tags:
    - web
    - httpd
    - apache

# Role dependencies — installed/run BEFORE this role
dependencies:
  - role: common                # another local role
  - role: geerlingguy.firewall  # Galaxy role
    vars:
      firewall_allowed_tcp_ports: ["80", "443"]`}
          />

          <h3 style={{ color: 'var(--text-primary)', marginTop: '1.5rem' }}>Using Roles in Playbooks</h3>

          <CodeBlock
            language="yaml"
            filename="site.yml"
            code={`---
- name: Configure web servers
  hosts: webservers
  become: true

  # ── METHOD 1: roles key (runs before tasks) ───────────────
  roles:
    - common                      # simple: just role name
    - role: webserver             # full form
      vars:
        webserver_port: 8080      # override defaults
        webserver_enable_ssl: true
      tags: [web]

    - role: security
      when: apply_hardening | default(true)

  # ── METHOD 2: import_role (in tasks section) ──────────────
  tasks:
    - name: Apply webserver role
      ansible.builtin.import_role:
        name: webserver
      vars:
        webserver_port: 9090

    # ── METHOD 3: include_role (dynamic, supports loops/when) ─
    - name: Apply role for each environment
      ansible.builtin.include_role:
        name: "{{ item }}_setup"
      loop: [dev, staging, prod]
      loop_control:
        loop_var: item

# ── ROLE SEARCH ORDER ─────────────────────────────────────────
# Ansible looks for roles in this order:
# 1. roles/ directory relative to the playbook
# 2. ./roles/ in ansible.cfg's roles_path
# 3. ~/.ansible/roles
# 4. /usr/share/ansible/roles
# 5. /etc/ansible/roles

# In ansible.cfg:
# [defaults]
# roles_path = ./roles:~/.ansible/roles`}
          />
        </>
      )}

      {/* ── GALAXY ────────────────────────────────────────────── */}
      {activeTab === 'galaxy' && (
        <>
          <h2 className="section-title">Ansible Galaxy</h2>
          <p>
            Ansible Galaxy (<code>galaxy.ansible.com</code>) is the community hub for sharing
            Ansible roles and collections. You can use <code>ansible-galaxy</code> to install
            community content and publish your own.
          </p>

          <CodeBlock
            language="bash"
            title="ansible-galaxy role commands"
            code={`# ── SEARCH AND INFO ───────────────────────────────────────────
# Search Galaxy for roles
ansible-galaxy role search nginx

# Show info about a specific role
ansible-galaxy role info geerlingguy.nginx

# ── INSTALL ROLES ──────────────────────────────────────────────
# Install a single role
ansible-galaxy role install geerlingguy.nginx

# Install a specific version
ansible-galaxy role install geerlingguy.nginx,3.2.0

# Install into a specific path
ansible-galaxy role install geerlingguy.nginx -p roles/

# Install from requirements.yml
ansible-galaxy role install -r requirements.yml

# Install from requirements.yml into a specific path
ansible-galaxy role install -r requirements.yml -p roles/

# ── LIST INSTALLED ROLES ───────────────────────────────────────
ansible-galaxy role list

# ── REMOVE A ROLE ─────────────────────────────────────────────
ansible-galaxy role remove geerlingguy.nginx

# ── INIT A NEW ROLE ───────────────────────────────────────────
ansible-galaxy role init myrole
ansible-galaxy role init --init-path ./roles myrole

# ── DEFAULT INSTALL PATH ──────────────────────────────────────
# Roles are installed to ~/.ansible/roles by default
# Override in ansible.cfg:
#   [defaults]
#   roles_path = ./roles

# ── PRIVATE/CUSTOM SERVER ──────────────────────────────────────
# Install from a custom Galaxy server (Automation Hub)
ansible-galaxy role install myrole -s https://hub.example.com`}
          />

          <InfoBox type="tip">
            When working on the exam, you may need to install roles from a local
            <code> requirements.yml</code> file pointing to a <em>private</em> server or
            local paths. Use <code>ansible-galaxy role install -r requirements.yml</code>.
          </InfoBox>

          <CodeBlock
            language="bash"
            title="ansible-galaxy collection commands"
            code={`# ── INSTALL COLLECTIONS ───────────────────────────────────────
# Install a single collection (namespace.collection format)
ansible-galaxy collection install ansible.posix
ansible-galaxy collection install community.general
ansible-galaxy collection install redhat.rhel_system_roles

# Install a specific version
ansible-galaxy collection install ansible.posix:==1.5.4

# Install from requirements.yml
ansible-galaxy collection install -r requirements.yml

# Install to a specific path
ansible-galaxy collection install ansible.posix -p ./collections

# ── LIST INSTALLED COLLECTIONS ────────────────────────────────
ansible-galaxy collection list

# Show collection info
ansible-galaxy collection info ansible.posix

# ── DEFAULT INSTALL PATH ──────────────────────────────────────
# ~/.ansible/collections/ansible_collections/
# Override in ansible.cfg:
#   [defaults]
#   collections_path = ./collections

# ── FROM AUTOMATION HUB (Red Hat's private Galaxy) ────────────
# Configure in ansible.cfg or ansible-navigator.yml:
# [galaxy]
# server_list = automation_hub
#
# [galaxy_server.automation_hub]
# url = https://cloud.redhat.com/api/automation-hub/
# auth_url = https://sso.redhat.com/...
# token = <your-token>`}
          />
        </>
      )}

      {/* ── COLLECTIONS ───────────────────────────────────────── */}
      {activeTab === 'collections' && (
        <>
          <h2 className="section-title">Content Collections</h2>
          <p>
            Collections are the <strong>packaging format</strong> for distributing Ansible content:
            modules, roles, plugins, playbooks, and documentation — all under a
            <code> namespace.collection</code> namespace. They replace the old approach of
            bundling everything in a single Ansible release.
          </p>

          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)', padding: '1.5rem', margin: '1rem 0',
          }}>
            <h3 style={{ color: 'var(--accent-sky)', marginBottom: '1rem', fontSize: '0.95rem' }}>
              Collection Namespace Structure
            </h3>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: '2' }}>
              <div style={{ color: '#fbbf24', fontWeight: 700 }}>ansible.builtin</div>
              <div style={{ color: 'var(--text-muted)', paddingLeft: '1rem', fontSize: '0.78rem' }}>↳ namespace: ansible &nbsp;|&nbsp; collection: builtin &nbsp;|&nbsp; ships with Ansible core</div>
              <div style={{ color: '#34d399', fontWeight: 700, marginTop: '8px' }}>ansible.posix</div>
              <div style={{ color: 'var(--text-muted)', paddingLeft: '1rem', fontSize: '0.78rem' }}>↳ POSIX modules: mount, firewalld, authorized_key, acl, seboolean...</div>
              <div style={{ color: '#818cf8', fontWeight: 700, marginTop: '8px' }}>community.general</div>
              <div style={{ color: 'var(--text-muted)', paddingLeft: '1rem', fontSize: '0.78rem' }}>↳ large community collection: parted, lvg, lvol, archive, sefcontext...</div>
              <div style={{ color: '#c084fc', fontWeight: 700, marginTop: '8px' }}>redhat.rhel_system_roles</div>
              <div style={{ color: 'var(--text-muted)', paddingLeft: '1rem', fontSize: '0.78rem' }}>↳ Red Hat supported roles: network, storage, selinux, timesync...</div>
            </div>
          </div>

          <h3 style={{ color: 'var(--text-primary)', marginTop: '1.5rem' }}>Using Collections in Playbooks</h3>

          <CodeBlock
            language="yaml"
            filename="examples/using-collections.yml"
            code={`---
# ── METHOD 1: FQCN (Fully Qualified Collection Name) ──────────
# Always use FQCN — avoids ambiguity when multiple collections
# define modules with the same short name
- name: Use FQCN for all modules
  hosts: all
  become: true
  tasks:
    - ansible.builtin.dnf:          # always available, no install needed
        name: httpd
        state: present

    - ansible.posix.firewalld:      # from ansible.posix collection
        service: http
        state: enabled
        permanent: true
        immediate: true

    - community.general.lvol:       # from community.general
        vg: datavg
        lv: datalv
        size: 10g

    - ansible.posix.authorized_key: # from ansible.posix
        user: deployer
        key: "{{ lookup('file', 'keys/deployer.pub') }}"

# ── METHOD 2: collections keyword (shorthand) ─────────────────
# Specify collections at play level — then use short names
# (less safe — avoid on exam to prevent ambiguity)
- name: Using collections keyword
  hosts: all
  collections:
    - ansible.posix
    - community.general
  tasks:
    - firewalld:           # now resolves to ansible.posix.firewalld
        service: https
        state: enabled
        permanent: true
        immediate: true

    - lvol:               # resolves to community.general.lvol
        vg: myvg
        lv: mylv
        size: 5g

# ── FINDING MODULES IN A COLLECTION ───────────────────────────
# ansible-navigator doc ansible.posix.firewalld
# ansible-navigator doc -l            # list all available modules
# ansible-navigator doc -l --mode stdout | grep firewalld`}
          />

          <h3 style={{ color: 'var(--text-primary)', marginTop: '1.5rem' }}>Collection File Layout</h3>

          <DirTree items={[
            { name: 'collections/', dir: true, prefix: '' },
            { name: 'ansible_collections/', dir: true, prefix: '└── ' },
            { name: 'namespace/', dir: true, prefix: '    └── ' },
            { name: 'collection_name/', dir: true, prefix: '        └── ' },
            { name: 'plugins/', dir: true, prefix: '            ├── ', comment: '# modules, callbacks, inventory...' },
            { name: 'modules/', dir: true, prefix: '            │   └── ' },
            { name: 'roles/', dir: true, prefix: '            ├── ', comment: '# bundled roles' },
            { name: 'playbooks/', dir: true, prefix: '            ├── ', comment: '# bundled playbooks' },
            { name: 'docs/', dir: true, prefix: '            ├── ' },
            { name: 'tests/', dir: true, prefix: '            ├── ' },
            { name: 'galaxy.yml', prefix: '            └── ', special: true, comment: '# collection metadata' },
          ]} />

          <InfoBox type="exam">
            On the exam, you'll likely need to: (1) use <code>ansible-navigator doc</code> to
            find module parameters, (2) install a collection from a requirements file, and
            (3) use modules from <code>ansible.posix</code> and <code>community.general</code>
            with their full FQCN. Always use FQCN in your playbooks.
          </InfoBox>
        </>
      )}

      {/* ── REQUIREMENTS ──────────────────────────────────────── */}
      {activeTab === 'requirements' && (
        <>
          <h2 className="section-title">requirements.yml</h2>
          <p>
            A <code>requirements.yml</code> file declares all the roles and collections
            your project needs. It's the standard way to distribute dependency lists and
            is processed by <code>ansible-galaxy</code>.
          </p>

          <CodeBlock
            language="yaml"
            filename="requirements.yml"
            code={`---
# requirements.yml — declares all external dependencies
# Install with: ansible-galaxy install -r requirements.yml
# For collections: ansible-galaxy collection install -r requirements.yml
# For both:       ansible-galaxy install -r requirements.yml  (Ansible 2.10+)

# ── ROLES ─────────────────────────────────────────────────────
roles:
  # From Galaxy by name
  - name: geerlingguy.nginx

  # Specific version
  - name: geerlingguy.mysql
    version: "3.3.2"

  # From a Git repository (commit, branch, or tag)
  - name: my_custom_role
    src: https://github.com/example/ansible-role-custom.git
    version: main    # can be a tag, branch, or commit SHA
    scm: git

  # From a tarball URL
  - name: special_role
    src: https://example.com/roles/special_role.tar.gz

  # Local path (useful for monorepos)
  - name: local_role
    src: /path/to/local/role

# ── COLLECTIONS ───────────────────────────────────────────────
collections:
  # From Galaxy/Automation Hub
  - name: ansible.posix
    version: ">=1.4.0"

  - name: community.general
    version: ">=6.0.0"

  - name: redhat.rhel_system_roles

  # From a Git repository
  - name: my_org.internal_collection
    source: https://github.com/myorg/ansible-collection-internal.git
    type: git
    version: v1.2.0

  # From a URL
  - name: special.collection
    source: https://example.com/collections/special-1.0.0.tar.gz
    type: url`}
          />

          <CodeBlock
            language="bash"
            title="Installing from requirements.yml"
            code={`# Install BOTH roles and collections from requirements.yml
ansible-galaxy install -r requirements.yml

# Install only collections
ansible-galaxy collection install -r requirements.yml

# Install to a project-local path (recommended for exam scenarios)
ansible-galaxy install -r requirements.yml -p ./roles
ansible-galaxy collection install -r requirements.yml -p ./collections

# Force re-install (even if already installed)
ansible-galaxy install -r requirements.yml --force

# Verify what's installed
ansible-galaxy role list
ansible-galaxy collection list`}
          />

          <h3 style={{ color: 'var(--text-primary)', marginTop: '1.5rem' }}>Project Layout with Requirements</h3>

          <DirTree items={[
            { name: 'my-project/', dir: true, prefix: '' },
            { name: 'ansible.cfg', prefix: '├── ', special: true, comment: '# roles_path = ./roles, collections_path = ./collections' },
            { name: 'requirements.yml', prefix: '├── ', special: true, comment: '# all external deps declared here' },
            { name: 'site.yml', prefix: '├── ' },
            { name: 'inventory/', dir: true, prefix: '├── ' },
            { name: 'hosts', prefix: '│   └── ' },
            { name: 'roles/', dir: true, prefix: '├── ', comment: '# local roles AND installed from requirements.yml' },
            { name: 'my_local_role/', dir: true, prefix: '│   ├── ' },
            { name: 'geerlingguy.nginx/', dir: true, prefix: '│   └── ', comment: '# installed by ansible-galaxy' },
            { name: 'collections/', dir: true, prefix: '└── ', comment: '# installed collections' },
            { name: 'ansible_collections/', dir: true, prefix: '    └── ' },
            { name: 'ansible/', dir: true, prefix: '        └── ' },
            { name: 'posix/', dir: true, prefix: '            └── ', comment: '# ansible.posix collection' },
          ]} />

          <CodeBlock
            language="ini"
            filename="ansible.cfg"
            code={`[defaults]
# Point Ansible to local directories for offline/isolated use
roles_path       = ./roles
collections_path = ./collections
inventory        = ./inventory/hosts

# This lets you use roles installed by:
#   ansible-galaxy role install -r requirements.yml -p ./roles
# And collections installed by:
#   ansible-galaxy collection install -r requirements.yml -p ./collections`}
          />
        </>
      )}
    </div>
  )
}
