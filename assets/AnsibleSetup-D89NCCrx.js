import{j as e}from"./index-V6pXZagA.js";import{P as o,C as s}from"./CodeBlock-ClK0BBrp.js";import{I as a}from"./InfoBox-D5QG7ZYC.js";function c(){return e.jsxs("div",{className:"page-container fade-in",children:[e.jsx(o,{title:"Ansible Setup & Configuration",icon:"⚙",description:"Install Ansible, configure ansible.cfg and ansible-navigator.yml, set up SSH keys, configure privilege escalation, and test connectivity to managed nodes.",tags:["ansible.cfg","ansible-navigator","SSH","sudo","privilege escalation"]}),e.jsx("h2",{className:"section-title",children:"Ansible Architecture"}),e.jsx("div",{className:"diagram-container",children:e.jsx("pre",{children:`
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
`})}),e.jsx("h2",{className:"section-title mt-8",children:"Installing Ansible"}),e.jsxs("p",{children:["On RHEL 9, Ansible is available through the ",e.jsx("strong",{children:"AppStream repository"})," as the ",e.jsx("code",{children:"ansible-core"})," package. The ",e.jsx("code",{children:"ansible-navigator"})," tool requires a separate package and container runtime."]}),e.jsx(s,{language:"bash",title:"Installation methods",code:`# Method 1: RPM package (RHEL/RHCSA registered system)
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
rpm -ql ansible-core | head -20   # list installed files`}),e.jsx("h2",{className:"section-title mt-8",children:"ansible.cfg — Configuration Deep Dive"}),e.jsx("p",{children:"Ansible searches for its configuration file in this order (first found wins):"}),e.jsx("div",{className:"config-search-order",children:[{env:"ANSIBLE_CONFIG",desc:"Environment variable (if set)"},{env:"./ansible.cfg",desc:"Current directory (most common for projects)"},{env:"~/.ansible.cfg",desc:"User home directory"},{env:"/etc/ansible/ansible.cfg",desc:"System-wide default"}].map((n,i)=>e.jsxs("div",{className:"config-search-item",children:[e.jsx("span",{className:"config-search-num",children:i+1}),e.jsx("code",{className:"config-search-path",children:n.env}),e.jsx("span",{className:"config-search-desc",children:n.desc})]},i))}),e.jsx(s,{language:"ini",filename:"ansible.cfg",code:`[defaults]
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
enable_plugins = host_list, script, auto, yaml, ini, toml`}),e.jsxs(a,{type:"warning",title:"ansible.cfg Security Warning",children:[e.jsxs("p",{children:["Never put ",e.jsx("code",{children:"ansible.cfg"})," in a world-writable directory — Ansible will ignore it as a security measure. If Ansible seems to ignore your config, check the directory permissions."]}),e.jsxs("p",{style:{marginTop:"8px"},children:["Use ",e.jsx("code",{children:"ansible --version"})," to see which config file is being used: it prints ",e.jsx("code",{children:"config file = /path/to/ansible.cfg"}),"."]})]}),e.jsx("h2",{className:"section-title mt-8",children:"ansible-navigator.yml"}),e.jsx(s,{language:"yaml",filename:"ansible-navigator.yml",code:`---
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
      try-resolve: true`}),e.jsx("h2",{className:"section-title mt-8",children:"SSH Key Distribution"}),e.jsx(s,{language:"bash",title:"Setting up SSH key authentication",code:`# On the control node: generate SSH key pair
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
ansible all -m authorized_key -a "user=ansible key='{{ lookup("file", "~/.ssh/id_ed25519.pub") }}'" -b

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
EOF`}),e.jsx("h2",{className:"section-title mt-8",children:"Privilege Escalation (sudo)"}),e.jsxs("p",{children:["Most managed nodes need Ansible to run tasks as root. The recommended approach is to create an ",e.jsx("code",{children:"ansible"})," user with passwordless sudo access."]}),e.jsx(s,{language:"bash",title:"Configure sudoers on managed nodes",code:`# On each managed node, configure sudoers
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
        content: "ansible ALL=(ALL) NOPASSWD: ALL
"
        dest: /etc/sudoers.d/ansible
        mode: '0440'
        owner: root
        group: root
        validate: /usr/sbin/visudo -cf %s
EOF`}),e.jsx(s,{language:"yaml",title:"Privilege escalation in playbooks",code:`---
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
      become_user: root`}),e.jsx("h2",{className:"section-title mt-8",children:"Testing Connectivity"}),e.jsx(s,{language:"bash",title:"Verify Ansible can reach managed nodes",code:`# Ping all hosts (uses Ansible ping module, not ICMP)
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
ansible all -m ping --limit "webservers:!dbservers"  # exclude group`}),e.jsx(a,{type:"exam",title:"Exam Configuration Checklist",children:e.jsxs("ul",{children:[e.jsxs("li",{children:["Create ",e.jsx("code",{children:"ansible.cfg"})," in your project directory with correct ",e.jsx("code",{children:"inventory"}),", ",e.jsx("code",{children:"remote_user"}),", and become settings"]}),e.jsxs("li",{children:["Verify ",e.jsx("code",{children:"ansible --version"})," shows the correct config file path"]}),e.jsx("li",{children:"Ensure SSH key is in place on managed nodes"}),e.jsxs("li",{children:["Test with ",e.jsx("code",{children:"ansible all -m ping"})," before starting tasks"]}),e.jsxs("li",{children:["Check ",e.jsx("code",{children:'ansible all -m command -a "id" -b'})," returns UID 0 (root)"]})]})}),e.jsx("style",{children:`
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
      `})]})}export{c as default};
