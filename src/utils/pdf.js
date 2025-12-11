import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { getPersonalizedGuidance } from './guidanceDatabase'

function shortSessionId() {
  // simple anonymized code: base36 timestamp + random
  return (Date.now().toString(36) + Math.random().toString(36).slice(2,8)).toUpperCase()
}

function addWrappedText(doc, text, x, y, maxWidth, lineHeight) {
  const safe = sanitizeText(String(text || '(none)'))
  const split = doc.splitTextToSize(safe, maxWidth)
  doc.text(split, x, y)
  return split.length * lineHeight
}

function sanitizeText(s) {
  // Replace common emoji and fancy quotes with ASCII-friendly text
  const map = {
    '\u2018': "'", '\u2019': "'", '\u201C': '"', '\u201D': '"', '\u2013': '-', '\u2014': '-',
    '🔒': '[LOCK]', '📁': '[FILES]', '🤝': '[SUPPORT]'
  }
  let out = s.replace(/[\u2018\u2019\u201C\u201D\u2013\u2014]/g, m => map[m] || "'")
  // replace some emojis explicitly
  out = out.replace(/\uD83D\uDD12/g, '[LOCK]')
  out = out.replace(/\uD83D\uDCC1/g, '[FOLDER]')
  out = out.replace(/\uD83E\uDDE1/g, '[HEART]')
  // remove any remaining non-printable/control chars
  out = out.replace(/[^\x09\x0A\x0D\x20-\x7E\u00A0-\u00FF]/g, '')
  return out
}

export async function generatePDF(data) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const margin = 40
  const pageWidth = 595
  const usable = pageWidth - margin * 2
  let y = 40
  let usedSnapshot = false

  const generatedAt = new Date()
  const timestamp = generatedAt.toLocaleString()
  const sessionId = data.id ? String(data.id) : shortSessionId()

  // We'll render the full document as an HTML snapshot below to preserve layout and avoid font issues.
  // The off-screen container will include header, Part 1, Part 2 and Part 3.

  // Part 2: Personalized Action Plan
  const guidance = getPersonalizedGuidance(data.categories, data.platform)
  const abuseList = guidance.abusesAffected.join(' & ')
  const platform = data.platform || 'an unknown platform'

  try {

    const canUseHtmlCanvas = (typeof window !== 'undefined' && typeof document !== 'undefined' && typeof html2canvas === 'function')
    if (canUseHtmlCanvas) {
      // create offscreen container
      const container = document.createElement('div')
      // jsPDF uses points (pt). Convert pts -> CSS px for a more accurate render.
      const cssPxPerPt = 96 / 72
      container.style.width = `${Math.round(usable * cssPxPerPt)}px`
      container.style.padding = '12px'
      container.style.fontFamily = 'Segoe UI, Arial, Helvetica, sans-serif'
      container.style.background = '#fff'
      container.style.color = '#111'
      container.style.boxSizing = 'border-box'
      container.style.fontSize = '11px'

      function addEl(tag, text, cls) {
        const el = document.createElement(tag)
        el.style.margin = '6px 0'
        if (cls) el.className = cls
        if (tag === 'h1') { el.style.fontSize = '16px'; el.style.fontWeight = '700' }
        if (tag === 'h2') { el.style.fontSize = '13px'; el.style.fontWeight = '600' }
        if (tag === 'h3') { el.style.fontSize = '12px'; el.style.fontWeight = '600' }
        if (tag === 'p') { el.style.fontSize = '11px'; el.style.margin = '4px 0' }
        if (typeof text === 'string') el.textContent = text
        else if (text instanceof Node) el.appendChild(text)
        container.appendChild(el)
        return el
      }

      // Build full 3-part English document to match user's requested template
      // Header
      addEl('h1', 'CyberShield - Documentation & Action Plan')
      addEl('p', `Confidential | Generated: ${timestamp}`)

      // Part 1
      addEl('h2', 'Part 1: Your Documented Experience')
      addEl('p', `Narrative: "${data.narrative || ''}"`)
      addEl('p', `Type of Abuse: ${ (data.categories || []).join(', ') || '(none)' }`)
      addEl('p', `Platform: ${data.platform || '(none)'}`)
      addEl('p', `Evidence Attached: ${ (data.evidence || []).map(e=>e.name).join(', ') || '(none)' }`)
      addEl('p', `Session ID: ${sessionId}`)

      // Part 2 (use the exact English recommendation structure requested)
      addEl('h2', 'Part 2: Your Personalized Action Plan')
      addEl('p', `Based on your report of ${abuseList} on ${platform}, here are your recommended steps:`)

      addEl('h3', '\uD83D\uDD12  1. Immediate Safety & Platform Actions')
      addEl('p', 'Report on Instagram: Use the report feature on the specific post/comment. Select “Hate Speech” > “Based on gender identity.”')
      addEl('p', 'Block & Restrict: Block the accounts harassing you. Use “Restrict” to limit their visibility without triggering confrontation.')
      addEl('p', 'Adjust Privacy Settings: Set your account to “Private” temporarily to control who can see your content.')

      addEl('h3', '\uD83D\uDCC1  2. Evidence Preservation')
      addEl('p', 'Screenshot Everything: Capture the hate speech, URLs, and perpetrator profiles.')
      addEl('p', 'Secure This PDF: This document is your timestamped personal record.')

      addEl('h3', '\uD83E\uDDE3  3. Support & Next Steps')
      addEl('p', 'Emotional Support: Consider reaching out to a trusted friend or counselor.')
      addEl('p', 'Specialist Organizations: Contact HeartMob or Ditch the Label for community support against online hate.')
      addEl('p', 'Legal Options: In many regions, targeted gender-based hate speech may violate discrimination laws.')

      // render to canvas
      document.body.appendChild(container)
      const canvas = await html2canvas(container, { scale: 2, useCORS: true })
      document.body.removeChild(container)

      const imgData = canvas.toDataURL('image/png')
      // Compute image size in PDF points (pt). canvas.width/height are in CSS px.
      const pageW = doc.internal.pageSize.getWidth()
      const pageH = doc.internal.pageSize.getHeight()
      const imgW = usable
      // canvas dimensions are in px; the ratio (canvas.height/canvas.width) is unitless.
      let imgH = (canvas.height * imgW) / canvas.width
      // Ensure the image fits within printable page height (scale down if needed)
      const maxImgH = pageH - margin * 2
      if (imgH > maxImgH) {
        const scaleDown = maxImgH / imgH
        imgH = imgH * scaleDown
        // adjust width proportionally
        var adjImgW = imgW * scaleDown
        // center smaller image by using adjusted width
        doc.addImage(imgData, 'PNG', margin, y, adjImgW, imgH)
        y += imgH + 10
      } else {
        doc.addImage(imgData, 'PNG', margin, y, imgW, imgH)
        y += imgH + 10
      }
      usedSnapshot = true
    } else {
      // fallback to text-only rendering when html2canvas not available
      const guidance = getPersonalizedGuidance(data.categories, data.platform)
      const abuseList = guidance.abusesAffected.join(' & ')
      const platform = data.platform || 'an unknown platform'
      y += addWrappedText(doc, `Based on your report of ${abuseList} on ${platform}, here are your recommended steps:`, margin, y, usable, 12)
      y += 8
      if (guidance.platformHelp) {
        doc.setFont(undefined, 'bold')
        doc.text('Platform-specific steps', margin, y)
        y += 14
        doc.setFont(undefined, 'normal')
        for (const step of guidance.platformHelp.steps) {
          y += addWrappedText(doc, `• ${step}`, margin + 8, y, usable - 8, 12)
          y += 6
        }
        y += 4
      }
    }
  } catch (err) {
    console.error('generatePDF error', err)
    // create a minimal PDF page describing the error so user still gets a file
    y += 8
    doc.setFont(undefined, 'bold')
    doc.text('Note: PDF generation encountered an issue while rendering platform guidance.', margin, y)
    y += 18
  }

  // Part 3: Important Resources
  if (!usedSnapshot) {
    doc.setFont(undefined, 'bold')
    doc.setFontSize(13)
    doc.text('Part 3: Important Resources', margin, y)
    y += 16
    doc.setFontSize(11)
    doc.setFont(undefined, 'normal')
    // If platformHelp has a note, include it
    if (guidance.platformHelp && guidance.platformHelp.note) {
      y += addWrappedText(doc, guidance.platformHelp.note, margin, y, usable, 12)
      y += 8
    }

    // Static common resources (some placeholders)
    y += addWrappedText(doc, 'Crisis Support Text Line: Text HOME to 741741', margin, y, usable, 12)
    y += 8
    y += addWrappedText(doc, 'Note: This document is for your personal records. CyberShield does not store this information after your session ends unless you created an account.', margin, y, usable, 12)
    y += 16
  } else {
    // If we used the image snapshot, avoid re-writing the same Part 3 text.
    // Leave a small gap before evidence images so the layout isn't cramped.
    y += 10
  }

  // Insert evidence images at end (one per page if needed)
  for (const ev of data.evidence || []) {
    if (y > 520) { doc.addPage(); y = 40 }
    // If the HTML snapshot already listed evidence names, avoid writing the name again.
    if (!usedSnapshot) {
      doc.setFont(undefined, 'bold')
      doc.text('Evidence: ' + ev.name, margin, y)
      y += 8
    } else {
      // keep a small spacer before the image
      y += 6
    }
    try {
      const img = new Image()
      img.src = ev.dataUrl
      await new Promise((res) => { img.onload = res; img.onerror = res })
      const maxW = usable
      const ratio = img.width ? Math.min(1, maxW / img.width) : 1
      const imgW = img.width * ratio
      const imgH = img.height * ratio
      if (y + imgH > 780) { doc.addPage(); y = 40 }
      doc.addImage(ev.dataUrl, 'JPEG', margin, y, imgW, imgH)
      y += imgH + 10
    } catch (e) {
      y += 10
    }
  }

  const filename = `cybershield-${generatedAt.toISOString().slice(0,19).replace(/[:T]/g,'-')}.pdf`
  doc.save(filename)
}
