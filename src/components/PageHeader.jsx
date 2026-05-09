import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const routeNames = {
  '/': 'Home',
  '/linux-internals': 'Linux Internals',
  '/ansible-setup': 'Ansible Setup',
  '/inventory': 'Inventory',
  '/core-concepts': 'Core Concepts',
  '/playbooks': 'Plays & Playbooks',
  '/roles-collections': 'Roles & Collections',
  '/navigator': 'ansible-navigator',
  '/automation-tasks': 'Automation Tasks',
  '/vault-templates': 'Vault & Templates',
  '/shell-scripts': 'Shell Scripts',
}

export default function PageHeader({ title, description, tags = [], icon }) {
  const location = useLocation()
  const currentPath = location.pathname

  const buildBreadcrumbs = () => {
    const crumbs = [{ path: '/', label: 'Home' }]
    if (currentPath !== '/') {
      crumbs.push({ path: currentPath, label: routeNames[currentPath] || title })
    }
    return crumbs
  }

  const crumbs = buildBreadcrumbs()

  return (
    <div className="page-header">
      {/* Breadcrumb */}
      <nav className="breadcrumb" aria-label="Breadcrumb">
        {crumbs.map((crumb, i) => (
          <span key={crumb.path} className="breadcrumb-item">
            {i > 0 && <span className="breadcrumb-sep">/</span>}
            {i < crumbs.length - 1 ? (
              <Link to={crumb.path} className="breadcrumb-link">{crumb.label}</Link>
            ) : (
              <span className="breadcrumb-current">{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>

      {/* Title row */}
      <div className="page-header-title-row">
        {icon && <span className="page-header-icon">{icon}</span>}
        <h1 className="page-header-title">{title}</h1>
      </div>

      {/* Description */}
      {description && (
        <p className="page-header-desc">{description}</p>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="tags">
          {tags.map(tag => (
            <span key={tag} className="badge badge-primary">{tag}</span>
          ))}
        </div>
      )}

      <div className="page-header-divider" />

      <style>{`
        .page-header {
          margin-bottom: var(--space-8);
          animation: fadeIn 0.3s ease forwards;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: var(--space-4);
        }

        .breadcrumb-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .breadcrumb-sep {
          color: var(--text-muted);
          margin: 0 4px;
          font-size: 0.8rem;
        }

        .breadcrumb-link {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-decoration: none;
          transition: color var(--transition-fast);
        }

        .breadcrumb-link:hover {
          color: var(--accent-primary);
          text-decoration: none;
        }

        .breadcrumb-current {
          font-size: 0.8rem;
          color: var(--accent-primary);
          font-weight: 500;
        }

        .page-header-title-row {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          margin-bottom: var(--space-3);
        }

        .page-header-icon {
          font-size: 2rem;
          line-height: 1;
        }

        .page-header-title {
          background: linear-gradient(135deg, var(--text-primary) 0%, var(--accent-primary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          margin: 0;
        }

        .page-header-desc {
          font-size: 1rem;
          color: var(--text-secondary);
          max-width: 680px;
          line-height: 1.7;
          margin-bottom: var(--space-3);
        }

        .page-header-divider {
          height: 1px;
          background: linear-gradient(90deg, var(--accent-primary-dim) 0%, transparent 100%);
          margin-top: var(--space-5);
          opacity: 0.4;
        }
      `}</style>
    </div>
  )
}
