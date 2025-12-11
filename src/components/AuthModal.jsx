import React, { useState } from 'react'
import { deriveKey, generateSalt } from '../utils/crypto'

export default function AuthModal({ isOpen, onClose, onCreateAccount, onLogin, onResetPassphrase }) {
  const [mode, setMode] = useState('login') // 'login', 'signup', or 'recover'
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassphrase, setLoginPassphrase] = useState('')

  const [signupUsername, setSignupUsername] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassphrase, setSignupPassphrase] = useState('')
  const [signupRecoveryQ, setSignupRecoveryQ] = useState('')
  const [signupRecoveryA, setSignupRecoveryA] = useState('')

  const [recoverUsername, setRecoverUsername] = useState('')
  const [recoverAnswerInput, setRecoverAnswerInput] = useState('')
  const [recoverNewPassphrase, setRecoverNewPassphrase] = useState('')
  const [recoverHint, setRecoverHint] = useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setError('')
    if (!loginUsername || !loginPassphrase) {
      setError('Username and passphrase are required.')
      return
    }

    setLoading(true)
    try {
      const result = await onLogin(loginUsername, loginPassphrase)
      if (result.success) {
        setMode('login')
        setLoginUsername('')
        setLoginPassphrase('')
        onClose()
      } else {
        setError(result.message || 'Login failed.')
      }
    } catch (e) {
      setError('An error occurred during login.')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  async function handleSignup() {
    setError('')
    if (!signupUsername || !signupPassphrase) {
      setError('Username and passphrase are required.')
      return
    }

    setLoading(true)
    try {
      const result = await onCreateAccount({
        username: signupUsername,
        email: signupEmail,
        passphrase: signupPassphrase,
        recoveryQuestion: signupRecoveryQ,
        recoveryAnswer: signupRecoveryA
      })
      if (result.success) {
        setMode('login')
        setSignupUsername('')
        setSignupEmail('')
        setSignupPassphrase('')
        setSignupRecoveryQ('')
        setSignupRecoveryA('')
        onClose()
      } else {
          setError(result.message || 'Account creation failed.')
        }
      } catch (e) {
        setError('An error occurred during account creation.')
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    async function handleSignup() {
      setError('')
      if (!signupUsername || !signupPassphrase) {
        setError('Username and passphrase are required.')
        return
      }

      setLoading(true)
      try {
        const result = await onCreateAccount({
          username: signupUsername,
          email: signupEmail,
          passphrase: signupPassphrase,
          recoveryQuestion: signupRecoveryQ,
          recoveryAnswer: signupRecoveryA
        })
        if (result.success) {
          setLoginUsername(signupUsername)
          setSignupUsername('')
          setSignupEmail('')
          setSignupPassphrase('')
          setSignupRecoveryQ('')
          setSignupRecoveryA('')
          setMode('login')
          alert('Account created! You are now logged in.')
          onClose()
        } else {
          setError(result.message || 'Account creation failed.')
      }
    } catch (e) {
      setError('An error occurred during account creation.')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  async function handleRecover() {
    setError('')
    if (!recoverUsername) {
      setError('Username is required.')
      return
    }

    setLoading(true)
    try {
      const result = await onResetPassphrase(recoverUsername, recoverAnswerInput, recoverNewPassphrase)
      if (result.success) {
        setMode('login')
        setRecoverUsername('')
        setRecoverAnswerInput('')
        setRecoverNewPassphrase('')
        setRecoverHint('')
        alert('Passphrase reset successfully. Please log in with your new passphrase.')
        onClose()
      } else {
        setError(result.message || 'Recovery failed.')
      }
    } catch (e) {
      setError('An error occurred during recovery.')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  function handleRecoverUsername() {
    setError('')
    if (!recoverUsername) {
      setError('Enter username.')
      return
    }
    const acct = JSON.parse(localStorage.getItem('cybershield-account') || localStorage.getItem('cybershield-user') || 'null')
    if (!acct) {
      setError('Account not found.')
      return
    }
    const acctName = acct.username || acct.name || ''
    if (acctName !== recoverUsername) {
      setError('Account not found.')
      return
    }
    if (!acct.recoveryQuestion) {
      setError('No recovery question set for this account.')
      return
    }
    setRecoverHint(acct.recoveryQuestion)
  }

  if (!isOpen) return null

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={e => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>×</button>

        {mode === 'login' ? (
          <>
            <h2>Log In to CyberShield</h2>
            <div className="auth-form">
              <label>Username</label>
              <input
                type="text"
                value={loginUsername}
                onChange={e => setLoginUsername(e.target.value)}
                placeholder="Your username"
              />

              <label>Passphrase</label>
              <input
                type="password"
                value={loginPassphrase}
                onChange={e => setLoginPassphrase(e.target.value)}
                placeholder="Your passphrase"
              />

                <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '6px'}}>
                  <button className="auth-forgot-link" onClick={() => {
                    setMode('recover')
                    setError('')
                  }}>
                    Forgot Passphrase?
                  </button>
                </div>

              {error && <div className="auth-error">{error}</div>}

              <button className="auth-btn-primary" onClick={handleLogin} disabled={loading}>
                {loading ? 'Logging in...' : 'Log In'}
              </button>

              <div className="auth-divider">or</div>

              <button className="auth-btn-secondary" onClick={() => {
                setMode('signup')
                setError('')
              }}>
                Create Account
              </button>

            </div>
          </>
        ) : mode === 'signup' ? (
          <>
            <h2>Create Account</h2>
            <div className="auth-form">
              <label>Username</label>
              <input
                type="text"
                value={signupUsername}
                onChange={e => setSignupUsername(e.target.value)}
                placeholder="Choose a username"
              />

              <label>Email Address (optional)</label>
              <input
                type="email"
                value={signupEmail}
                onChange={e => setSignupEmail(e.target.value)}
                placeholder="For account recovery"
              />

              <label>Passphrase</label>
              <input
                type="password"
                value={signupPassphrase}
                onChange={e => setSignupPassphrase(e.target.value)}
                placeholder="Choose a strong passphrase"
              />

              <label>Recovery Question (optional)</label>
              <input
                type="text"
                value={signupRecoveryQ}
                onChange={e => setSignupRecoveryQ(e.target.value)}
                placeholder="e.g., What is your favorite color?"
              />

              <label>Recovery Answer</label>
              <input
                type="text"
                value={signupRecoveryA}
                onChange={e => setSignupRecoveryA(e.target.value)}
                placeholder="Your answer (as a reminder)"
              />

              {error && <div className="auth-error">{error}</div>}

              <button className="auth-btn-primary" onClick={handleSignup} disabled={loading}>
                {loading ? 'Creating...' : 'Create Account'}
              </button>

              <div className="auth-divider">or</div>

              <button className="auth-btn-secondary" onClick={() => {
                setMode('login')
                setError('')
              }}>
                Back to Log In
              </button>
            </div>
          </>
        ) : (
          <>
            <h2>Reset Passphrase</h2>
            <div className="auth-form">
              <label>Username</label>
              <div style={{display: 'flex', gap: '8px'}}>
                <input
                  type="text"
                  value={recoverUsername}
                  onChange={e => setRecoverUsername(e.target.value)}
                  placeholder="Your username"
                  style={{flex: 1}}
                />
                <button className="auth-btn-primary" onClick={handleRecoverUsername} style={{padding: '8px 12px', marginTop: 0}}>
                  Verify
                </button>
              </div>

              {recoverHint && (
                <>
                  <label style={{marginTop: 16}}>Recovery Question</label>
                  <div style={{padding: '8px', background: '#f5f5f5', borderRadius: '4px', marginTop: '6px'}}>
                    {recoverHint}
                  </div>

                  <label>Your Answer</label>
                  <input
                    type="text"
                    value={recoverAnswerInput}
                    onChange={e => setRecoverAnswerInput(e.target.value)}
                    placeholder="Answer to verify your identity"
                  />

                  <label>New Passphrase</label>
                  <input
                    type="password"
                    value={recoverNewPassphrase}
                    onChange={e => setRecoverNewPassphrase(e.target.value)}
                    placeholder="Choose a new passphrase"
                  />
                </>
              )}

              {error && <div className="auth-error">{error}</div>}

              {recoverHint && (
                <button className="auth-btn-primary" onClick={handleRecover} disabled={loading}>
                  {loading ? 'Resetting...' : 'Reset Passphrase'}
                </button>
              )}

              <div className="auth-divider">or</div>

              <button className="auth-btn-secondary" onClick={() => {
                setMode('login')
                setError('')
                setRecoverUsername('')
                setRecoverAnswerInput('')
                setRecoverNewPassphrase('')
                setRecoverHint('')
              }}>
                Back to Log In
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
