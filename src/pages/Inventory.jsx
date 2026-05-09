import React, { useState } from 'react'
import PageHeader from '../components/PageHeader'
import CodeBlock from '../components/CodeBlock'
import InfoBox from '../components/InfoBox'

export default function Inventory() {
  const [format, setFormat] = useState('ini')

  return (
    <div className="page-container fade-in">
      <PageHeader
        title="Inventory Management"
        icon="☰"
        description="Define and organize your managed nodes using static inventories in INI or YAML format, with groups, subgroups, variables, and behavioral parameters."
        tags={['INI', 'YAML', 'Groups', 'host_vars', 'group_vars', 'Ranges']}
      />

      <h2 className="section-title">What Is an Inventory?</h2>
      <p>
        An inventory is a file (or directory) that tells Ansible <em>which hosts to manage</em>.
        Hosts can be organized into <strong>groups</strong>, and groups can have
        <strong>subgroups</strong> (parent/child relationships). Variables can be attached to
        individual hosts or entire groups.
      </p>

      <div className="format-toggle">
        <button className={`fmt-btn ${format === 'ini' ? 'active' : ''}`} onClick={() => setFormat('ini')}>INI Format</button>
        <button className={`fmt-btn ${format === 'yaml' ? 'active' : ''}`} onClick={() => setFormat('yaml')}>YAML Format</button>
      </div>

      {format === 'ini' ? (
        <CodeBlock
          language="ini"
          filename="inventory/hosts"
          code={`# INI Format Inventory
# Lines starting with # are comments

# ── UNGROUPED HOSTS ───────────────────────────────────────────
# Hosts listed before any group header go into [ungrouped]
bastion.example.com

# ── SIMPLE GROUP ──────────────────────────────────────────────
[webservers]
web1.example.com
web2.example.com
web3.example.com

[dbservers]
db1.example.com
db2.example.com

# ── HOST RANGES ───────────────────────────────────────────────
# Numeric ranges: web[01:05] = web01, web02, web03, web04, web05
[production]
web[01:05].example.com
db[01:02].example.com

# Alphabetic ranges: web[a:c] = weba, webb, webc
[lab]
test[a:c].lab.example.com

# ── HOST VARIABLES ────────────────────────────────────────────
[staging]
# Inline variables (use for simple, non-sensitive vars)
stg-web1.example.com  ansible_host=192.168.1.10  http_port=8080
stg-web2.example.com  ansible_host=192.168.1.11  http_port=8081

# ── GROUPS OF GROUPS (children) ───────────────────────────────
[datacenter:children]
webservers
dbservers
production
# datacenter group now contains all hosts from the listed groups

[all_servers:children]
datacenter
staging

# ── GROUP VARIABLES ───────────────────────────────────────────
[webservers:vars]
ansible_user=webadmin
http_port=80
max_connections=1000
document_root=/var/www/html

[dbservers:vars]
ansible_user=dbadmin
mysql_port=3306
backup_enabled=true

# ── BEHAVIORAL INVENTORY PARAMETERS ──────────────────────────
# These are special variables that Ansible interprets:
[specials]
# Connect to this IP/hostname instead of inventory name
server1.example.com ansible_host=10.0.0.50

# Connect on non-standard port
old-server.example.com ansible_port=2222

# Connect as different user
secure-host.example.com ansible_user=deploy ansible_become_user=root

# Use password auth (not recommended - use vault if needed)
# legacy.example.com ansible_password=secret

# Python interpreter
py3host.example.com ansible_python_interpreter=/usr/bin/python3

# Connection type
local-task ansible_connection=local    # run on control node itself
windows-host ansible_connection=winrm  # Windows hosts`}
        />
      ) : (
        <CodeBlock
          language="yaml"
          filename="inventory/hosts.yml"
          code={`---
# YAML Format Inventory (equivalent to the INI version)
all:
  hosts:
    # Ungrouped hosts (direct children of 'all')
    bastion.example.com: {}

  children:
    webservers:
      hosts:
        web1.example.com: {}
        web2.example.com: {}
        web3.example.com: {}
      vars:
        http_port: 80
        document_root: /var/www/html

    dbservers:
      hosts:
        db1.example.com: {}
        db2.example.com: {}
      vars:
        mysql_port: 3306
        backup_enabled: true

    staging:
      hosts:
        stg-web1.example.com:
          ansible_host: 192.168.1.10
          http_port: 8080
        stg-web2.example.com:
          ansible_host: 192.168.1.11
          http_port: 8081

    # Groups of groups
    datacenter:
      children:
        webservers: {}
        dbservers: {}

    # Special behavioral parameters as host variables
    specials:
      hosts:
        server1.example.com:
          ansible_host: 10.0.0.50
        old-server.example.com:
          ansible_port: 2222
        secure-host.example.com:
          ansible_user: deploy
          ansible_become_user: root
        local-task:
          ansible_connection: local`}
        />
      )}

      {/* Special Groups */}
      <h2 className="section-title mt-8">Special Groups: all and ungrouped</h2>
      <div className="card-grid">
        <div className="card">
          <h4 style={{ color: 'var(--accent-primary)', marginBottom: '8px' }}>all</h4>
          <p style={{ fontSize: '0.85rem', marginBottom: 0 }}>
            Always exists. Contains <em>every host</em> in the inventory. Using
            <code>hosts: all</code> in a play targets every host. You can also set
            group variables for <code>all</code> in <code>group_vars/all.yml</code>.
          </p>
        </div>
        <div className="card">
          <h4 style={{ color: 'var(--accent-sky)', marginBottom: '8px' }}>ungrouped</h4>
          <p style={{ fontSize: '0.85rem', marginBottom: 0 }}>
            Contains hosts that aren't in any explicitly-named group.
            Every host is always in <code>all</code>, but hosts without explicit groups
            also appear in <code>ungrouped</code>.
          </p>
        </div>
      </div>

      {/* host_vars and group_vars */}
      <h2 className="section-title mt-8">host_vars and group_vars Directories</h2>
      <p>
        For anything beyond simple inline variables, organize your variables in
        <strong>directory structures</strong> alongside your inventory. Ansible automatically
        loads these files.
      </p>
      <div className="diagram-container">
        <pre>{`
  Recommended project layout:

  project/
  ├── ansible.cfg
  ├── inventory/
  │   ├── hosts                    ← Inventory file
  │   ├── host_vars/               ← Per-host variable files
  │   │   ├── web1.example.com/    ← Directory (for vault + plain)
  │   │   │   ├── vars.yml         ← Plain variables
  │   │   │   └── vault.yml        ← Encrypted variables
  │   │   ├── db1.example.com.yml  ← Single file (simpler)
  │   │   └── bastion.example.com.yml
  │   └── group_vars/              ← Per-group variable files
  │       ├── all/                 ← Variables for ALL hosts
  │       │   ├── vars.yml
  │       │   └── vault.yml
  │       ├── webservers.yml       ← Variables for webservers group
  │       ├── dbservers/
  │       │   ├── vars.yml
  │       │   └── vault.yml
  │       └── staging.yml
  └── site.yml
`}</pre>
      </div>

      <CodeBlock
        language="yaml"
        filename="inventory/group_vars/all/vars.yml"
        code={`---
# Variables that apply to ALL hosts
ansible_user: ansible
ntp_servers:
  - 0.rhel.pool.ntp.org
  - 1.rhel.pool.ntp.org
dns_servers:
  - 8.8.8.8
  - 8.8.4.4
log_level: info
timezone: America/New_York`}
      />

      <CodeBlock
        language="yaml"
        filename="inventory/group_vars/webservers.yml"
        code={`---
# Variables for the webservers group
http_port: 80
https_port: 443
document_root: /var/www/html
server_admin: webmaster@example.com
enable_ssl: true

# List variables
vhosts:
  - name: app1.example.com
    docroot: /var/www/app1
  - name: app2.example.com
    docroot: /var/www/app2`}
      />

      <CodeBlock
        language="yaml"
        filename="inventory/host_vars/db1.example.com.yml"
        code={`---
# Variables specific to db1.example.com
mysql_bind_address: 0.0.0.0
mysql_max_connections: 300
mysql_innodb_buffer_pool_size: "2G"
db_replication_role: master

# Ansible connection parameters can also go here
ansible_host: 10.0.1.25    # actual IP to connect to
ansible_port: 22`}
      />

      {/* Behavioral Inventory Parameters */}
      <h2 className="section-title mt-8">Behavioral Inventory Parameters</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Description</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['ansible_host', 'IP or hostname to SSH to (overrides inventory name)', '10.0.0.25'],
              ['ansible_port', 'SSH port to connect on (default: 22)', '2222'],
              ['ansible_user', 'SSH user to connect as', 'deploy'],
              ['ansible_password', 'SSH password (use vault!)', 'mypass'],
              ['ansible_ssh_private_key_file', 'Path to private key file', '~/.ssh/deploy_key'],
              ['ansible_connection', 'Connection plugin: ssh, local, winrm, docker', 'local'],
              ['ansible_python_interpreter', 'Path to Python on managed node', '/usr/bin/python3'],
              ['ansible_become', 'Enable privilege escalation for this host', 'true'],
              ['ansible_become_method', 'Method: sudo, su, pbrun, pfexec', 'sudo'],
              ['ansible_become_user', 'User to escalate to', 'root'],
              ['ansible_become_password', 'Sudo password (use vault!)', 'sudopass'],
            ].map(([param, desc, example]) => (
              <tr key={param}>
                <td><code>{param}</code></td>
                <td style={{ fontSize: '0.82rem' }}>{desc}</td>
                <td><code style={{ fontSize: '0.78rem' }}>{example}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ansible-navigator inventory */}
      <h2 className="section-title mt-8">ansible-navigator Inventory Commands</h2>
      <CodeBlock
        language="bash"
        title="Working with inventory via ansible-navigator"
        code={`# List all hosts in inventory
ansible-navigator inventory --list

# List in JSON format
ansible-navigator inventory --list --mode stdout

# List in YAML format
ansible-navigator inventory --list --format yaml

# Show host graph (groups and membership)
ansible-navigator inventory --graph

# Show graph for specific group
ansible-navigator inventory --graph webservers

# Show variables for a specific host
ansible-navigator inventory --host server1.example.com

# Use a specific inventory file
ansible-navigator inventory -i /path/to/inventory --list

# Equivalent ansible commands (without navigator):
ansible-inventory --list
ansible-inventory --graph
ansible-inventory --host server1.example.com
ansible all --list-hosts
ansible webservers --list-hosts`}
      />

      <InfoBox type="exam" title="Inventory Exam Tips">
        <ul>
          <li>Always verify your inventory with <code>ansible-navigator inventory --graph</code></li>
          <li>Group names are case-sensitive. <code>webservers</code> ≠ <code>WebServers</code></li>
          <li>A host can be in multiple groups — this is intentional and useful</li>
          <li>Use <code>ansible_host</code> when the inventory name differs from the actual hostname/IP</li>
          <li><code>group_vars/all/</code> variables apply to every host — use for org-wide settings</li>
          <li>Variable files in <code>host_vars/</code> override <code>group_vars/</code> for that host</li>
        </ul>
      </InfoBox>

      <style>{`
        .format-toggle {
          display: flex;
          gap: 8px;
          margin-bottom: var(--space-4);
        }

        .fmt-btn {
          padding: 8px 20px;
          border: 1px solid var(--border-muted);
          border-radius: var(--radius-md);
          background: transparent;
          color: var(--text-muted);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
          font-family: var(--font-mono);
        }

        .fmt-btn:hover {
          border-color: var(--accent-primary);
          color: var(--text-primary);
        }

        .fmt-btn.active {
          background: var(--accent-primary-subtle);
          border-color: var(--accent-primary);
          color: var(--accent-primary);
        }
      `}</style>
    </div>
  )
}
