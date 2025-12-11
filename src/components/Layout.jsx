import React from 'react'

export default function Layout({ children, step, setStep, savedCount }) {
  return (
    <div className="app layout-root">
      <header className="site-header">
        <div className="left">
          {step > 0 && (
            <button className="back-btn" onClick={() => setStep(0)}>Back</button>
          )}
          <div className="site-name">CyberShield</div>
        </div>

        <div className="center">
          <div className="tag">Privacy-first documentation for online harassment</div>
        </div>

        <div className="right">
          <button className="records-btn" onClick={() => setStep(4)}>
            My Records {savedCount > 0 ? `(${savedCount})` : '(empty)'}
          </button>
        </div>
      </header>

      <div className="page-container">
        {children}
      </div>

      <footer className="site-footer">
        <div>CyberShield — Privacy-first documentation</div>
        <div className="small">This tool does not replace emergency, legal, or law enforcement services.</div>
      </footer>
    </div>
  )
}
