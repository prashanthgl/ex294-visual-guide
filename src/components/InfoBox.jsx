import React, { useState } from 'react'

const typeConfig = {
  tip: {
    icon: '💡',
    label: 'Tip',
    borderColor: '#34d399',
    bgColor: 'rgba(52, 211, 153, 0.06)',
    labelColor: '#34d399',
    iconBg: 'rgba(52, 211, 153, 0.12)',
  },
  warning: {
    icon: '⚠️',
    label: 'Warning',
    borderColor: '#fbbf24',
    bgColor: 'rgba(251, 191, 36, 0.06)',
    labelColor: '#fbbf24',
    iconBg: 'rgba(251, 191, 36, 0.12)',
  },
  danger: {
    icon: '🚨',
    label: 'Critical',
    borderColor: '#fb7185',
    bgColor: 'rgba(251, 113, 133, 0.06)',
    labelColor: '#fb7185',
    iconBg: 'rgba(251, 113, 133, 0.12)',
  },
  info: {
    icon: 'ℹ',
    label: 'Info',
    borderColor: '#38bdf8',
    bgColor: 'rgba(56, 189, 248, 0.06)',
    labelColor: '#38bdf8',
    iconBg: 'rgba(56, 189, 248, 0.12)',
  },
  key: {
    icon: '🔑',
    label: 'Key Concept',
    borderColor: '#818cf8',
    bgColor: 'rgba(129, 140, 248, 0.06)',
    labelColor: '#818cf8',
    iconBg: 'rgba(129, 140, 248, 0.12)',
  },
  exam: {
    icon: '🎯',
    label: 'Exam Tip',
    borderColor: '#c084fc',
    bgColor: 'rgba(192, 132, 252, 0.06)',
    labelColor: '#c084fc',
    iconBg: 'rgba(192, 132, 252, 0.12)',
  },
}

export default function InfoBox({ type = 'info', title, children, collapsible = false }) {
  const [open, setOpen] = useState(true)
  const config = typeConfig[type] || typeConfig.info

  return (
    <div
      className="info-box"
      style={{
        borderLeftColor: config.borderColor,
        background: config.bgColor,
        borderLeftWidth: '4px',
        borderLeftStyle: 'solid',
        borderRadius: '0 var(--radius-md) var(--radius-md) 0',
        padding: 'var(--space-4) var(--space-5)',
        margin: 'var(--space-5) 0',
        border: '1px solid',
        borderColor: `${config.borderColor}22`,
        borderLeft: `4px solid ${config.borderColor}`,
      }}
    >
      <div
        className="info-box-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: open || !collapsible ? 'var(--space-3)' : 0,
          cursor: collapsible ? 'pointer' : 'default',
          userSelect: 'none',
        }}
        onClick={collapsible ? () => setOpen(!open) : undefined}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '24px',
            height: '24px',
            borderRadius: '6px',
            background: config.iconBg,
            fontSize: '0.85rem',
            flexShrink: 0,
          }}
        >
          {config.icon}
        </span>
        <span
          style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: config.labelColor,
          }}
        >
          {title || config.label}
        </span>
        {collapsible && (
          <span
            style={{
              marginLeft: 'auto',
              color: config.labelColor,
              fontSize: '0.75rem',
              opacity: 0.7,
            }}
          >
            {open ? '▲' : '▼'}
          </span>
        )}
      </div>
      {(!collapsible || open) && (
        <div
          className="info-box-content"
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            lineHeight: '1.7',
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}
