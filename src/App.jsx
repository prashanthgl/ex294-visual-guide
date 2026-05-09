import React, { Suspense } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

// Lazy load pages for performance
const Home = React.lazy(() => import('./pages/Home'))
const LinuxInternals = React.lazy(() => import('./pages/LinuxInternals'))
const AnsibleSetup = React.lazy(() => import('./pages/AnsibleSetup'))
const Inventory = React.lazy(() => import('./pages/Inventory'))
const CoreConcepts = React.lazy(() => import('./pages/CoreConcepts'))
const Playbooks = React.lazy(() => import('./pages/Playbooks'))
const RolesCollections = React.lazy(() => import('./pages/RolesCollections'))
const Navigator = React.lazy(() => import('./pages/Navigator'))
const AutomationTasks = React.lazy(() => import('./pages/AutomationTasks'))
const VaultTemplates = React.lazy(() => import('./pages/VaultTemplates'))
const ShellScripts = React.lazy(() => import('./pages/ShellScripts'))

function PageLoader() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      flexDirection: 'column',
      gap: '16px',
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid rgba(129, 140, 248, 0.2)',
        borderTopColor: 'var(--accent-primary)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
        Loading...
      </span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/linux-internals" element={<LinuxInternals />} />
            <Route path="/ansible-setup" element={<AnsibleSetup />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/core-concepts" element={<CoreConcepts />} />
            <Route path="/playbooks" element={<Playbooks />} />
            <Route path="/roles-collections" element={<RolesCollections />} />
            <Route path="/navigator" element={<Navigator />} />
            <Route path="/automation-tasks" element={<AutomationTasks />} />
            <Route path="/vault-templates" element={<VaultTemplates />} />
            <Route path="/shell-scripts" element={<ShellScripts />} />
          </Routes>
        </Suspense>
      </Layout>
    </HashRouter>
  )
}
