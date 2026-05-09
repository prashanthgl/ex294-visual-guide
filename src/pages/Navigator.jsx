import React, { useState } from 'react'
import PageHeader from '../components/PageHeader'
import CodeBlock from '../components/CodeBlock'
import InfoBox from '../components/InfoBox'

function TuiMockup() {
  return (
    <div style={{
      background: '#0d1117', border: '1px solid #30363d',
      borderRadius: 'var(--radius-lg)', overflow: 'hidden',
      fontFamily: 'var(--font-mono)', fontSize: '0.82rem',
      margin: '1rem 0',
    }}>
      <div style={{
        background: '#161b22', padding: '6px 12px',
        borderBottom: '1px solid #21262d',
        display: 'flex', gap: '16px', color: '#8b949e',
      }}>
        <span style={{ color: '#56d364' }}>●</span>
        <span style={{ color: '#f78166' }}>●</span>
        <span style={{ color: '#e3b341' }}>●</span>
        <span style={{ marginLeft: 'auto', color: '#58a6ff' }}>ansible-navigator</span>
      </div>
      <div style={{ padding: '12px 16px' }}>
        <div style={{ color: '#58a6ff', marginBottom: '8px' }}>
          [0]  STDOUT                    ansible-navigator run site.yml
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '4px' }}>
          {[
            ['Play name', 'Configure web servers'],
            ['Host count', '5'],
            ['Tasks complete', '12/18'],
            ['Status', 'RUNNING'],
          ].map(([k, v]) => (
            <React.Fragment key={k}>
              <span style={{ color: '#8b949e' }}>{k}</span>
              <span style={{ color: '#cdd9e5' }}>{v}</span>
            </React.Fragment>
          ))}
        </div>
        <div style={{ marginTop: '12px', borderTop: '1px solid #21262d', paddingTop: '12px' }}>
          {[
            { host: 'web01', task: 'Install nginx', status: 'ok', color: '#56d364' },
            { host: 'web02', task: 'Install nginx', status: 'ok', color: '#56d364' },
            { host: 'web03', task: 'Deploy config', status: 'changed', color: '#e3b341' },
            { host: 'web04', task: 'Deploy config', status: 'running', color: '#58a6ff' },
            { host: 'web05', task: 'Waiting...', status: 'queued', color: '#8b949e' },
          ].map(row => (
            <div key={row.host} style={{
              display: 'grid', gridTemplateColumns: '80px 1fr 80px',
              gap: '8px', padding: '3px 0', alignItems: 'center',
            }}>
              <span style={{ color: '#79c0ff' }}>{row.host}</span>
              <span style={{ color: '#cdd9e5' }}>{row.task}</span>
              <span style={{ color: row.color, textAlign: 'right' }}>{row.status}</span>
            </div>
          ))}
        </div>
        <div style={{
          marginTop: '12px', color: '#4d6073', fontSize: '0.73rem',
          borderTop: '1px solid #21262d', paddingTop: '8px',
        }}>
          [↑↓] Navigate  [Enter] Inspect  [Esc] Back  [:] Command  [0-9] Jump  [q] Quit
        </div>
      </div>
    </div>
  )
}

export default function Navigator() {
  const [activeTab, setActiveTab] = useState('intro')

  const tabs = [
    { key: 'intro', label: 'What is it?' },
    { key: 'config', label: 'Configuration' },
    { key: 'commands', label: 'Key Commands' },
    { key: 'ee', label: 'Execution Environments' },
    { key: 'vscode', label: 'VS Code' },
  ]

  return (
    <div className="page-container fade-in">
      <PageHeader
        title="ansible-navigator &amp; VS Code"
        icon="◉"
        description="ansible-navigator is the modern replacement for ansible-playbook — it runs Ansible inside container-based Execution Environments and provides a rich terminal UI."
        tags={['ansible-navigator', 'EE', 'Container', 'TUI', 'VS Code', 'Dev Containers']}
      />

      <div style={{ display: 'flex', gap: '6px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)} style={{
            padding: '7px 16px', borderRadius: 'var(--radius-md)',
            border: `1px solid ${activeTab === t.key ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
            background: activeTab === t.key ? 'var(--accent-primary-subtle)' : 'var(--bg-card)',
            color: activeTab === t.key ? 'var(--accent-primary)' : 'var(--text-muted)',
            fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', transition: 'all 150ms',
          }}>{t.label}</button>
        ))}
      </div>

      {/* ── INTRO ─────────────────────────────────────────────── */}
      {activeTab === 'intro' && (
        <>
          <h2 className="section-title">What is ansible-navigator?</h2>
          <p>
            <code>ansible-navigator</code> is a TUI (terminal user interface) and CLI tool
            that wraps Ansible execution inside <strong>container-based Execution Environments (EEs)</strong>.
            It replaces direct use of <code>ansible-playbook</code> in modern Ansible workflows,
            providing a consistent, reproducible environment regardless of the control node's software.
          </p>

          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)', padding: '1.5rem', margin: '1.5rem 0',
          }}>
            <h3 style={{ color: 'var(--accent-sky)', marginBottom: '1rem', fontSize: '0.9rem' }}>
              Architecture Overview
            </h3>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', lineHeight: '2' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{
                  background: '#1e2d47', border: '1px solid #818cf8', borderRadius: '8px',
                  padding: '12px 20px', color: '#818cf8', textAlign: 'center',
                }}>
                  <div style={{ fontWeight: 700 }}>Control Node</div>
                  <div style={{ fontSize: '0.7rem', color: '#4b5563', marginTop: '4px' }}>ansible-navigator</div>
                  <div style={{ fontSize: '0.7rem', color: '#4b5563' }}>ansible.cfg</div>
                  <div style={{ fontSize: '0.7rem', color: '#4b5563' }}>playbooks/</div>
                </div>
                <div style={{ color: '#4b5563' }}>──</div>
                <div style={{
                  background: '#0d2a1e', border: '1px solid #34d399', borderRadius: '8px',
                  padding: '12px 20px', color: '#34d399', textAlign: 'center',
                }}>
                  <div style={{ fontWeight: 700 }}>Execution Environment</div>
                  <div style={{ fontSize: '0.7rem', color: '#4b5563', marginTop: '4px' }}>Container (Podman/Docker)</div>
                  <div style={{ fontSize: '0.7rem', color: '#4b5563' }}>ansible-core + collections</div>
                  <div style={{ fontSize: '0.7rem', color: '#4b5563' }}>Python + dependencies</div>
                </div>
                <div style={{ color: '#4b5563', fontSize: '0.75rem' }}>──SSH──</div>
                <div style={{
                  background: '#1a1a2e', border: '1px solid #38bdf8', borderRadius: '8px',
                  padding: '12px 20px', color: '#38bdf8', textAlign: 'center',
                }}>
                  <div style={{ fontWeight: 700 }}>Managed Nodes</div>
                  <div style={{ fontSize: '0.7rem', color: '#4b5563', marginTop: '4px' }}>web01, web02</div>
                  <div style={{ fontSize: '0.7rem', color: '#4b5563' }}>db01, db02</div>
                </div>
              </div>
            </div>
          </div>

          <h3 style={{ color: 'var(--text-primary)', marginTop: '1.5rem' }}>Installation</h3>

          <CodeBlock
            language="bash"
            title="Installing ansible-navigator"
            code={`# Install on RHEL/CentOS (requires Python 3.9+)
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
podman pull ghcr.io/ansible/community-ansible-dev-tools:latest`}
          />

          <TuiMockup />

          <h3 style={{ color: 'var(--text-primary)', marginTop: '1.5rem' }}>TUI Navigation Keys</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', margin: '1rem 0' }}>
            {[
              ['↑ ↓', 'Navigate the list'],
              ['Enter', 'Inspect selected item'],
              ['Esc', 'Go back / exit sub-view'],
              [': (colon)', 'Enter command mode'],
              ['0–9', 'Jump to numbered sub-menu'],
              ['q', 'Quit (in interactive mode)'],
              ['f', 'Filter output'],
              ['/ (slash)', 'Search output'],
              ['j / k', 'Scroll up/down (vim-style)'],
              ['d', 'Toggle detail view'],
            ].map(([key, desc]) => (
              <div key={key} style={{
                background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)', padding: '10px 14px',
                display: 'flex', gap: '12px', alignItems: 'center',
              }}>
                <code style={{
                  background: '#21262d', color: '#58a6ff', padding: '2px 8px',
                  borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
                  flexShrink: 0,
                }}>{key}</code>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{desc}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── CONFIGURATION ─────────────────────────────────────── */}
      {activeTab === 'config' && (
        <>
          <h2 className="section-title">ansible-navigator.yml Configuration</h2>
          <p>
            <code>ansible-navigator.yml</code> (or <code>.ansible-navigator.yml</code>) configures
            how ansible-navigator runs. It's the equivalent of <code>ansible.cfg</code> for
            the navigator tool itself. It's typically placed at the project root.
          </p>

          <CodeBlock
            language="yaml"
            filename="ansible-navigator.yml"
            code={`---
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
    replay: ./artifacts/          # directory for replaying artifacts`}
          />

          <InfoBox type="tip">
            Set <code>mode: stdout</code> when running in CI/CD pipelines or when you need
            plain text output (no TUI). This makes it behave more like
            <code> ansible-playbook</code>.
          </InfoBox>

          <CodeBlock
            language="ini"
            filename="ansible.cfg"
            code={`# ansible.cfg — works alongside ansible-navigator.yml
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
pipelining = True              # speeds up by reducing SSH connections`}
          />
        </>
      )}

      {/* ── KEY COMMANDS ──────────────────────────────────────── */}
      {activeTab === 'commands' && (
        <>
          <h2 className="section-title">Key ansible-navigator Commands</h2>

          <CodeBlock
            language="bash"
            title="Running playbooks"
            code={`# ── RUN (most common) ─────────────────────────────────────────
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
ansible-navigator run site.yml --ee false`}
          />

          <CodeBlock
            language="bash"
            title="Documentation and discovery"
            code={`# ── DOC — show module documentation ──────────────────────────
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
ansible-navigator replay artifacts/site.yml-artifact-2024-01-15.json`}
          />

          <h3 style={{ color: 'var(--text-primary)', marginTop: '1.5rem' }}>Comparison: navigator vs playbook</h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%', borderCollapse: 'collapse',
              fontFamily: 'var(--font-mono)', fontSize: '0.82rem',
              margin: '1rem 0',
            }}>
              <thead>
                <tr>
                  {['ansible-playbook (old)', 'ansible-navigator (new)'].map(h => (
                    <th key={h} style={{
                      background: 'var(--bg-elevated)', color: 'var(--accent-primary)',
                      padding: '10px 16px', textAlign: 'left', border: '1px solid var(--border-subtle)',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['ansible-playbook site.yml', 'ansible-navigator run site.yml'],
                  ['ansible-playbook site.yml -e k=v', 'ansible-navigator run site.yml -e k=v'],
                  ['ansible-playbook site.yml --check', 'ansible-navigator run site.yml --check'],
                  ['ansible-doc copy', 'ansible-navigator doc copy'],
                  ['ansible-inventory --list', 'ansible-navigator inventory'],
                  ['ansible-config dump', 'ansible-navigator config'],
                  ['ansible all -m ping', 'ansible-navigator exec -- ansible all -m ping'],
                  ['(no equivalent)', 'ansible-navigator images'],
                  ['(no equivalent)', 'ansible-navigator replay artifact.json'],
                ].map(([old, newCmd], i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? 'var(--bg-card)' : 'transparent' }}>
                    <td style={{ padding: '8px 16px', border: '1px solid var(--border-subtle)', color: '#8b949e' }}>{old}</td>
                    <td style={{ padding: '8px 16px', border: '1px solid var(--border-subtle)', color: '#34d399' }}>{newCmd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ── EXECUTION ENVIRONMENTS ────────────────────────────── */}
      {activeTab === 'ee' && (
        <>
          <h2 className="section-title">Execution Environments (EE)</h2>
          <p>
            An <strong>Execution Environment</strong> is a container image that bundles
            <code> ansible-core</code>, Python, required collections, and system libraries.
            This ensures the same Ansible version and dependencies run on every machine —
            your laptop, a CI server, or Ansible Automation Platform.
          </p>

          <InfoBox type="key">
            Think of EEs as "Docker containers for Ansible". Instead of manually installing
            Ansible, collections, and Python libraries on every control node, you build
            one EE image and run it everywhere.
          </InfoBox>

          <CodeBlock
            language="bash"
            title="Working with Execution Environments"
            code={`# ── PULL/USE AN EE ───────────────────────────────────────────
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
podman push myorg/my-ee:1.0 registry.example.com/myorg/my-ee:1.0`}
          />

          <CodeBlock
            language="yaml"
            filename="execution-environment.yml"
            code={`---
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
    - RUN echo "Custom EE build complete"`}
          />
        </>
      )}

      {/* ── VS CODE ───────────────────────────────────────────── */}
      {activeTab === 'vscode' && (
        <>
          <h2 className="section-title">VS Code Integration</h2>
          <p>
            The <strong>Ansible extension for VS Code</strong> provides syntax highlighting,
            auto-completion, linting, and the ability to run playbooks directly from the editor
            using ansible-navigator and Dev Containers.
          </p>

          <h3 style={{ color: 'var(--text-primary)', marginTop: '1.5rem' }}>Essential VS Code Tasks</h3>

          <CodeBlock
            language="bash"
            title="Working with Git repos in VS Code"
            code={`# ── CLONE A REPOSITORY ───────────────────────────────────────
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
# Use GitHub CLI or VS Code GitHub Pull Requests extension`}
          />

          <CodeBlock
            language="json"
            filename=".vscode/settings.json"
            code={`{
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
}`}
          />

          <CodeBlock
            language="json"
            filename=".devcontainer/devcontainer.json"
            code={`{
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
}`}
          />

          <InfoBox type="exam">
            On the RHCE exam, you'll be expected to:
            <ol style={{ margin: '0.5rem 0 0', paddingLeft: '1.2rem' }}>
              <li>Clone a Git repository using VS Code or the terminal</li>
              <li>Create playbook files inside VS Code</li>
              <li>Configure <code>ansible-navigator.yml</code> to point to an EE image</li>
              <li>Run playbooks with <code>ansible-navigator run</code> from VS Code's terminal</li>
              <li>Push changes back to the Git remote</li>
            </ol>
            The exam environment will have VS Code pre-installed with the Ansible extension.
          </InfoBox>

          <h3 style={{ color: 'var(--text-primary)', marginTop: '1.5rem' }}>Keyboard Shortcuts</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {[
              ['Ctrl + `', 'Open integrated terminal'],
              ['Ctrl + Shift + P', 'Command palette'],
              ['Ctrl + P', 'Quick open file'],
              ['Ctrl + Shift + E', 'Explorer sidebar'],
              ['Ctrl + Shift + G', 'Git sidebar'],
              ['F5', 'Run/Debug (Ansible task runner)'],
              ['Ctrl + S', 'Save file'],
              ['Alt + Shift + F', 'Format document (YAML)'],
              ['Ctrl + Z', 'Undo'],
              ['Ctrl + Shift + Z', 'Redo'],
            ].map(([key, desc]) => (
              <div key={key} style={{
                background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)', padding: '8px 12px',
                display: 'flex', gap: '10px', alignItems: 'center',
              }}>
                <code style={{
                  background: '#21262d', color: '#fbbf24', padding: '2px 8px',
                  borderRadius: '4px', fontSize: '0.75rem', flexShrink: 0,
                }}>{key}</code>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>{desc}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
