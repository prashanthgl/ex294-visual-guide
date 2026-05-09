import React from 'react'
import PageHeader from '../components/PageHeader'
import CodeBlock from '../components/CodeBlock'
import InfoBox from '../components/InfoBox'

export default function AnsibleSetup() {
  return (
    <div className="page-container fade-in">
      <PageHeader
        title="Ansible Setup & Configuration"
        icon="⚙"
        description="Install Ansible, configure ansible.cfg and ansible-navigator.yml, set up SSH keys, configure privilege escalation, and test connectivity to managed nodes."
        tags={['ansible.cfg', 'ansible-navigator', 'SSH', 'sudo', 'privilege escalation']}
      />

      {/* Architecture Diagram */}
      <h2 className="section-title">Ansible Architecture</h2>
      <div className="diagram-container">
        <pre>{`
  Control Node (where Ansible runs):
  ┌─────────────────────────────────────────────────────────────┐
  │  ~/project/                                                  │
  │  ├── ansible.cfg          ← Configuration                   │
  │  ├── ansible-navigator.yml ← Navigator config               │
  │  ├── inventory/                                              │
  │  │   ├── hosts            ← Static inventory                │
  │  │   ├── host_vars/       ← Per-host variables              │
  │  │   └── group_vars/      ← Per-group variables             │
  │  ├── roles/               ← Role definitions                │
  │  ├── collections/         ← Content collections             │
  │  └── site.yml             ← Main playbook                   │
  │                                                             │
  │  [ansible-navigator / ansible-playbook]                     │
  │         ↓                                                   │
  │  Reads inventory, builds host list                          │
  │         ↓                                                   │
  │  SSH to each managed node                                   │
  └─────────────────────────────────────────────────────────────┘
           │                    │                    │
           │ SSH                │ SSH                │ SSH
           ▼                    ▼                    ▼
  ┌────────────────┐  ┌─────────────────┐  ┌────────────────┐
  │  Managed Node  │  │  Managed Node   │  │ Managed Node   │
  │  server1.      │  │  server2.       │  │  db1.          │
  │  example.com   │  │  example.com    │  │  example.com   │
  │                │  │                 │  │                │
  │  ansible user  │  │  ansible user   │  │  ansible user  │
  │  (sudo → root) │  │  (sudo → root)  │  │  (sudo → root) │
  │                │  │                 │  │                │
  │  Python 3.x    │  │  Python 3.x     │  │  Python 3.x    │
  └────────────────┘  └─────────────────┘  └────────────────┘

  Ansible is AGENTLESS — no daemon runs on managed nodes!
  It uses SSH + Python (copied temporarily) to execute tasks.
`}</pre>
      </div>

      {/* Installation */}
      <h2 className="section-title mt-8">Installing Ansible</h2>
      <p>
        On RHEL 9, Ansible is available through the <strong>AppStream repository</strong> as
        the <code>ansible-core</code> package. The <code>ansible-navigator</code> tool requires
        a separate package and container runtime.
      </p>
      <CodeBlock
        language="bash"
        title="Installation methods"
        code={`# Method 1: RPM package (RHEL/RHCSA registered system)
# Enable the AppStream repo if needed
subscription-manager repos --enable ansible-automation-platform-2.4-for-rhel-9-x86_64-rpms

# Install ansible-core
dnf install -y ansible-core

# Install ansible-navigator (includes ansible-builder)
dnf install -y ansible-navigator

# Verify installation
ansible --version
ansible-navigator --version

# Method 2: pip (Python package manager)
python3 -m pip install --user ansible
python3 -m pip install --user ansible-navigator

# Verify
ansible --version
# Shows: ansible [core 2.14.x]
#   python version = 3.11.x
#   jinja version = 3.1.x

# Where is ansible?
which ansible                     # /usr/bin/ansible
rpm -ql ansible-core | head -20   # list installed files`}
      />

      {/* ansible.cfg */}
      <h2 className="section-title mt-8">ansible.cfg — Configuration Deep Dive</h2>
      <p>
        Ansible searches for its configuration file in this order (first found wins):
      </p>
      <div className="config-search-order">
        {[
          { env: 'ANSIBLE_CONFIG', desc: 'Environment variable (if set)' },
          { env: './ansible.cfg', desc: 'Current directory (most common for projects)' },
          { env: '~/.ansible.cfg', desc: 'User home directory' },
          { env: '/etc/ansible/ansible.cfg', desc: 'System-wide default' },
        ].map((item, i) => (
          <div key={i} className="config-search-item">
            <span className="config-search-num">{i + 1}</span>
            <code className="config-search-path">{item.env}</code>
            <span className="config-search-desc">{item.desc}</span>
          </div>
        ))}
      </div>

      <CodeBlock
        language="ini"
        filename="ansible.cfg"
        code={`[defaults]
# Inventory file or directory
inventory = ./inventory

# Remote user to connect as
remote_user = ansible

# Disable SSH host key checking (useful in labs, not production)
host_key_checking = False

# Path to roles
roles_path = ./roles:~/.ansible/roles:/usr/share/ansible/roles

# Collections path
collections_paths = ./collections:~/.ansible/collections

# Timeout for connection (seconds)
timeout = 30

# Number of parallel processes
forks = 10

# Log file (disabled by default, enable for debugging)
# log_path = /var/log/ansible.log

# Fact caching (speeds up repeated plays)
gathering = smart
fact_caching = jsonfile
fact_caching_connection = /tmp/ansible_facts_cache
fact_caching_timeout = 3600

# Retry files (don't create .retry files)
retry_files_enabled = False

# Stdout callback plugin
stdout_callback = yaml
# Other options: minimal, dense, json, debug

# Show task warnings
deprecation_warnings = False

[privilege_escalation]
# Enable become by default
become = True
become_method = sudo
become_user = root
# Ask for sudo password (usually set False when using NOPASSWD)
become_ask_pass = False

[ssh_connection]
# SSH multiplexing (reuse connections for speed)
ssh_args = -o ControlMaster=auto -o ControlPersist=60s -o ForwardAgent=no
# Pipelining: send multiple commands in one connection (faster!)
# Requires requiretty to be disabled in sudoers
pipelining = True

# Connection type (paramiko = Python SSH, ssh = system ssh)
transport = ssh

[inventory]
# Enable inventory plugins
enable_plugins = host_list, script, auto, yaml, ini, toml`}
      />

      <InfoBox type="warning" title="ansible.cfg Security Warning">
        <p>
          Never put <code>ansible.cfg</code> in a world-writable directory — Ansible will ignore
          it as a security measure. If Ansible seems to ignore your config, check the directory
          permissions.
        </p>
        <p style={{ marginTop: '8px' }}>
          Use <code>ansible --version</code> to see which config file is being used:
          it prints <code>config file = /path/to/ansible.cfg</code>.
        </p>
      </InfoBox>

      {/* ansible-navigator.yml */}
      <h2 className="section-title mt-8">ansible-navigator.yml</h2>
      <CodeBlock
        language="yaml"
        filename="ansible-navigator.yml"
        code={`---
ansible-navigator:
  # Execution Environment (container with Ansible + deps)
  execution-environment:
    enabled: true
    image: registry.redhat.io/ansible-automation-platform/ee-supported-rhel8:latest
    pull:
      policy: missing    # pull if not present locally

  # Mode: interactive (TUI) or stdout
  mode: stdout           # use 'interactive' for TUI

  # Playbook artifact (save run results)
  playbook-artifact:
    enable: false
    # save-as: /tmp/artifact.json

  # Logging
  logging:
    level: warning
    # file: /tmp/navigator.log

  # ansible-navigator will use these for ansible
  ansible:
    inventories:
      - ./inventory
    cmdline: "--extra-vars env=production"

  # Color output
  color:
    enable: true

  # Documentation
  documentation:
    # Path for ansible-doc (in EE)
    plugin:
      try-resolve: true`}
      />

      {/* SSH Key Setup */}
      <h2 className="section-title mt-8">SSH Key Distribution</h2>
      <CodeBlock
        language="bash"
        title="Setting up SSH key authentication"
        code={`# On the control node: generate SSH key pair
ssh-keygen -t ed25519 -C "ansible control node"
# Press Enter for no passphrase (needed for automation)
# Keys created:
#   ~/.ssh/id_ed25519      (private key — KEEP SECRET)
#   ~/.ssh/id_ed25519.pub  (public key — copy to managed nodes)

# Copy public key to each managed node
ssh-copy-id -i ~/.ssh/id_ed25519.pub ansible@server1.example.com
ssh-copy-id -i ~/.ssh/id_ed25519.pub ansible@server2.example.com

# What ssh-copy-id does behind the scenes:
cat ~/.ssh/id_ed25519.pub >> ~/.ssh/authorized_keys  # on remote
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys

# Test SSH key authentication
ssh ansible@server1.example.com    # should NOT prompt for password
ssh -i ~/.ssh/id_ed25519 ansible@server1.example.com

# Use Ansible to distribute the key to multiple hosts
# (after you've done it manually for one host to bootstrap)
ansible all -m authorized_key -a "user=ansible key='{{ lookup(\"file\", \"~/.ssh/id_ed25519.pub\") }}'" -b

# Or with a playbook:
cat > setup-ssh-keys.yml << 'EOF'
---
- name: Distribute SSH keys to managed nodes
  hosts: all
  become: true
  tasks:
    - name: Create ansible user
      user:
        name: ansible
        shell: /bin/bash
        state: present

    - name: Add SSH public key
      authorized_key:
        user: ansible
        key: "{{ lookup('file', '~/.ssh/id_ed25519.pub') }}"
        state: present
EOF`}
      />

      {/* Privilege Escalation */}
      <h2 className="section-title mt-8">Privilege Escalation (sudo)</h2>
      <p>
        Most managed nodes need Ansible to run tasks as root. The recommended approach is
        to create an <code>ansible</code> user with passwordless sudo access.
      </p>
      <CodeBlock
        language="bash"
        title="Configure sudoers on managed nodes"
        code={`# On each managed node, configure sudoers
# Method 1: visudo (safer - validates syntax)
visudo
# Add this line:
# ansible ALL=(ALL) NOPASSWD: ALL

# Method 2: Drop-in file (preferred)
echo "ansible ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/ansible
chmod 440 /etc/sudoers.d/ansible

# Verify it works
sudo -l -U ansible            # list ansible's sudo permissions
su - ansible -c "sudo id"     # test: should print uid=0(root)

# Deploy sudoers configuration via Ansible:
cat > configure-sudo.yml << 'EOF'
---
- name: Configure ansible user sudoers
  hosts: all
  become: true
  tasks:
    - name: Ensure ansible user exists
      user:
        name: ansible
        state: present

    - name: Configure passwordless sudo for ansible
      copy:
        content: "ansible ALL=(ALL) NOPASSWD: ALL\n"
        dest: /etc/sudoers.d/ansible
        mode: '0440'
        owner: root
        group: root
        validate: /usr/sbin/visudo -cf %s
EOF`}
      />

      <CodeBlock
        language="yaml"
        title="Privilege escalation in playbooks"
        code={`---
# Play-level become (affects all tasks)
- name: Configure web server
  hosts: webservers
  become: true           # become root for ALL tasks in this play
  become_method: sudo    # default, can also use: su, pbrun, pfexec
  become_user: root      # default, but you can escalate to other users

  tasks:
    - name: Install Apache (needs root)
      dnf:
        name: httpd
        state: present

    # Task-level override: run as specific user
    - name: Run script as webapp user
      command: /opt/webapp/deploy.sh
      become: true
      become_user: webapp    # escalate to webapp user, not root

    # Task-level: run WITHOUT become (as remote_user)
    - name: Check user files (no root needed)
      find:
        paths: /home/ansible
      become: false          # override play-level become

# Block-level become
    - block:
        - name: Task 1 needing root
          copy:
            src: config.conf
            dest: /etc/myapp/config.conf
        - name: Task 2 needing root
          service:
            name: myapp
            state: restarted
      become: true
      become_user: root`}
      />

      {/* Testing */}
      <h2 className="section-title mt-8">Testing Connectivity</h2>
      <CodeBlock
        language="bash"
        title="Verify Ansible can reach managed nodes"
        code={`# Ping all hosts (uses Ansible ping module, not ICMP)
ansible all -m ping

# Expected output:
# server1.example.com | SUCCESS => {
#     "ansible_facts": {
#         "discovered_interpreter_python": "/usr/bin/python3"
#     },
#     "changed": false,
#     "ping": "pong"
# }

# Ping specific group
ansible webservers -m ping

# Run an ad-hoc command
ansible all -m command -a "id"
ansible all -m command -a "uptime"
ansible all -m shell -a "df -h | grep -v tmpfs"

# Gather facts (verify Python is available)
ansible all -m setup | head -60
ansible server1.example.com -m setup -a "filter=ansible_distribution*"

# Check sudo works
ansible all -m command -a "id" -b    # -b = become root
# Should show: uid=0(root)

# Troubleshooting flags
ansible all -m ping -v          # verbose
ansible all -m ping -vv         # more verbose
ansible all -m ping -vvv        # connection debugging
ansible all -m ping --check     # dry run (no changes)

# Limit to specific hosts
ansible all -m ping --limit server1.example.com
ansible all -m ping --limit "server1,server2"
ansible all -m ping --limit "webservers:!dbservers"  # exclude group`}
      />

      <InfoBox type="exam" title="Exam Configuration Checklist">
        <ul>
          <li>Create <code>ansible.cfg</code> in your project directory with correct <code>inventory</code>, <code>remote_user</code>, and become settings</li>
          <li>Verify <code>ansible --version</code> shows the correct config file path</li>
          <li>Ensure SSH key is in place on managed nodes</li>
          <li>Test with <code>ansible all -m ping</code> before starting tasks</li>
          <li>Check <code>ansible all -m command -a "id" -b</code> returns UID 0 (root)</li>
        </ul>
      </InfoBox>

      <style>{`
        .config-search-order {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin: var(--space-5) 0;
        }

        .config-search-item {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          background: var(--bg-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 10px 16px;
        }

        .config-search-num {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          background: var(--accent-primary-dim);
          color: white;
          font-size: 0.75rem;
          font-weight: 700;
          border-radius: 50%;
          flex-shrink: 0;
          font-family: var(--font-mono);
        }

        .config-search-path {
          font-size: 0.82rem;
          color: var(--accent-sky);
          min-width: 200px;
        }

        .config-search-desc {
          font-size: 0.82rem;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  )
}
