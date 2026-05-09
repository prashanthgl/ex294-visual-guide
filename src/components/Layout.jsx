import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navGroups = [
  {
    label: 'Getting Started',
    items: [
      { path: '/', label: 'Home', icon: '⌂', desc: 'Overview & Exam Info' },
    ],
  },
  {
    label: 'Linux Foundation',
    items: [
      { path: '/linux-internals', label: 'Linux Internals', icon: '🐧', desc: 'Deep Dive' },
      { path: '/shell-scripts', label: 'Shell Scripts', icon: '$_', desc: 'Bash Scripting' },
    ],
  },
  {
    label: 'Ansible Core',
    items: [
      { path: '/ansible-setup', label: 'Ansible Setup', icon: '⚙', desc: 'Install & Configure' },
      { path: '/inventory', label: 'Inventory', icon: '☰', desc: 'Hosts & Groups' },
      { path: '/core-concepts', label: 'Core Concepts', icon: '◈', desc: 'Modules, Vars, Facts' },
      { path: '/playbooks', label: 'Plays & Playbooks', icon: '▶', desc: 'Tasks & Handlers' },
    ],
  },
  {
    label: 'Advanced Topics',
    items: [
      { path: '/roles-collections', label: 'Roles & Collections', icon: '⬡', desc: 'Reusable Content' },
      { path: '/navigator', label: 'ansible-navigator', icon: '◉', desc: 'EE & TUI' },
      { path: '/automation-tasks', label: 'Automation Tasks', icon: '⚡', desc: 'RHCSA via Ansible' },
      { path: '/vault-templates', label: 'Vault & Templates', icon: '🔒', desc: 'Secrets & Jinja2' },
    ],
  },
]

function NavItem({ path, label, icon, desc }) {
  const location = useLocation()
  const isActive = location.pathname === path

  return (
    <Link
      to={path}
      className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
      title={desc}
    >
      <span className="nav-icon">{icon}</span>
      <span className="nav-label">{label}</span>
      {isActive && <span className="nav-active-indicator" />}
    </Link>
  )
}

function NavGroup({ label, items, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  const location = useLocation()
  const hasActive = items.some(item => item.path === location.pathname)

  useEffect(() => {
    if (hasActive) setOpen(true)
  }, [location.pathname, hasActive])

  return (
    <div className="nav-group">
      <button
        className="nav-group-header"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="nav-group-label">{label}</span>
        <span className={`nav-group-chevron ${open ? 'open' : ''}`}>›</span>
      </button>
      {open && (
        <div className="nav-group-items">
          {items.map(item => (
            <NavItem key={item.path} {...item} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <div className="app-layout">
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile menu button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
      >
        {mobileOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
        {/* Logo / Brand */}
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <span>EX</span>
            <span className="sidebar-brand-num">294</span>
          </div>
          <div className="sidebar-brand-text">
            <div className="sidebar-brand-title">Visual Guide</div>
            <div className="sidebar-brand-subtitle">RHCE Exam Prep</div>
          </div>
        </div>

        {/* Exam badge */}
        <div className="sidebar-exam-badge">
          <span className="sidebar-exam-dot" />
          <span>EX294 • Performance-Based</span>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          {navGroups.map(group => (
            <NavGroup
              key={group.label}
              label={group.label}
              items={group.items}
              defaultOpen={true}
            />
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <div className="sidebar-footer-text">
            <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>
              Red Hat EX294 • v1.0
            </span>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="main-content">
        {children}
      </main>

      <style>{`
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: var(--sidebar-width);
          height: 100vh;
          background: var(--sidebar-bg);
          border-right: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          z-index: 1000;
          overflow-y: auto;
          overflow-x: hidden;
          transition: transform var(--transition-base);
        }

        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px 16px 16px;
          border-bottom: 1px solid var(--border-subtle);
          flex-shrink: 0;
        }

        .sidebar-brand-icon {
          display: flex;
          align-items: baseline;
          gap: 1px;
          background: linear-gradient(135deg, #4f46e5, #818cf8);
          color: white;
          font-family: var(--font-mono);
          font-weight: 800;
          font-size: 0.9rem;
          padding: 6px 10px;
          border-radius: 8px;
          letter-spacing: 0.02em;
          flex-shrink: 0;
          box-shadow: 0 0 16px rgba(99, 102, 241, 0.35);
        }

        .sidebar-brand-num {
          font-size: 1.05rem;
        }

        .sidebar-brand-title {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }

        .sidebar-brand-subtitle {
          font-size: 0.7rem;
          color: var(--text-muted);
          margin-top: 1px;
          font-family: var(--font-mono);
        }

        .sidebar-exam-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          margin: 10px 14px;
          padding: 6px 10px;
          background: rgba(99, 102, 241, 0.08);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 6px;
          font-size: 0.7rem;
          font-weight: 500;
          color: var(--accent-primary);
          font-family: var(--font-mono);
          flex-shrink: 0;
        }

        .sidebar-exam-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--success);
          animation: pulse-glow 2s infinite;
          flex-shrink: 0;
        }

        .sidebar-nav {
          flex: 1;
          padding: 8px 0;
          overflow-y: auto;
        }

        .nav-group {
          margin-bottom: 2px;
        }

        .nav-group-header {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 16px;
          background: transparent;
          border: none;
          cursor: pointer;
          color: var(--sidebar-section-header);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: color var(--transition-fast);
        }

        .nav-group-header:hover {
          color: var(--text-secondary);
        }

        .nav-group-chevron {
          font-size: 1rem;
          transition: transform var(--transition-fast);
          transform: rotate(90deg);
        }

        .nav-group-chevron.open {
          transform: rotate(-90deg) scaleX(-1);
        }

        .nav-group-items {
          padding: 2px 0 6px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px;
          margin: 1px 8px;
          border-radius: var(--radius-md);
          text-decoration: none;
          color: var(--text-muted);
          font-size: 0.85rem;
          font-weight: 500;
          transition: all var(--transition-fast);
          position: relative;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .nav-item:hover {
          background: var(--sidebar-item-hover);
          color: var(--text-primary);
          text-decoration: none;
        }

        .nav-item-active {
          background: var(--sidebar-item-active);
          color: var(--accent-primary);
        }

        .nav-item-active:hover {
          background: rgba(129, 140, 248, 0.2);
          color: var(--accent-primary);
        }

        .nav-icon {
          font-size: 0.9rem;
          width: 18px;
          text-align: center;
          flex-shrink: 0;
          font-family: var(--font-mono);
          opacity: 0.8;
        }

        .nav-label {
          flex: 1;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .nav-active-indicator {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 16px;
          background: var(--accent-primary);
          border-radius: 0 2px 2px 0;
        }

        .sidebar-footer {
          padding: 12px 16px;
          border-top: 1px solid var(--border-subtle);
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .sidebar {
            transform: translateX(-100%);
          }

          .sidebar-open {
            transform: translateX(0);
            box-shadow: var(--shadow-lg);
          }
        }
      `}</style>
    </div>
  )
}
