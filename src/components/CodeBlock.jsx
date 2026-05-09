import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

// Custom dark theme
const codeTheme = {
  'code[class*="language-"]': {
    color: '#cdd9e5',
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    fontSize: '0.85rem',
    lineHeight: '1.65',
  },
  'pre[class*="language-"]': {
    color: '#cdd9e5',
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    fontSize: '0.85rem',
    lineHeight: '1.65',
    background: '#0d1117',
    padding: '1.5rem',
    borderRadius: '0',
    overflow: 'auto',
    margin: 0,
  },
  comment: { color: '#4d6073', fontStyle: 'italic' },
  prolog: { color: '#4d6073' },
  doctype: { color: '#4d6073' },
  cdata: { color: '#4d6073' },
  punctuation: { color: '#8b949e' },
  property: { color: '#79c0ff' },
  tag: { color: '#7ee787' },
  boolean: { color: '#79c0ff' },
  number: { color: '#f2cc60' },
  constant: { color: '#79c0ff' },
  symbol: { color: '#79c0ff' },
  deleted: { color: '#ffa198' },
  selector: { color: '#7ee787' },
  'attr-name': { color: '#7ee787' },
  string: { color: '#a5d6ff' },
  char: { color: '#a5d6ff' },
  builtin: { color: '#7ee787' },
  inserted: { color: '#56d364' },
  operator: { color: '#ff7b72' },
  entity: { color: '#f2cc60', cursor: 'help' },
  url: { color: '#a5d6ff' },
  variable: { color: '#ffa657' },
  atrule: { color: '#d2a8ff' },
  'attr-value': { color: '#a5d6ff' },
  function: { color: '#d2a8ff' },
  'class-name': { color: '#ffa657' },
  keyword: { color: '#ff7b72' },
  regex: { color: '#7ee787' },
  important: { color: '#ff7b72', fontWeight: 'bold' },
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },
}

const languageLabels = {
  yaml: 'YAML',
  yml: 'YAML',
  bash: 'Bash',
  sh: 'Shell',
  ini: 'INI',
  json: 'JSON',
  python: 'Python',
  javascript: 'JavaScript',
  jsx: 'JSX',
  text: 'TEXT',
  jinja2: 'Jinja2',
  j2: 'Jinja2',
  toml: 'TOML',
  conf: 'Config',
  diff: 'Diff',
}

export default function CodeBlock({ code, language = 'bash', filename, title }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
      const el = document.createElement('textarea')
      el.value = code
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const label = languageLabels[language] || language.toUpperCase()

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <div className="code-block-left">
          {filename && (
            <span className="code-filename">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              {filename}
            </span>
          )}
          {title && !filename && (
            <span className="code-title">{title}</span>
          )}
        </div>
        <div className="code-block-right">
          <span className="code-lang-badge">{label}</span>
          <button
            className={`copy-btn ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
            title="Copy to clipboard"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                Copy
              </>
            )}
          </button>
        </div>
      </div>
      <div className="code-block-content">
        <SyntaxHighlighter
          language={language === 'j2' ? 'jinja2' : language === 'yml' ? 'yaml' : language}
          style={codeTheme}
          showLineNumbers={code.split('\n').length > 5}
          lineNumberStyle={{
            color: '#3d5066',
            minWidth: '2.5em',
            paddingRight: '1em',
            userSelect: 'none',
          }}
          wrapLines={true}
          customStyle={{ margin: 0 }}
        >
          {code}
        </SyntaxHighlighter>
      </div>

      <style>{`
        .code-block-wrapper {
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-subtle);
          overflow: hidden;
          margin: var(--space-5) 0;
          box-shadow: var(--shadow-md);
        }

        .code-block-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #161b22;
          border-bottom: 1px solid #21262d;
          padding: 0.5rem 1rem;
          min-height: 38px;
          gap: 8px;
        }

        .code-block-left {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
        }

        .code-block-right {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .code-filename {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: #8b949e;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .code-filename svg {
          color: #58a6ff;
          flex-shrink: 0;
        }

        .code-title {
          font-size: 0.78rem;
          color: #8b949e;
          font-family: var(--font-mono);
        }

        .code-lang-badge {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #6e7681;
          background: #21262d;
          padding: 2px 8px;
          border-radius: 4px;
          border: 1px solid #30363d;
        }

        .copy-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          background: transparent;
          border: 1px solid #30363d;
          color: #8b949e;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          padding: 3px 10px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 150ms ease;
          white-space: nowrap;
        }

        .copy-btn:hover {
          background: #21262d;
          border-color: #58a6ff;
          color: #58a6ff;
        }

        .copy-btn.copied {
          border-color: #34d399;
          color: #34d399;
        }

        .code-block-content {
          overflow-x: auto;
        }
      `}</style>
    </div>
  )
}
