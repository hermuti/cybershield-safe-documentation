import React, { useState, useEffect } from 'react'
import MultiStepForm from './components/MultiStepForm'
import Layout from './components/Layout'

export default function App() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState(() => {
    try {
      const raw = sessionStorage.getItem('cybershield-draft-session')
      return raw ? JSON.parse(raw) : { narrative: '', categories: [], platform: '', evidence: [] }
    } catch { return { narrative: '', categories: [], platform: '', evidence: [] } }
  })

  const [savedCount, setSavedCount] = useState(0)

  useEffect(() => {
    // keep draft only for the session; clears on browser/tab close
    sessionStorage.setItem('cybershield-draft-session', JSON.stringify(data))
  }, [data])

  useEffect(() => {
    // count saved records from localStorage
    const stored = JSON.parse(localStorage.getItem('cybershield-saved-encrypted') || '[]')
    setSavedCount(stored.length)
  }, [step])

  return (
    <Layout step={step} setStep={setStep} savedCount={savedCount}>
      <MultiStepForm
        step={step}
        setStep={setStep}
        data={data}
        setData={setData}
        refreshSavedCount={() => {
          const stored = JSON.parse(localStorage.getItem('cybershield-saved-encrypted') || '[]')
          setSavedCount(stored.length)
        }}
      />
    </Layout>
  )
}
