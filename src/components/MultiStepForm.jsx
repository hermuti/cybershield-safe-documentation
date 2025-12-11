import React from 'react'
import { generatePDF } from '../utils/pdf'
import { encryptObject, decryptObject, deriveKey, generateSalt } from '../utils/crypto'
import { getPersonalizedGuidance } from '../utils/guidanceDatabase'

function Home({ onStart, setData }) {
  const attacks = [
    { key: 'Cyber flashing', icon: '🔥', title: 'Cyber Flashing', short: 'Unsolicited explicit images/videos sent to you', causes: ['Direct messages from unknown accounts','Shared to group chats without consent','Someone posts an image tagging you'] },
    { key: 'Digital voyeurism', icon: '👁️', title: 'Digital Voyeurism', short: 'Secret recording/sharing of private moments', causes: ['Hidden camera or livestream capture','Screenshots taken during private calls','Recordings shared to others without consent'] },
    { key: 'Morphing / Transmogrification', icon: '🎭', title: 'Morphing', short: 'Your photo edited into explicit content', causes: ['Image taken and edited by a third party','AI tools used to place your likeness into new content','Someone reposts an altered image claiming it is you'] },
    { key: 'Non-consensual dissemination', icon: '📸', title: 'Non-Consensual Dissemination', short: 'Sharing intimate images without consent', causes: ['A former partner shares private images','Hacked account leads to leaks','Someone downloads and reposts content without permission'] },
    { key: 'Sexploitation', icon: '💀', title: 'Sexploitation', short: 'Coercing sexual acts or content through manipulation', causes: ['Pressure or manipulation to perform sexual acts','Blackmail to force content creation','Threats or emotional coercion to obtain images'] },
    { key: 'Cyber stalking', icon: '🐺', title: 'Cyber Stalking', short: 'Repeated, unwanted monitoring/contact', causes: ['Repeated messages or comments across platforms','Using location tags or photos to follow movements','Creating false profiles to monitor you'] },
    { key: 'Doxing', icon: '📍', title: 'Doxing', short: 'Publishing private info to harm you', causes: ['Someone compiles public records and shares them','Posting screenshots with personal details','Leaking private conversations that include identifying info'] },
    { key: 'Gender-based hate speech', icon: '☠️', title: 'Gender-Based Hate Speech', short: 'Targeted abuse because of your gender', causes: ['Comments targeting gender identity on public posts','Coordinated harassment campaigns focused on gender','Using slurs or threats in replies and DMs'] },
    { key: 'Online sexual harassment & bullying', icon: '😈', title: 'Online Sexual Harassment', short: 'Unwanted sexual comments or advances', causes: ['Repeated unsolicited sexual messages','Sexual comments on your public posts','Persistent requests or pressure in chat'] },
    { key: 'Online threats & blackmail', icon: '⚡', title: 'Online Threats & Blackmail', short: 'Threats to expose or harm', causes: ['Threats to release content unless you comply','Direct messages demanding money or actions','Public posts threatening exposure'] },
    { key: 'Sextortion', icon: '🔐', title: 'Sextortion', short: 'Pay or I will expose your intimate images', causes: ['Someone threatens to share intimate content unless paid','Hacked accounts used to harvest compromising material','Scammers posing as lovers to extract media'] },
    { key: 'Identity theft / Impersonation', icon: '🎭', title: 'Impersonation', short: 'Someone pretending to be you', causes: ['Fake profiles created in your name','Using your photos to set up accounts','Messages sent to others pretending to be you'] },
    { key: 'Online grooming', icon: '🎣', title: 'Online Grooming', short: 'Building trust to manipulate (often minors)', causes: ['Gradual relationship-building to lower defenses','Soliciting photos or private contact over time','Encouraging secret conversations away from parents/caregivers'] },
    { key: 'Zoom bombing', icon: '💥', title: 'Zoom Bombing', short: 'Intruding calls to harass with hate/obscenity', causes: ['Uninvited participants join public meetings','Meeting links shared publicly or in insecure places','Screen-sharing abusive content during calls'] }
  ]

  const [selected, setSelected] = React.useState(null)

  function openAndStart(key) {
    // prefill the draft with the selected category and open the document form
    const draft = { narrative: '', categories: [key], platform: '' }
    if (setData) setData(draft)
    onStart()
  }

  return (
    <div className="card large-card home-root interactive-home">
      <header className="home-header">
        <h2>You are not alone</h2>
        <p className="lead">CyberShield is a secure, private tool designed to empower you in the face of online harassment. We provide a survivor-centered space to take control of your experience.</p>
      </header>

      <section className="intro-grid">
        <div className="intro-card">
          <div className="intro-icon">🔒</div>
          <h4>Private & Secure Documentation</h4>
          <p>Your safety is our priority. Document incidents in your own words—with or without evidence—in a completely confidential space.</p>
        </div>
        <div className="intro-card">
          <div className="intro-icon">🧭</div>
          <h4>Personalized Action Guidance</h4>
          <p>Receive clear, practical steps tailored to your specific situation and platform.</p>
        </div>
        <div className="intro-card">
          <div className="intro-icon">🗂️</div>
          <h4>Control Your Records</h4>
          <p>Choose to download a one-time PDF or save encrypted records to your device.</p>
        </div>
      </section>

      <section className="attack-identifier">
        <h3>🛡️ The Attack Identifier</h3>
        <p className="form-help">Click any shield to reveal a quick definition, examples, and immediate tips.</p>
        <div className="attack-grid">
          {attacks.map(a => (
            <button key={a.key} className={`attack-card ${selected===a.key? 'active':''}`} onClick={() => setSelected(selected===a.key? null : a.key)}>
              <div className="attack-icon">{a.icon}</div>
              <div className="attack-title">{a.title}</div>
            </button>
          ))}
        </div>

        {selected && (
          <div className="attack-details card">
            {(() => {
              const info = attacks.find(x => x.key === selected)
              return (
                <>
                  <h4>{info.icon} {info.title}</h4>
                  <p>{info.short}</p>
                  {info.causes && (
                    <>
                      <h4>How this can happen</h4>
                      <ul>
                        {info.causes.map((c, i) => <li key={i}>{c}</li>)}
                      </ul>
                    </>
                  )}
                  <div className="actions">
                    <button onClick={() => openAndStart(selected)}>Start Documenting this</button>
                    <button onClick={() => setSelected(null)}>Close</button>
                  </div>
                </>
              )
            })()}
          </div>
        )}
      </section>

      <section className="interactive-bottom">
        <div className="quick-reference">
          <h4>Quick Reference Cards</h4>
          <div className="quick-cards">
            <div className="quick-card">
              <h5>Facing Doxing?</h5>
              <ul>
                <li>DON'T engage</li>
                <li>DO document & report</li>
                <li>CONTACT: WithoutMyConsent.org</li>
              </ul>
            </div>
            <div className="quick-card">
              <h5>Received Cyber Flashing?</h5>
              <ul>
                <li>DO report</li>
                <li>DO save screenshots</li>
                <li>REMEMBER: You're not at fault</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="find-match">
          <h4>Find Your Match</h4>
          <p className="form-help">Not sure what happened? Below are short example scenarios — these are illustrative examples rather than primary action buttons. Tap any example to start documenting.</p>
          <div className="example-grid">
            <div className="example-card" onClick={() => openAndStart('Doxing')} role="button" tabIndex={0} onKeyDown={(e)=>{ if(e.key==='Enter') openAndStart('Doxing') }}>
              <div className="example-title">Private info was shared</div>
              <div className="example-sub">→ Doxing</div>
            </div>
            <div className="example-card" onClick={() => openAndStart('Sextortion')} role="button" tabIndex={0} onKeyDown={(e)=>{ if(e.key==='Enter') openAndStart('Sextortion') }}>
              <div className="example-title">Intimate images involved</div>
              <div className="example-sub">→ Sextortion</div>
            </div>
            <div className="example-card" onClick={() => openAndStart('Identity theft / Impersonation')} role="button" tabIndex={0} onKeyDown={(e)=>{ if(e.key==='Enter') openAndStart('Identity theft / Impersonation') }}>
              <div className="example-title">Someone pretending to be me</div>
              <div className="example-sub">→ Impersonation</div>
            </div>
          </div>
        </div>
      </section>

      <div className="home-cta actions">
        <button onClick={() => { setSelected(null); onStart() }}>Start Documenting — Take the first step</button>
      </div>
    </div>
  )
}

function DocumentForm({ data, setData, onNext }) {
  // keep a local copy while editing, then commit
  const [local, setLocal] = React.useState(data)
  React.useEffect(() => setLocal(data), [data])

  function onFileChange(e) {
    const files = Array.from(e.target.files)
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = (ev) => {
        setLocal(prev => ({ ...prev, evidence: [...(prev.evidence||[]), { name: file.name, dataUrl: ev.target.result }] }))
      }
      reader.readAsDataURL(file)
    })
  }

  function toggleCategory(cat) {
    setLocal(prev => ({
      ...prev,
      categories: prev.categories && prev.categories.includes(cat) ? prev.categories.filter(c => c !== cat) : [...(prev.categories||[]), cat]
    }))
  }

  function saveAndNext() {
    setData(local)
    onNext()
  }

  return (
    <div className="card large-card document-form">
      <div className="document-hero">
        <div className="hero-icon">📝</div>
        <div>
          <h2>Document the Experience</h2>
          <p className="form-welcome">You're doing an important thing — documenting details helps you preserve an accurate record. Only include what you feel safe sharing.</p>
        </div>
      </div>

      <div className="field-group">
        <label className="field-label">1. What happened? (Your narrative)</label>
        <textarea className="large-input" value={local.narrative || ''} onChange={e => setLocal({ ...local, narrative: e.target.value })} placeholder="e.g., I received threatening messages from @badactor on 2025-11-30 at 9pm..." />
        <div className="field-help">Include dates, times, usernames, and exact messages where possible.</div>
      </div>

      <div className="field-group">
        <label className="field-label">2. Type of online abuse (Select all that apply)</label>
        <div className="checkbox-grid">
          {['Cyber flashing','Cyber stalking','Digital voyeurism','Doxing','Gender-based hate speech','Identity theft / Impersonation','Morphing / Transmogrification','Non-consensual dissemination','Online grooming','Online sexual harassment & bullying','Online threats & blackmail','Sextortion','Sexploitation','Zoom bombing','Other'].map(cat => (
            <label key={cat} className="checkbox-pill">
              <input type="checkbox" checked={(local.categories||[]).includes(cat)} onChange={() => toggleCategory(cat)} />
              <span>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="field-group">
        <label className="field-label">3. Where it happened (Select primary platform)</label>
        <select className="platform-select" value={local.platform || ''} onChange={e => setLocal({ ...local, platform: e.target.value })}>
          <option value="">-- select --</option>
          <option>Facebook</option>
          <option>Instagram</option>
          <option>WhatsApp</option>
          <option>X (Twitter)</option>
          <option>TikTok</option>
          <option>Snapchat</option>
          <option>Discord</option>
          <option>Gaming platform</option>
          <option>Email</option>
          <option>Dating app</option>
          <option>Other</option>
        </select>

        {local.platform === 'Other' && (
          <input className="small-input" type="text" value={local.platformOther || ''} onChange={e => setLocal({ ...local, platformOther: e.target.value })} placeholder="Describe the platform (e.g., private forum)" />
        )}
      </div>

      <div className="field-group">
        <label className="field-label">4. Optional evidence (screenshots, files)</label>
        <div className="field-help">You are not required to upload anything. Text documentation is valid. If you do upload, keep copies in a secure place.</div>
        <input className="file-input" type="file" multiple onChange={onFileChange} />

        <div className="evidence-list">
          {(local.evidence||[]).map((ev, i) => (
            <div key={i} className="evidence-item">{ev.name}</div>
          ))}
        </div>
      </div>

      <div className="actions" style={{justifyContent: 'center'}}>
        <button className="primary-large" onClick={saveAndNext}>Review & Next</button>
      </div>
    </div>
  )
}

function Guidance({ data, onNext, onBack }) {
  // Get personalized guidance based on user's selections
  const guidance = getPersonalizedGuidance(data.categories, data.platform)
  const abuseList = guidance.abusesAffected.join(' & ')
  const platform = data.platform || 'an unknown platform'

  return (
    <div className="card large-card">
      <h2>Your Personalized Action Plan</h2>
      <p>Based on your report of <strong>{abuseList}</strong> on <strong>{platform}</strong>, here are tailored steps to consider. You choose what feels right for you.</p>

      {guidance.platformHelp && (
        <div className="guidance-section">
          <h3>Platform-specific steps for {guidance.platformHelp.name}</h3>
          <ul>
            {guidance.platformHelp.steps.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
          {guidance.platformHelp.note && <p style={{marginTop:8,color:'#444'}}>{guidance.platformHelp.note}</p>}
        </div>
      )}

      {Object.entries(guidance.sections).map(([categoryKey, sections]) => (
        <div key={categoryKey} className="guidance-section">
          {categoryKey !== 'generic' && <h3>For {categoryKey}</h3>}
          
          {sections.immediate && (
            <>
              <h4>1. Immediate Actions</h4>
              <ul>
                {sections.immediate.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </>
          )}

          {sections.platformAction && (
            <>
              <h4>2. Report to the Platform</h4>
              <p>{sections.platformAction}</p>
            </>
          )}

          {sections.evidence && (
            <>
              <h4>3. Document & Preserve Evidence</h4>
              <p>{sections.evidence}</p>
            </>
          )}

          {sections.support && (
            <>
              <h4>4. Seek Support</h4>
              <p>{sections.support}</p>
            </>
          )}
        </div>
      ))}

      <div className="guidance-final-note">
        <p><strong>Remember:</strong> You are not alone. This documentation is for you—to help you take control and make informed choices. Share it with trusted people, law enforcement, or legal counsel as you see fit.</p>
      </div>

      <div className="actions">
        <button onClick={onBack}>Back</button>
        <button onClick={onNext}>Proceed to Download / Save</button>
      </div>
    </div>
  )
}

function Review({ data, onDownload, onSaveLocal, onBack }) {
  return (
    <div className="card large-card review-container">
      <div className="review-header">
        <div className="review-icon">✓</div>
        <h2>Review Your Documentation</h2>
        <p className="review-subtitle">Here's what you're about to save or export. Make sure everything looks right.</p>
      </div>

      <div className="review-section">
        <div className="review-field">
          <label className="review-label">📝 Your Narrative</label>
          <p className="review-value narrative">{data.narrative || '(none)'}</p>
        </div>
      </div>

      <div className="review-grid">
        <div className="review-section">
          <div className="review-field">
            <label className="review-label">🏷️ Type of Abuse</label>
            <div className="review-tags">
              {(data.categories || []).length > 0 ? (
                (data.categories || []).map((cat, i) => (
                  <span key={i} className="review-tag">{cat}</span>
                ))
              ) : (
                <p className="review-value">(none)</p>
              )}
            </div>
          </div>
        </div>

        <div className="review-section">
          <div className="review-field">
            <label className="review-label">🌐 Platform</label>
            <p className="review-value">{data.platform || '(none)'}</p>
          </div>
        </div>
      </div>

      <div className="review-section">
        <div className="review-field">
          <label className="review-label">📎 Evidence Attached</label>
          <div className="review-evidence">
            {(data.evidence || []).length > 0 ? (
              <ul className="evidence-list-review">
                {(data.evidence || []).map((e, i) => (
                  <li key={i} className="evidence-item-review">
                    <span className="evidence-icon">📄</span>
                    {e.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="review-value">(no files attached)</p>
            )}
          </div>
        </div>
      </div>

      <div className="review-actions">
        <button className="review-btn-back" onClick={onBack}>← Back to Edit</button>
        <button className="review-btn-primary" onClick={() => onDownload(data)}>⬇️ Download PDF</button>
        <button className="review-btn-save" onClick={() => onSaveLocal(data)}>💾 Save Encrypted</button>
      </div>
    </div>
  )
}

function MyRecords({ onBack, refreshSavedCount, setStep, setData }) {
  const [wrappers, setWrappers] = React.useState(() => JSON.parse(localStorage.getItem('cybershield-saved-encrypted') || '[]'))
  const [records, setRecords] = React.useState([])

  // Auto-derive the same browser-based key used for encryption
  React.useEffect(() => {
    async function load() {
      const w = JSON.parse(localStorage.getItem('cybershield-saved-encrypted') || '[]')
      setWrappers(w)
      
      // Generate a consistent browser-based key for decryption
      const browserSalt = localStorage.getItem('cybershield-browser-salt')
      let cryptoKey = null
      if (browserSalt) {
        try {
          cryptoKey = await deriveKey('browser-local-default', browserSalt)
        } catch (e) {
          console.error('Failed to derive decryption key:', e)
        }
      }

      const acc = []
      for (const item of w) {
        try {
          const plain = cryptoKey ? await decryptObject(item.encrypted, cryptoKey) : null
          acc.push({ id: item.id, createdAt: item.createdAt, plain: plain || { narrative: '(encrypted)', categories: [], platform: '' } })
        } catch (e) {
          acc.push({ id: item.id, createdAt: item.createdAt, plain: { narrative: '(encrypted)', categories: [], platform: '' } })
        }
      }
      setRecords(acc)
    }
    load()
  }, [refreshSavedCount])

  function deleteRecord(id) {
    const next = wrappers.filter(w => w.id !== id)
    setWrappers(next)
    localStorage.setItem('cybershield-saved-encrypted', JSON.stringify(next))
    setRecords(prev => prev.filter(r => r.id !== id))
    if (refreshSavedCount) refreshSavedCount()
  }

  return (
    <div className="card large-card">
      <h2>My Records</h2>
      {records.length === 0 ? <p>(no saved records)</p> : (
        <ul>
          {records.map(r => (
            <li key={r.id} className="record-item">
              <div><strong>{new Date(r.createdAt).toLocaleString()}</strong></div>
              <div>{(r.plain.narrative || '').slice(0,200)}{(r.plain.narrative||'').length>200? '...':''}</div>
              <div className="record-actions">
                <button onClick={() => {
                  generatePDF(r.plain)
                }}>Export PDF</button>
                <button onClick={() => {
                  // load record into editor
                  if (setData && setStep) {
                    setData(r.plain)
                    setStep(1)
                  }
                }}>Edit</button>
                <button onClick={() => deleteRecord(r.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="actions"><button onClick={onBack}>Back</button></div>
    </div>
  )
}

export default function MultiStepForm({ step, setStep, data, setData, refreshSavedCount }) {
  const [showSuccessModal, setShowSuccessModal] = React.useState(false)
  const [isUpdate, setIsUpdate] = React.useState(false)

  function start() { setStep(1) }

  function next() { setStep(s => s + 1) }

  async function handleDownload(d) {
    await generatePDF(d)
    // clear session draft after download to honor "session-only" behavior
    sessionStorage.removeItem('cybershield-draft-session')
    setData({ narrative: '', categories: [], platform: '', evidence: [] })
    setStep(0)
  }

  async function handleSaveLocal(d) {
    try {
      // Initialize browser-based encryption on first save
      let browserSalt = localStorage.getItem('cybershield-browser-salt')
      if (!browserSalt) {
        browserSalt = await generateSalt()
        localStorage.setItem('cybershield-browser-salt', browserSalt)
      }

      // Derive a consistent key from browser salt + a default passphrase
      const cryptoKey = await deriveKey('browser-local-default', browserSalt)

      // Create and encrypt record
      const now = new Date().toISOString()
      const record = { id: d.id || Date.now(), createdAt: d.createdAt || now, updatedAt: d.id ? now : undefined, ...d }
      
      const encrypted = await encryptObject(record, cryptoKey)
      const wrapper = { id: record.id, createdAt: record.createdAt, encrypted }
      
      const stored = JSON.parse(localStorage.getItem('cybershield-saved-encrypted') || '[]')
      const idx = stored.findIndex(s => s.id === record.id)
      
      if (idx >= 0) {
        stored[idx] = wrapper
      } else {
        stored.push(wrapper)
      }
      
      localStorage.setItem('cybershield-saved-encrypted', JSON.stringify(stored))
      if (refreshSavedCount) refreshSavedCount()
      
      // Show success modal instead of alert
      setIsUpdate(!!d.id)
      setShowSuccessModal(true)
    } catch (e) {
      console.error(e)
      alert('Failed to encrypt and save the record.')
    }
  }

  function closeSuccessModal() {
    setShowSuccessModal(false)
    setStep(0)
  }

  if (step === 0) return <Home onStart={start} setData={setData} />
  if (step === 1) return <DocumentForm data={data} setData={setData} onNext={next} />
  if (step === 2) return <Guidance data={data} onNext={next} onBack={() => setStep(1)} />
  if (step === 3) return (
    <>
      <Review data={data} onDownload={handleDownload} onSaveLocal={handleSaveLocal} onBack={() => setStep(0)} />
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="success-modal">
            <div className="success-icon">✓</div>
            <h2>Record Saved Successfully!</h2>
            <p className="success-message">
              Your documentation has been encrypted and saved to your browser. You can find it anytime in the <strong>My Records</strong> page.
            </p>
            <div className="success-details">
              <p>From there, you can:</p>
              <ul>
                <li><strong>Edit</strong> — Make changes to your documentation</li>
                <li><strong>Export PDF</strong> — Download a copy to share or keep safe</li>
                <li><strong>Delete</strong> — Remove the record if you no longer need it</li>
              </ul>
            </div>
            <button className="success-btn" onClick={closeSuccessModal}>OK, Got It</button>
          </div>
        </div>
      )}
    </>
  )
  if (step === 4) return <MyRecords onBack={() => setStep(0)} refreshSavedCount={refreshSavedCount} setStep={setStep} setData={setData} />
  return null
}
