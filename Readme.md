# EX294 Visual Guide — RHCE Exam Prep

An interactive, comprehensive study guide for the **Red Hat Certified Engineer (RHCE) EX294** exam, built with React and deployed to GitHub Pages.

**Live site:** [https://prashanthgl.github.io/ex294-visual-guide/](https://prashanthgl.github.io/ex294-visual-guide/)

---

## What's Inside

The guide covers every objective listed in the official Red Hat EX294 exam guide, with practical examples, visual diagrams, and deep Linux internals explanations.

| Page | Topics Covered |
|------|---------------|
| **Linux Internals** | Kernel architecture, process lifecycle, filesystem hierarchy, LVM, SELinux, systemd, networking |
| **Ansible Setup** | Control node architecture, ansible.cfg, ansible-navigator.yml, SSH keys, privilege escalation |
| **Inventory** | INI & YAML formats, groups, subgroups, host_vars, group_vars, behavioral parameters |
| **Core Concepts** | All 22 variable precedence levels, modules reference, facts, loops (5 types), conditionals |
| **Plays & Playbooks** | Play anatomy, handlers, tags, import vs include, block/rescue/always, serial, delegation |
| **Roles & Collections** | Role directory structure, ansible-galaxy, FQCN, Content Collections, requirements.yml |
| **ansible-navigator** | Execution Environments, TUI navigation, key commands, VS Code integration |
| **Automation Tasks** | Complete playbooks for packages, services, firewall, LVM, files, archiving, cron, SELinux, users |
| **Vault & Templates** | Ansible Vault commands, vault in playbooks, Jinja2 syntax, filters, control structures |
| **Shell Scripts** | Bash variables, conditionals, loops, functions, script analysis, Ansible + shell integration |

---

## Tech Stack

- **React 18** — UI framework
- **Vite 5** — build tool
- **React Router v6** (HashRouter) — client-side routing, GitHub Pages compatible
- **react-syntax-highlighter** — syntax-highlighted code blocks with copy button
- **gh-pages** — deployment to GitHub Pages

---

## Local Development

**Prerequisites:** Node.js 18+

```bash
# Clone the repository
git clone https://github.com/prashanthgl/ex294-visual-guide.git
cd ex294-visual-guide

# Install dependencies
npm install

# Start the development server
npm run dev
```

The dev server runs at `http://localhost:5173/ex294-visual-guide/`.

---

## Deployment

```bash
npm run deploy
```

This runs `npm run build` then pushes the `dist/` folder to the `gh-pages` branch. GitHub Pages serves that branch at the live URL above.

**First-time setup:** In the repository **Settings → Pages**, set the source to **"Deploy from a branch"** → branch `gh-pages` → `/ (root)`.

---

## Project Structure

```
ex294-visual-guide/
├── src/
│   ├── App.jsx                  # HashRouter + lazy-loaded routes
│   ├── main.jsx                 # React entry point
│   ├── styles/
│   │   └── globals.css          # Design system (CSS custom properties)
│   ├── components/
│   │   ├── Layout.jsx           # Sidebar navigation + main content
│   │   ├── CodeBlock.jsx        # Syntax-highlighted code with copy button
│   │   ├── InfoBox.jsx          # Tip / Warning / Exam / Key callout boxes
│   │   └── PageHeader.jsx       # Page title, description, topic tags
│   └── pages/
│       ├── Home.jsx
│       ├── LinuxInternals.jsx
│       ├── AnsibleSetup.jsx
│       ├── Inventory.jsx
│       ├── CoreConcepts.jsx
│       ├── Playbooks.jsx
│       ├── RolesCollections.jsx
│       ├── Navigator.jsx
│       ├── AutomationTasks.jsx
│       ├── VaultTemplates.jsx
│       └── ShellScripts.jsx
├── .github/workflows/deploy.yml # GitHub Actions (alternative CI/CD deploy)
├── vite.config.js               # base: '/ex294-visual-guide/'
└── package.json
```

---

## License

MIT
