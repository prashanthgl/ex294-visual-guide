import{j as e,L as r}from"./index-V6pXZagA.js";import{I as i}from"./InfoBox-D5QG7ZYC.js";const s=[{label:"Duration",value:"4 Hours",sub:"240 minutes total",color:"var(--accent-primary)"},{label:"Format",value:"Performance",sub:"Hands-on lab tasks",color:"var(--accent-sky)"},{label:"Pass Score",value:"210 / 300",sub:"70% required",color:"var(--success)"},{label:"Prerequisite",value:"RHCSA",sub:"EX200 recommended",color:"var(--warning)"}],n=[{path:"/linux-internals",icon:"🐧",title:"Linux Internals",desc:"Deep dive into the kernel, filesystem hierarchy, SELinux, systemd, process management, and storage.",tags:["Kernel","SELinux","Systemd","LVM"],color:"var(--accent-sky)"},{path:"/ansible-setup",icon:"⚙",title:"Ansible Setup",desc:"Install Ansible, configure ansible.cfg and ansible-navigator.yml, set up SSH keys and privilege escalation.",tags:["ansible.cfg","SSH","sudo"],color:"var(--accent-primary)"},{path:"/inventory",icon:"☰",title:"Inventory Management",desc:"Create INI and YAML inventories, define groups, host variables, group variables, and behavioral parameters.",tags:["INI","YAML","host_vars","group_vars"],color:"var(--success)"},{path:"/core-concepts",icon:"◈",title:"Core Concepts",desc:"Master modules, variables (22 precedence levels), facts, loops, and conditionals.",tags:["Modules","Variables","Facts","Loops"],color:"var(--warning)"},{path:"/playbooks",icon:"▶",title:"Plays & Playbooks",desc:"Play structure, handlers, tags, blocks, error handling, delegation, and execution control.",tags:["Handlers","Tags","Blocks","Rescue"],color:"var(--accent-primary)"},{path:"/roles-collections",icon:"⬡",title:"Roles & Collections",desc:"Create roles with ansible-galaxy, manage dependencies, install Content Collections, use FQCN.",tags:["Galaxy","FQCN","requirements.yml"],color:"var(--purple)"},{path:"/navigator",icon:"◉",title:"ansible-navigator",desc:"Execution environments, TUI navigation, running playbooks, finding docs, VS Code integration.",tags:["EE","TUI","VS Code","Containers"],color:"var(--accent-sky)"},{path:"/automation-tasks",icon:"⚡",title:"Automation Tasks",desc:"Automate RHCSA tasks: packages, services, firewall, storage, files, users, SELinux, scheduling.",tags:["dnf","firewalld","LVM","users"],color:"var(--success)"},{path:"/vault-templates",icon:"🔒",title:"Vault & Templates",desc:"Protect sensitive data with Ansible Vault. Generate config files with Jinja2 templates and filters.",tags:["Vault","Jinja2","encrypt_string"],color:"var(--danger)"},{path:"/shell-scripts",icon:"$_",title:"Shell Scripts",desc:"Analyze and write Bash scripts: variables, conditionals, loops, functions, and exit codes.",tags:["Bash","if/else","loops","functions"],color:"var(--warning)"}],o=[{label:"ansible.cfg reference",path:"/ansible-setup"},{label:"Variable precedence pyramid",path:"/core-concepts"},{label:"Full LVM playbook",path:"/automation-tasks"},{label:"Vault encrypt_string",path:"/vault-templates"},{label:"Role directory structure",path:"/roles-collections"},{label:"Jinja2 filters",path:"/vault-templates"},{label:"SELinux commands",path:"/linux-internals"},{label:"Execution environments",path:"/navigator"}];function d(){return e.jsxs("div",{className:"page-container fade-in",children:[e.jsxs("div",{className:"hero-section",children:[e.jsxs("div",{className:"hero-badge",children:[e.jsx("span",{className:"hero-badge-dot"}),e.jsx("span",{children:"EX294 — Red Hat Certified Engineer"})]}),e.jsxs("h1",{className:"hero-title",children:["Master the"," ",e.jsx("span",{className:"hero-title-accent",children:"RHCE Exam"})]}),e.jsxs("p",{className:"hero-desc",children:["A comprehensive, interactive guide covering every exam objective — from Linux kernel internals and Ansible automation to Vault encryption and Jinja2 templating. Built for engineers who want to understand the ",e.jsx("em",{children:"why"}),", not just the ",e.jsx("em",{children:"how"}),"."]}),e.jsxs("div",{className:"hero-actions",children:[e.jsx(r,{to:"/linux-internals",className:"btn-primary",children:"Start with Linux Internals →"}),e.jsx(r,{to:"/ansible-setup",className:"btn-secondary",children:"Jump to Ansible Setup"})]})]}),e.jsx("div",{className:"stats-grid",children:s.map(a=>e.jsxs("div",{className:"stat-card",style:{"--accent":a.color},children:[e.jsx("div",{className:"stat-value",style:{color:a.color},children:a.value}),e.jsx("div",{className:"stat-label",children:a.label}),e.jsx("div",{className:"stat-sub",children:a.sub})]},a.label))}),e.jsxs(i,{type:"exam",title:"About the EX294 Exam",children:[e.jsxs("p",{children:["The EX294 is a ",e.jsx("strong",{children:"performance-based exam"})," — you will be given a live RHEL environment and asked to complete tasks using Ansible. There is no multiple choice. You must write playbooks, configure inventory files, manage roles, and automate Linux tasks."]}),e.jsxs("p",{style:{marginTop:"8px"},children:[e.jsx("strong",{children:"Key rule:"})," All configurations must ",e.jsx("em",{children:"persist after reboot"})," without intervention. This means using ",e.jsx("code",{children:"enabled: true"})," for services, ",e.jsx("code",{children:"permanent: true"})," for firewall rules, and ensuring fstab entries are correct."]})]}),e.jsx("h2",{className:"section-title mt-10",children:"Exam Topics"}),e.jsx("div",{className:"topic-grid",children:n.map(a=>e.jsxs(r,{to:a.path,className:"topic-card",style:{"--card-accent":a.color},children:[e.jsx("div",{className:"topic-card-icon",children:a.icon}),e.jsx("h3",{className:"topic-card-title",children:a.title}),e.jsx("p",{className:"topic-card-desc",children:a.desc}),e.jsx("div",{className:"topic-card-tags",children:a.tags.map(t=>e.jsx("span",{className:"topic-tag",children:t},t))})]},a.path))}),e.jsx("h2",{className:"section-title mt-12",children:"Quick Reference Links"}),e.jsx("div",{className:"quick-links-grid",children:o.map(a=>e.jsxs(r,{to:a.path,className:"quick-link",children:[e.jsx("span",{className:"quick-link-arrow",children:"→"}),a.label]},a.label))}),e.jsx("h2",{className:"section-title mt-12",children:"Exam Objectives Checklist"}),e.jsxs("div",{className:"objectives-grid",children:[e.jsxs("div",{className:"objective-group",children:[e.jsx("h4",{className:"objective-group-title",children:"Linux Foundation (RHCSA)"}),e.jsxs("ul",{className:"objective-list",children:[e.jsx("li",{children:"Understand and use essential tools"}),e.jsx("li",{children:"Operate running systems"}),e.jsx("li",{children:"Configure local storage (LVM, partitions)"}),e.jsx("li",{children:"Create and configure file systems (ext4, xfs)"}),e.jsx("li",{children:"Deploy, configure, and maintain systems"}),e.jsx("li",{children:"Manage users and groups"}),e.jsx("li",{children:"Manage security (SELinux, firewalld, ACLs)"}),e.jsx("li",{children:"Analyze simple shell scripts"})]})]}),e.jsxs("div",{className:"objective-group",children:[e.jsx("h4",{className:"objective-group-title",children:"Ansible Configuration"}),e.jsxs("ul",{className:"objective-list",children:[e.jsx("li",{children:"Install required packages"}),e.jsx("li",{children:"Create and modify ansible.cfg"}),e.jsx("li",{children:"Modify ansible-navigator.yml"}),e.jsx("li",{children:"Create static host inventory file"}),e.jsx("li",{children:"Create and use groups in inventory"}),e.jsx("li",{children:"Configure Ansible managed nodes"}),e.jsx("li",{children:"Create and distribute SSH keys"}),e.jsx("li",{children:"Configure privilege escalation"})]})]}),e.jsxs("div",{className:"objective-group",children:[e.jsx("h4",{className:"objective-group-title",children:"Ansible Automation"}),e.jsxs("ul",{className:"objective-list",children:[e.jsx("li",{children:"Work with commonly used modules"}),e.jsx("li",{children:"Use variables from command results"}),e.jsx("li",{children:"Use conditionals to control execution"}),e.jsx("li",{children:"Configure error handling"}),e.jsx("li",{children:"Create and work with roles"}),e.jsx("li",{children:"Install Content Collections"}),e.jsx("li",{children:"Use ansible-navigator for docs/inventory"}),e.jsx("li",{children:"Run playbooks with ansible-navigator"})]})]}),e.jsxs("div",{className:"objective-group",children:[e.jsx("h4",{className:"objective-group-title",children:"RHCSA Tasks via Ansible"}),e.jsxs("ul",{className:"objective-list",children:[e.jsx("li",{children:"Software packages and repositories"}),e.jsx("li",{children:"Services (start, enable, restart)"}),e.jsx("li",{children:"Firewall rules (zones, ports, services)"}),e.jsx("li",{children:"File systems and storage devices"}),e.jsx("li",{children:"File content (copy, template, lineinfile)"}),e.jsx("li",{children:"Task scheduling (cron)"}),e.jsx("li",{children:"Security (SELinux, ACLs)"}),e.jsx("li",{children:"Users and groups"})]})]})]}),e.jsx("style",{children:`
        .hero-section {
          text-align: center;
          padding: var(--space-10) 0 var(--space-8);
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(129, 140, 248, 0.1);
          border: 1px solid rgba(129, 140, 248, 0.25);
          color: var(--accent-primary);
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 999px;
          margin-bottom: var(--space-5);
          font-family: var(--font-mono);
        }

        .hero-badge-dot {
          width: 7px;
          height: 7px;
          background: var(--success);
          border-radius: 50%;
          animation: pulse-glow 2s infinite;
        }

        .hero-title {
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1.1;
          margin-bottom: var(--space-5);
          color: var(--text-primary);
        }

        .hero-title-accent {
          background: linear-gradient(135deg, #818cf8 0%, #38bdf8 50%, #34d399 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-desc {
          font-size: 1.05rem;
          color: var(--text-secondary);
          max-width: 620px;
          margin: 0 auto var(--space-8);
          line-height: 1.75;
        }

        .hero-actions {
          display: flex;
          gap: var(--space-4);
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
          padding: 10px 24px;
          border-radius: var(--radius-lg);
          text-decoration: none;
          transition: all var(--transition-base);
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
        }

        .btn-primary:hover {
          background: linear-gradient(135deg, #4338ca, #4f46e5);
          transform: translateY(-2px);
          box-shadow: 0 0 30px rgba(99, 102, 241, 0.45);
          color: white;
          text-decoration: none;
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          background: transparent;
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 0.9rem;
          padding: 10px 24px;
          border-radius: var(--radius-lg);
          text-decoration: none;
          border: 1px solid var(--border-muted);
          transition: all var(--transition-base);
        }

        .btn-secondary:hover {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
          background: var(--accent-primary-subtle);
          text-decoration: none;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-4);
          margin: var(--space-8) 0;
        }

        .stat-card {
          background: var(--bg-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: var(--space-5);
          text-align: center;
          transition: all var(--transition-base);
          position: relative;
          overflow: hidden;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--accent);
          opacity: 0.6;
        }

        .stat-card:hover {
          border-color: var(--accent);
          box-shadow: 0 0 20px rgba(from var(--accent) r g b / 0.15);
          transform: translateY(-2px);
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 800;
          font-family: var(--font-mono);
          letter-spacing: -0.02em;
        }

        .stat-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-top: 4px;
        }

        .stat-sub {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 2px;
        }

        .topic-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: var(--space-4);
          margin: var(--space-6) 0;
        }

        .topic-card {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          background: var(--bg-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: var(--space-5);
          text-decoration: none;
          transition: all var(--transition-base);
          position: relative;
          overflow: hidden;
        }

        .topic-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, var(--card-accent), transparent);
          opacity: 0;
          transition: opacity var(--transition-base);
        }

        .topic-card:hover {
          border-color: var(--card-accent);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(from var(--card-accent) r g b / 0.1);
          transform: translateY(-3px);
          text-decoration: none;
        }

        .topic-card:hover::after {
          opacity: 1;
        }

        .topic-card-icon {
          font-size: 1.5rem;
          line-height: 1;
        }

        .topic-card-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .topic-card-desc {
          font-size: 0.82rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin: 0;
          flex: 1;
        }

        .topic-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-top: 4px;
        }

        .topic-tag {
          font-size: 0.68rem;
          font-family: var(--font-mono);
          font-weight: 600;
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-muted);
          padding: 2px 7px;
          border-radius: 4px;
          border: 1px solid var(--border-subtle);
        }

        .quick-links-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: var(--space-3);
          margin: var(--space-5) 0;
        }

        .quick-link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          background: var(--bg-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          font-size: 0.83rem;
          color: var(--text-secondary);
          text-decoration: none;
          transition: all var(--transition-fast);
          font-family: var(--font-mono);
        }

        .quick-link:hover {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
          background: var(--accent-primary-subtle);
          text-decoration: none;
          transform: translateX(3px);
        }

        .quick-link-arrow {
          color: var(--accent-primary);
          font-size: 0.9rem;
          transition: transform var(--transition-fast);
        }

        .quick-link:hover .quick-link-arrow {
          transform: translateX(3px);
        }

        .objectives-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: var(--space-5);
          margin: var(--space-5) 0 var(--space-12);
        }

        .objective-group {
          background: var(--bg-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: var(--space-5);
        }

        .objective-group-title {
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--accent-primary);
          margin-bottom: var(--space-4);
          padding-bottom: var(--space-3);
          border-bottom: 1px solid var(--border-subtle);
        }

        .objective-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .objective-list li {
          font-size: 0.83rem;
          color: var(--text-secondary);
          padding: 5px 0 5px 20px;
          position: relative;
          margin: 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        }

        .objective-list li:last-child {
          border-bottom: none;
        }

        .objective-list li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--success);
          font-size: 0.75rem;
          top: 6px;
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `})]})}export{d as default};
