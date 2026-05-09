import React from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import InfoBox from '../components/InfoBox'

const examStats = [
  { label: 'Duration', value: '4 Hours', sub: '240 minutes total', color: 'var(--accent-primary)' },
  { label: 'Format', value: 'Performance', sub: 'Hands-on lab tasks', color: 'var(--accent-sky)' },
  { label: 'Pass Score', value: '210 / 300', sub: '70% required', color: 'var(--success)' },
  { label: 'Prerequisite', value: 'RHCSA', sub: 'EX200 recommended', color: 'var(--warning)' },
]

const topicCards = [
  {
    path: '/linux-internals',
    icon: '🐧',
    title: 'Linux Internals',
    desc: 'Deep dive into the kernel, filesystem hierarchy, SELinux, systemd, process management, and storage.',
    tags: ['Kernel', 'SELinux', 'Systemd', 'LVM'],
    color: 'var(--accent-sky)',
  },
  {
    path: '/ansible-setup',
    icon: '⚙',
    title: 'Ansible Setup',
    desc: 'Install Ansible, configure ansible.cfg and ansible-navigator.yml, set up SSH keys and privilege escalation.',
    tags: ['ansible.cfg', 'SSH', 'sudo'],
    color: 'var(--accent-primary)',
  },
  {
    path: '/inventory',
    icon: '☰',
    title: 'Inventory Management',
    desc: 'Create INI and YAML inventories, define groups, host variables, group variables, and behavioral parameters.',
    tags: ['INI', 'YAML', 'host_vars', 'group_vars'],
    color: 'var(--success)',
  },
  {
    path: '/core-concepts',
    icon: '◈',
    title: 'Core Concepts',
    desc: 'Master modules, variables (22 precedence levels), facts, loops, and conditionals.',
    tags: ['Modules', 'Variables', 'Facts', 'Loops'],
    color: 'var(--warning)',
  },
  {
    path: '/playbooks',
    icon: '▶',
    title: 'Plays & Playbooks',
    desc: 'Play structure, handlers, tags, blocks, error handling, delegation, and execution control.',
    tags: ['Handlers', 'Tags', 'Blocks', 'Rescue'],
    color: 'var(--accent-primary)',
  },
  {
    path: '/roles-collections',
    icon: '⬡',
    title: 'Roles & Collections',
    desc: 'Create roles with ansible-galaxy, manage dependencies, install Content Collections, use FQCN.',
    tags: ['Galaxy', 'FQCN', 'requirements.yml'],
    color: 'var(--purple)',
  },
  {
    path: '/navigator',
    icon: '◉',
    title: 'ansible-navigator',
    desc: 'Execution environments, TUI navigation, running playbooks, finding docs, VS Code integration.',
    tags: ['EE', 'TUI', 'VS Code', 'Containers'],
    color: 'var(--accent-sky)',
  },
  {
    path: '/automation-tasks',
    icon: '⚡',
    title: 'Automation Tasks',
    desc: 'Automate RHCSA tasks: packages, services, firewall, storage, files, users, SELinux, scheduling.',
    tags: ['dnf', 'firewalld', 'LVM', 'users'],
    color: 'var(--success)',
  },
  {
    path: '/vault-templates',
    icon: '🔒',
    title: 'Vault & Templates',
    desc: 'Protect sensitive data with Ansible Vault. Generate config files with Jinja2 templates and filters.',
    tags: ['Vault', 'Jinja2', 'encrypt_string'],
    color: 'var(--danger)',
  },
  {
    path: '/shell-scripts',
    icon: '$_',
    title: 'Shell Scripts',
    desc: 'Analyze and write Bash scripts: variables, conditionals, loops, functions, and exit codes.',
    tags: ['Bash', 'if/else', 'loops', 'functions'],
    color: 'var(--warning)',
  },
]

const quickLinks = [
  { label: 'ansible.cfg reference', path: '/ansible-setup' },
  { label: 'Variable precedence pyramid', path: '/core-concepts' },
  { label: 'Full LVM playbook', path: '/automation-tasks' },
  { label: 'Vault encrypt_string', path: '/vault-templates' },
  { label: 'Role directory structure', path: '/roles-collections' },
  { label: 'Jinja2 filters', path: '/vault-templates' },
  { label: 'SELinux commands', path: '/linux-internals' },
  { label: 'Execution environments', path: '/navigator' },
]

export default function Home() {
  return (
    <div className="page-container fade-in">
      {/* Hero */}
      <div className="hero-section">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          <span>EX294 — Red Hat Certified Engineer</span>
        </div>
        <h1 className="hero-title">
          Master the{' '}
          <span className="hero-title-accent">RHCE Exam</span>
        </h1>
        <p className="hero-desc">
          A comprehensive, interactive guide covering every exam objective — from Linux kernel
          internals and Ansible automation to Vault encryption and Jinja2 templating. Built for
          engineers who want to understand the <em>why</em>, not just the <em>how</em>.
        </p>
        <div className="hero-actions">
          <Link to="/linux-internals" className="btn-primary">Start with Linux Internals →</Link>
          <Link to="/ansible-setup" className="btn-secondary">Jump to Ansible Setup</Link>
        </div>
      </div>

      {/* Exam Stats */}
      <div className="stats-grid">
        {examStats.map(stat => (
          <div key={stat.label} className="stat-card" style={{ '--accent': stat.color }}>
            <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-sub">{stat.sub}</div>
          </div>
        ))}
      </div>

      <InfoBox type="exam" title="About the EX294 Exam">
        <p>
          The EX294 is a <strong>performance-based exam</strong> — you will be given a live RHEL
          environment and asked to complete tasks using Ansible. There is no multiple choice. You
          must write playbooks, configure inventory files, manage roles, and automate Linux tasks.
        </p>
        <p style={{ marginTop: '8px' }}>
          <strong>Key rule:</strong> All configurations must <em>persist after reboot</em> without
          intervention. This means using <code>enabled: true</code> for services, <code>permanent: true</code> for
          firewall rules, and ensuring fstab entries are correct.
        </p>
      </InfoBox>

      {/* Topic Cards */}
      <h2 className="section-title mt-10">Exam Topics</h2>
      <div className="topic-grid">
        {topicCards.map(card => (
          <Link key={card.path} to={card.path} className="topic-card" style={{ '--card-accent': card.color }}>
            <div className="topic-card-icon">{card.icon}</div>
            <h3 className="topic-card-title">{card.title}</h3>
            <p className="topic-card-desc">{card.desc}</p>
            <div className="topic-card-tags">
              {card.tags.map(tag => (
                <span key={tag} className="topic-tag">{tag}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Reference */}
      <h2 className="section-title mt-12">Quick Reference Links</h2>
      <div className="quick-links-grid">
        {quickLinks.map(link => (
          <Link key={link.label} to={link.path} className="quick-link">
            <span className="quick-link-arrow">→</span>
            {link.label}
          </Link>
        ))}
      </div>

      {/* Exam Objectives Checklist */}
      <h2 className="section-title mt-12">Exam Objectives Checklist</h2>
      <div className="objectives-grid">
        <div className="objective-group">
          <h4 className="objective-group-title">Linux Foundation (RHCSA)</h4>
          <ul className="objective-list">
            <li>Understand and use essential tools</li>
            <li>Operate running systems</li>
            <li>Configure local storage (LVM, partitions)</li>
            <li>Create and configure file systems (ext4, xfs)</li>
            <li>Deploy, configure, and maintain systems</li>
            <li>Manage users and groups</li>
            <li>Manage security (SELinux, firewalld, ACLs)</li>
            <li>Analyze simple shell scripts</li>
          </ul>
        </div>
        <div className="objective-group">
          <h4 className="objective-group-title">Ansible Configuration</h4>
          <ul className="objective-list">
            <li>Install required packages</li>
            <li>Create and modify ansible.cfg</li>
            <li>Modify ansible-navigator.yml</li>
            <li>Create static host inventory file</li>
            <li>Create and use groups in inventory</li>
            <li>Configure Ansible managed nodes</li>
            <li>Create and distribute SSH keys</li>
            <li>Configure privilege escalation</li>
          </ul>
        </div>
        <div className="objective-group">
          <h4 className="objective-group-title">Ansible Automation</h4>
          <ul className="objective-list">
            <li>Work with commonly used modules</li>
            <li>Use variables from command results</li>
            <li>Use conditionals to control execution</li>
            <li>Configure error handling</li>
            <li>Create and work with roles</li>
            <li>Install Content Collections</li>
            <li>Use ansible-navigator for docs/inventory</li>
            <li>Run playbooks with ansible-navigator</li>
          </ul>
        </div>
        <div className="objective-group">
          <h4 className="objective-group-title">RHCSA Tasks via Ansible</h4>
          <ul className="objective-list">
            <li>Software packages and repositories</li>
            <li>Services (start, enable, restart)</li>
            <li>Firewall rules (zones, ports, services)</li>
            <li>File systems and storage devices</li>
            <li>File content (copy, template, lineinfile)</li>
            <li>Task scheduling (cron)</li>
            <li>Security (SELinux, ACLs)</li>
            <li>Users and groups</li>
          </ul>
        </div>
      </div>

      <style>{`
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
      `}</style>
    </div>
  )
}
