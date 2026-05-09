import{r as d,j as e,R as c}from"./index-V6pXZagA.js";import{P as m,C as a}from"./CodeBlock-ClK0BBrp.js";import{I as s}from"./InfoBox-D5QG7ZYC.js";function b(){return e.jsxs("div",{style:{background:"#0d1117",border:"1px solid #30363d",borderRadius:"var(--radius-lg)",overflow:"hidden",fontFamily:"var(--font-mono)",fontSize:"0.82rem",margin:"1rem 0"},children:[e.jsxs("div",{style:{background:"#161b22",padding:"6px 12px",borderBottom:"1px solid #21262d",display:"flex",gap:"16px",color:"#8b949e"},children:[e.jsx("span",{style:{color:"#56d364"},children:"●"}),e.jsx("span",{style:{color:"#f78166"},children:"●"}),e.jsx("span",{style:{color:"#e3b341"},children:"●"}),e.jsx("span",{style:{marginLeft:"auto",color:"#58a6ff"},children:"ansible-navigator"})]}),e.jsxs("div",{style:{padding:"12px 16px"},children:[e.jsx("div",{style:{color:"#58a6ff",marginBottom:"8px"},children:"[0]  STDOUT                    ansible-navigator run site.yml"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"120px 1fr",gap:"4px"},children:[["Play name","Configure web servers"],["Host count","5"],["Tasks complete","12/18"],["Status","RUNNING"]].map(([i,o])=>e.jsxs(c.Fragment,{children:[e.jsx("span",{style:{color:"#8b949e"},children:i}),e.jsx("span",{style:{color:"#cdd9e5"},children:o})]},i))}),e.jsx("div",{style:{marginTop:"12px",borderTop:"1px solid #21262d",paddingTop:"12px"},children:[{host:"web01",task:"Install nginx",status:"ok",color:"#56d364"},{host:"web02",task:"Install nginx",status:"ok",color:"#56d364"},{host:"web03",task:"Deploy config",status:"changed",color:"#e3b341"},{host:"web04",task:"Deploy config",status:"running",color:"#58a6ff"},{host:"web05",task:"Waiting...",status:"queued",color:"#8b949e"}].map(i=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"80px 1fr 80px",gap:"8px",padding:"3px 0",alignItems:"center"},children:[e.jsx("span",{style:{color:"#79c0ff"},children:i.host}),e.jsx("span",{style:{color:"#cdd9e5"},children:i.task}),e.jsx("span",{style:{color:i.color,textAlign:"right"},children:i.status})]},i.host))}),e.jsx("div",{style:{marginTop:"12px",color:"#4d6073",fontSize:"0.73rem",borderTop:"1px solid #21262d",paddingTop:"8px"},children:"[↑↓] Navigate  [Enter] Inspect  [Esc] Back  [:] Command  [0-9] Jump  [q] Quit"})]})]})}function v(){const[i,o]=d.useState("intro"),l=[{key:"intro",label:"What is it?"},{key:"config",label:"Configuration"},{key:"commands",label:"Key Commands"},{key:"ee",label:"Execution Environments"},{key:"vscode",label:"VS Code"}];return e.jsxs("div",{className:"page-container fade-in",children:[e.jsx(m,{title:"ansible-navigator & VS Code",icon:"◉",description:"ansible-navigator is the modern replacement for ansible-playbook — it runs Ansible inside container-based Execution Environments and provides a rich terminal UI.",tags:["ansible-navigator","EE","Container","TUI","VS Code","Dev Containers"]}),e.jsx("div",{style:{display:"flex",gap:"6px",marginBottom:"1.5rem",flexWrap:"wrap"},children:l.map(n=>e.jsx("button",{onClick:()=>o(n.key),style:{padding:"7px 16px",borderRadius:"var(--radius-md)",border:`1px solid ${i===n.key?"var(--accent-primary)":"var(--border-subtle)"}`,background:i===n.key?"var(--accent-primary-subtle)":"var(--bg-card)",color:i===n.key?"var(--accent-primary)":"var(--text-muted)",fontSize:"0.8rem",fontWeight:600,cursor:"pointer",transition:"all 150ms"},children:n.label},n.key))}),i==="intro"&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"section-title",children:"What is ansible-navigator?"}),e.jsxs("p",{children:[e.jsx("code",{children:"ansible-navigator"})," is a TUI (terminal user interface) and CLI tool that wraps Ansible execution inside ",e.jsx("strong",{children:"container-based Execution Environments (EEs)"}),". It replaces direct use of ",e.jsx("code",{children:"ansible-playbook"})," in modern Ansible workflows, providing a consistent, reproducible environment regardless of the control node's software."]}),e.jsxs("div",{style:{background:"var(--bg-card)",border:"1px solid var(--border-subtle)",borderRadius:"var(--radius-lg)",padding:"1.5rem",margin:"1.5rem 0"},children:[e.jsx("h3",{style:{color:"var(--accent-sky)",marginBottom:"1rem",fontSize:"0.9rem"},children:"Architecture Overview"}),e.jsx("div",{style:{fontFamily:"var(--font-mono)",fontSize:"0.82rem",lineHeight:"2"},children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"8px"},children:[e.jsxs("div",{style:{background:"#1e2d47",border:"1px solid #818cf8",borderRadius:"8px",padding:"12px 20px",color:"#818cf8",textAlign:"center"},children:[e.jsx("div",{style:{fontWeight:700},children:"Control Node"}),e.jsx("div",{style:{fontSize:"0.7rem",color:"#4b5563",marginTop:"4px"},children:"ansible-navigator"}),e.jsx("div",{style:{fontSize:"0.7rem",color:"#4b5563"},children:"ansible.cfg"}),e.jsx("div",{style:{fontSize:"0.7rem",color:"#4b5563"},children:"playbooks/"})]}),e.jsx("div",{style:{color:"#4b5563"},children:"──"}),e.jsxs("div",{style:{background:"#0d2a1e",border:"1px solid #34d399",borderRadius:"8px",padding:"12px 20px",color:"#34d399",textAlign:"center"},children:[e.jsx("div",{style:{fontWeight:700},children:"Execution Environment"}),e.jsx("div",{style:{fontSize:"0.7rem",color:"#4b5563",marginTop:"4px"},children:"Container (Podman/Docker)"}),e.jsx("div",{style:{fontSize:"0.7rem",color:"#4b5563"},children:"ansible-core + collections"}),e.jsx("div",{style:{fontSize:"0.7rem",color:"#4b5563"},children:"Python + dependencies"})]}),e.jsx("div",{style:{color:"#4b5563",fontSize:"0.75rem"},children:"──SSH──"}),e.jsxs("div",{style:{background:"#1a1a2e",border:"1px solid #38bdf8",borderRadius:"8px",padding:"12px 20px",color:"#38bdf8",textAlign:"center"},children:[e.jsx("div",{style:{fontWeight:700},children:"Managed Nodes"}),e.jsx("div",{style:{fontSize:"0.7rem",color:"#4b5563",marginTop:"4px"},children:"web01, web02"}),e.jsx("div",{style:{fontSize:"0.7rem",color:"#4b5563"},children:"db01, db02"})]})]})})]}),e.jsx("h3",{style:{color:"var(--text-primary)",marginTop:"1.5rem"},children:"Installation"}),e.jsx(a,{language:"bash",title:"Installing ansible-navigator",code:`# Install on RHEL/CentOS (requires Python 3.9+)
pip3 install ansible-navigator

# Or via dnf if available
dnf install ansible-navigator

# Verify installation
ansible-navigator --version

# ansible-navigator requires a container runtime:
# Either Podman (preferred on RHEL) or Docker
dnf install podman          # RHEL/CentOS
# or
dnf install docker-ce       # if using Docker

# Verify container runtime
podman --version

# Pull the default Execution Environment image
# (this is done automatically on first run, but you can pre-pull)
podman pull registry.redhat.io/ansible-automation-platform/ee-supported-rhel8:latest
# or community EE:
podman pull ghcr.io/ansible/community-ansible-dev-tools:latest`}),e.jsx(b,{}),e.jsx("h3",{style:{color:"var(--text-primary)",marginTop:"1.5rem"},children:"TUI Navigation Keys"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",margin:"1rem 0"},children:[["↑ ↓","Navigate the list"],["Enter","Inspect selected item"],["Esc","Go back / exit sub-view"],[": (colon)","Enter command mode"],["0–9","Jump to numbered sub-menu"],["q","Quit (in interactive mode)"],["f","Filter output"],["/ (slash)","Search output"],["j / k","Scroll up/down (vim-style)"],["d","Toggle detail view"]].map(([n,t])=>e.jsxs("div",{style:{background:"var(--bg-card)",border:"1px solid var(--border-subtle)",borderRadius:"var(--radius-md)",padding:"10px 14px",display:"flex",gap:"12px",alignItems:"center"},children:[e.jsx("code",{style:{background:"#21262d",color:"#58a6ff",padding:"2px 8px",borderRadius:"4px",fontFamily:"var(--font-mono)",fontSize:"0.8rem",flexShrink:0},children:n}),e.jsx("span",{style:{color:"var(--text-secondary)",fontSize:"0.85rem"},children:t})]},n))})]}),i==="config"&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"section-title",children:"ansible-navigator.yml Configuration"}),e.jsxs("p",{children:[e.jsx("code",{children:"ansible-navigator.yml"})," (or ",e.jsx("code",{children:".ansible-navigator.yml"}),") configures how ansible-navigator runs. It's the equivalent of ",e.jsx("code",{children:"ansible.cfg"})," for the navigator tool itself. It's typically placed at the project root."]}),e.jsx(a,{language:"yaml",filename:"ansible-navigator.yml",code:`---
ansible-navigator:
  # ── ANSIBLE SETTINGS ─────────────────────────────────────────
  ansible:
    inventories:
      - ./inventory/hosts
    playbook-artifact:
      enable: true
      save-as: "{playbook_dir}/artifacts/{playbook_name}-artifact-{ts_utc}.json"

  # ── EXECUTION ENVIRONMENT ─────────────────────────────────────
  execution-environment:
    enabled: true                  # use an EE container (default: true)
    image: registry.redhat.io/ansible-automation-platform/ee-supported-rhel8:latest
    pull:
      policy: missing              # missing | always | never | tag
    container-engine: podman       # podman | docker
    environment-variables:
      pass:                        # pass these env vars from host into EE
        - HOME
        - ANSIBLE_VAULT_PASSWORD_FILE
      set:                         # set these env vars inside the EE
        ANSIBLE_FORCE_COLOR: "1"
    volume-mounts:                 # mount host paths into the EE
      - src: "{{ playbook_dir }}"
        dest: "{{ playbook_dir }}"
      - src: ~/.ssh
        dest: ~/.ssh

  # ── MODE ──────────────────────────────────────────────────────
  mode: interactive                # interactive (TUI) | stdout (plain output)
  # For CI/CD pipelines, use 'stdout' mode

  # ── LOGGING ───────────────────────────────────────────────────
  logging:
    level: warning                 # debug | info | warning | error | critical
    file: ./logs/navigator.log
    append: true

  # ── COLOR ─────────────────────────────────────────────────────
  color:
    enable: true
    osc4: false                    # use terminal's color scheme

  # ── EDITOR ────────────────────────────────────────────────────
  editor:
    command: vim {filename} +{line_number}   # editor for :e command in TUI

  # ── PLAYBOOK ARTIFACT ─────────────────────────────────────────
  playbook-artifact:
    enable: true
    replay: ./artifacts/          # directory for replaying artifacts`}),e.jsxs(s,{type:"tip",children:["Set ",e.jsx("code",{children:"mode: stdout"})," when running in CI/CD pipelines or when you need plain text output (no TUI). This makes it behave more like",e.jsx("code",{children:" ansible-playbook"}),"."]}),e.jsx(a,{language:"ini",filename:"ansible.cfg",code:`# ansible.cfg — works alongside ansible-navigator.yml
[defaults]
inventory         = ./inventory
remote_user       = ansible
host_key_checking = False
roles_path        = ./roles
collections_path  = ./collections

# Callback plugins for better output
stdout_callback = yaml         # options: default, yaml, json, minimal
callbacks_enabled = timer, profile_tasks

[privilege_escalation]
become        = True
become_method = sudo
become_user   = root
become_ask_pass = False

[ssh_connection]
ssh_args = -o ControlMaster=auto -o ControlPersist=60s
pipelining = True              # speeds up by reducing SSH connections`})]}),i==="commands"&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"section-title",children:"Key ansible-navigator Commands"}),e.jsx(a,{language:"bash",title:"Running playbooks",code:`# ── RUN (most common) ─────────────────────────────────────────
# Run a playbook (interactive TUI mode by default)
ansible-navigator run site.yml

# Run with an inventory
ansible-navigator run site.yml -i inventory/hosts

# Run with extra vars
ansible-navigator run site.yml -e "env=prod version=2.5.0"

# Run specific tags
ansible-navigator run site.yml --tags install

# Skip tags
ansible-navigator run site.yml --skip-tags test

# Limit to specific hosts
ansible-navigator run site.yml --limit webservers
ansible-navigator run site.yml --limit web01,web02

# Dry run (check mode — no changes made)
ansible-navigator run site.yml --check

# Dry run with diff output
ansible-navigator run site.yml --check --diff

# Run in stdout mode (plain output, like ansible-playbook)
ansible-navigator run site.yml --mode stdout

# Run with verbose output
ansible-navigator run site.yml -v           # verbose
ansible-navigator run site.yml -vvv         # very verbose (debug)

# Use a vault password file
ansible-navigator run site.yml --vault-password-file .vault_pass

# Ask for vault password interactively
ansible-navigator run site.yml --ask-vault-pass

# Specify a non-default EE image
ansible-navigator run site.yml --eei myregistry.io/my-ee:latest

# Disable EE (run with local Ansible install)
ansible-navigator run site.yml --ee false`}),e.jsx(a,{language:"bash",title:"Documentation and discovery",code:`# ── DOC — show module documentation ──────────────────────────
# Interactive module browser
ansible-navigator doc

# Get docs for a specific module (stdout)
ansible-navigator doc ansible.builtin.copy
ansible-navigator doc ansible.posix.firewalld
ansible-navigator doc community.general.lvol

# List all available modules
ansible-navigator doc -l
ansible-navigator doc -l --mode stdout | grep -i firewall

# Search module docs
ansible-navigator doc -l --mode stdout | grep lvol

# ── IMAGES — manage EE images ────────────────────────────────
ansible-navigator images
ansible-navigator images --mode stdout

# ── INVENTORY ─────────────────────────────────────────────────
# View and explore the inventory
ansible-navigator inventory -i ./inventory/hosts
ansible-navigator inventory -i ./inventory/hosts --mode stdout

# ── COLLECTIONS ───────────────────────────────────────────────
# Browse available collections in the EE
ansible-navigator collections

# ── CONFIG ────────────────────────────────────────────────────
# View effective Ansible configuration
ansible-navigator config
ansible-navigator config --mode stdout

# ── EXEC ──────────────────────────────────────────────────────
# Execute a command INSIDE the EE container
ansible-navigator exec -- ansible --version
ansible-navigator exec -- ansible-galaxy collection list
ansible-navigator exec -- python3 --version

# ── REPLAY ────────────────────────────────────────────────────
# Replay a saved playbook artifact
ansible-navigator replay artifacts/site.yml-artifact-2024-01-15.json`}),e.jsx("h3",{style:{color:"var(--text-primary)",marginTop:"1.5rem"},children:"Comparison: navigator vs playbook"}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontFamily:"var(--font-mono)",fontSize:"0.82rem",margin:"1rem 0"},children:[e.jsx("thead",{children:e.jsx("tr",{children:["ansible-playbook (old)","ansible-navigator (new)"].map(n=>e.jsx("th",{style:{background:"var(--bg-elevated)",color:"var(--accent-primary)",padding:"10px 16px",textAlign:"left",border:"1px solid var(--border-subtle)"},children:n},n))})}),e.jsx("tbody",{children:[["ansible-playbook site.yml","ansible-navigator run site.yml"],["ansible-playbook site.yml -e k=v","ansible-navigator run site.yml -e k=v"],["ansible-playbook site.yml --check","ansible-navigator run site.yml --check"],["ansible-doc copy","ansible-navigator doc copy"],["ansible-inventory --list","ansible-navigator inventory"],["ansible-config dump","ansible-navigator config"],["ansible all -m ping","ansible-navigator exec -- ansible all -m ping"],["(no equivalent)","ansible-navigator images"],["(no equivalent)","ansible-navigator replay artifact.json"]].map(([n,t],r)=>e.jsxs("tr",{style:{background:r%2===0?"var(--bg-card)":"transparent"},children:[e.jsx("td",{style:{padding:"8px 16px",border:"1px solid var(--border-subtle)",color:"#8b949e"},children:n}),e.jsx("td",{style:{padding:"8px 16px",border:"1px solid var(--border-subtle)",color:"#34d399"},children:t})]},r))})]})})]}),i==="ee"&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"section-title",children:"Execution Environments (EE)"}),e.jsxs("p",{children:["An ",e.jsx("strong",{children:"Execution Environment"})," is a container image that bundles",e.jsx("code",{children:" ansible-core"}),", Python, required collections, and system libraries. This ensures the same Ansible version and dependencies run on every machine — your laptop, a CI server, or Ansible Automation Platform."]}),e.jsx(s,{type:"key",children:'Think of EEs as "Docker containers for Ansible". Instead of manually installing Ansible, collections, and Python libraries on every control node, you build one EE image and run it everywhere.'}),e.jsx(a,{language:"bash",title:"Working with Execution Environments",code:`# ── PULL/USE AN EE ───────────────────────────────────────────
# Official Red Hat EEs (requires registry.redhat.io credentials)
podman pull registry.redhat.io/ansible-automation-platform/ee-minimal-rhel8:latest
podman pull registry.redhat.io/ansible-automation-platform/ee-supported-rhel8:latest

# Community EE (no credentials needed)
podman pull ghcr.io/ansible/community-ansible-dev-tools:latest
podman pull quay.io/ansible/community-ee-base:latest

# Specify which EE to use
ansible-navigator run site.yml --eei quay.io/ansible/community-ee-base:latest

# ── INSPECT AN EE ─────────────────────────────────────────────
# See what's inside an EE
ansible-navigator images

# View details of a specific EE
ansible-navigator images <image-name>

# Check Ansible version inside the EE
ansible-navigator exec -- ansible --version

# List collections available in the EE
ansible-navigator exec -- ansible-galaxy collection list

# ── BUILD A CUSTOM EE ─────────────────────────────────────────
# Install ansible-builder (for building custom EEs)
pip3 install ansible-builder

# Create an execution-environment.yml
# (defines what goes INTO the EE)

# Build the custom EE
ansible-builder build --tag myorg/my-ee:1.0 -v 3

# Push to a registry
podman push myorg/my-ee:1.0 registry.example.com/myorg/my-ee:1.0`}),e.jsx(a,{language:"yaml",filename:"execution-environment.yml",code:`---
# execution-environment.yml — defines what goes into your custom EE
# Used by ansible-builder to create the container image

version: 3

build_arg_defaults:
  ANSIBLE_GALAXY_CLI_COLLECTION_OPTS: '--timeout 120'

dependencies:
  galaxy: requirements.yml        # Ansible collections
  python: requirements.txt        # Python packages
  system: bindep.txt              # System packages (RPM/APT)

images:
  base_image:
    name: registry.redhat.io/ansible-automation-platform/ee-minimal-rhel8:latest

additional_build_steps:
  prepend_galaxy:
    - RUN pip3 install --upgrade pip

  append_final:
    - RUN ansible-galaxy collection install community.general
    - RUN echo "Custom EE build complete"`})]}),i==="vscode"&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"section-title",children:"VS Code Integration"}),e.jsxs("p",{children:["The ",e.jsx("strong",{children:"Ansible extension for VS Code"})," provides syntax highlighting, auto-completion, linting, and the ability to run playbooks directly from the editor using ansible-navigator and Dev Containers."]}),e.jsx("h3",{style:{color:"var(--text-primary)",marginTop:"1.5rem"},children:"Essential VS Code Tasks"}),e.jsx(a,{language:"bash",title:"Working with Git repos in VS Code",code:`# ── CLONE A REPOSITORY ───────────────────────────────────────
# VS Code: Ctrl+Shift+P → "Git: Clone"
# Or from terminal in VS Code (Ctrl+\`):
git clone https://github.com/org/ansible-playbooks.git
cd ansible-playbooks

# ── CREATE A BRANCH ───────────────────────────────────────────
git checkout -b feature/add-webserver-role

# ── STAGE AND COMMIT ──────────────────────────────────────────
git add .
git commit -m "Add webserver role with nginx support"

# ── PUSH TO REMOTE ────────────────────────────────────────────
git push origin feature/add-webserver-role

# ── CREATE A PULL REQUEST ─────────────────────────────────────
# Use GitHub CLI or VS Code GitHub Pull Requests extension`}),e.jsx(a,{language:"json",filename:".vscode/settings.json",code:`{
  "ansible.python.interpreterPath": "/usr/bin/python3",
  "ansible.validation.enabled": true,
  "ansible.validation.lint.enabled": true,
  "ansible.ansible.useFullyQualifiedCollectionNames": true,
  "ansible.executionEnvironment.enabled": true,
  "ansible.executionEnvironment.image": "ghcr.io/ansible/community-ansible-dev-tools:latest",
  "ansible.executionEnvironment.containerEngine": "podman",
  "ansible.lightspeed.enabled": false,
  "[yaml]": {
    "editor.insertSpaces": true,
    "editor.tabSize": 2,
    "editor.formatOnSave": true
  },
  "files.associations": {
    "*.yml": "yaml",
    "*.yaml": "yaml",
    "*.j2": "jinja"
  }
}`}),e.jsx(a,{language:"json",filename:".devcontainer/devcontainer.json",code:`{
  "name": "Ansible Development",
  "image": "ghcr.io/ansible/community-ansible-dev-tools:latest",
  "customizations": {
    "vscode": {
      "extensions": [
        "redhat.ansible",
        "redhat.vscode-yaml",
        "eamodio.gitlens",
        "GitHub.copilot"
      ],
      "settings": {
        "ansible.validation.enabled": true,
        "ansible.executionEnvironment.enabled": false
      }
    }
  },
  "mounts": [
    "source=\${localEnv:HOME}/.ssh,target=/root/.ssh,type=bind,consistency=cached",
    "source=\${localEnv:HOME}/.ansible,target=/root/.ansible,type=bind,consistency=cached"
  ],
  "postCreateCommand": "ansible-galaxy install -r requirements.yml",
  "remoteUser": "root"
}`}),e.jsxs(s,{type:"exam",children:["On the RHCE exam, you'll be expected to:",e.jsxs("ol",{style:{margin:"0.5rem 0 0",paddingLeft:"1.2rem"},children:[e.jsx("li",{children:"Clone a Git repository using VS Code or the terminal"}),e.jsx("li",{children:"Create playbook files inside VS Code"}),e.jsxs("li",{children:["Configure ",e.jsx("code",{children:"ansible-navigator.yml"})," to point to an EE image"]}),e.jsxs("li",{children:["Run playbooks with ",e.jsx("code",{children:"ansible-navigator run"})," from VS Code's terminal"]}),e.jsx("li",{children:"Push changes back to the Git remote"})]}),"The exam environment will have VS Code pre-installed with the Ansible extension."]}),e.jsx("h3",{style:{color:"var(--text-primary)",marginTop:"1.5rem"},children:"Keyboard Shortcuts"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"},children:[["Ctrl + `","Open integrated terminal"],["Ctrl + Shift + P","Command palette"],["Ctrl + P","Quick open file"],["Ctrl + Shift + E","Explorer sidebar"],["Ctrl + Shift + G","Git sidebar"],["F5","Run/Debug (Ansible task runner)"],["Ctrl + S","Save file"],["Alt + Shift + F","Format document (YAML)"],["Ctrl + Z","Undo"],["Ctrl + Shift + Z","Redo"]].map(([n,t])=>e.jsxs("div",{style:{background:"var(--bg-card)",border:"1px solid var(--border-subtle)",borderRadius:"var(--radius-md)",padding:"8px 12px",display:"flex",gap:"10px",alignItems:"center"},children:[e.jsx("code",{style:{background:"#21262d",color:"#fbbf24",padding:"2px 8px",borderRadius:"4px",fontSize:"0.75rem",flexShrink:0},children:n}),e.jsx("span",{style:{color:"var(--text-secondary)",fontSize:"0.82rem"},children:t})]},n))})]})]})}export{v as default};
