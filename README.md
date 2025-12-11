# CyberShield – Safe Online Documentation Platform

A survivor-centered web platform that helps individuals experiencing online harassment
document their experiences safely, receive guidance, and optionally track incidents over time
— without forcing login or action.

---

## 🌐 What This Platform Does

CyberShield provides a private and respectful digital space where users can:

- Document online harassment or abuse in their own words
- Categorize the type of digital abuse experienced
- Upload optional supporting evidence (screenshots, files)
- Receive guidance tailored to the type of abuse and platform involved
- Export their documentation as a PDF
- Optionally create an account to track multiple incidents over time

No login is required to use the core features.

---

## 🛡️ Design Principles

- **Survivor-first**: user control, no forced actions
- **Privacy by design**: no required login, minimal data collection
- **Ethical technology**: no surveillance, no tracking, no public exposure
- **Accessibility**: simple language and low emotional barrier

---

## 🔄 User Flow (High-Level)

---

## 🧭 Page-by-Page Experience

### 🟦 Page 1: Home / Safe Entry
- “You are not alone” message
- Clear explanation of purpose
- Privacy and anonymity assurance
- Emergency disclaimer
- Start button

---

### 🟦 Page 2: Document Experience
Step-based form:
1. What happened? (free-text, survivor narrative)
2. Type of online abuse (multi-select)
3. Where it happened (platform selection)
4. Optional evidence upload
5. Review and confirm

No screenshots are required — emotional or psychological abuse can be documented in text.

---

### 🟦 Page 3: Guidance & User Choices
Automatically generated guidance based on:
- Type of abuse
- Platform involved

Users are presented with **options**, not instructions:
- Digital safety steps
- Platform reporting guidance
- Suggestions for documentation or support

---

### 🟦 Critical Choice Point
After guidance, users can choose:

**Option A: Download Documentation (PDF)**
- No login
- One-time export
- Session data deleted afterward

**Option B: Save & Track Over Time**
- Optional account creation
- Enables tracking multiple incidents or cases

---

### 🟦 Page 4: Optional Login
Login is only required if the user wants to:
- Save reports
- Track repeated incidents
- Maintain timelines

---

### 🟦 Page 5: My Records Dashboard (Logged-in Users Only)
**in order to : Save & Track Over Time**
- Optional account creation
- Enables tracking multiple incidents or cases

Users can:
- Add incidents
- Export case PDFs
- Delete records permanently

---

## 📄 PDF Export

Two supported documentation modes:

- **Session PDF**: Generated immediately after guidance without login
- **Case PDF**: Exported from stored records (logged-in users)

PDFs include:
- Abuse category
- User description
- Timeline
- Platform details
- Uploaded evidence (if any)

No personal identity data is included.

---

## 🔐 Privacy & Safety

- No mandatory login
- No user tracking
- Session-only mode supported
- Users can delete stored data at any time
- Honest disclosure of technical limitations

This tool does not replace emergency, legal, or law enforcement services.

---

## 🚀 Future Improvements

- Localization and multi-language support
- Expanded educational resources
- Integration with survivor support organizations
- Accessibility improvements

---

## Getting Started (Developer)

This repository contains a minimal, privacy-first frontend implementation that implements the core
flows described above: a step-based documentation form, optional evidence upload, guidance, and
client-side PDF export. The implementation is intentionally frontend-only so core features work
without an account or server.

Prerequisites:
- Node.js (16+ recommended) and `npm` installed.

Install dependencies and run the dev server (Windows `cmd.exe`):

```
cd `c:\Users\Admin\repos\cybershield-safe-documentation`
npm install
npm run dev
```

Open the URL reported by Vite (usually `http://localhost:5173`).

Notes:
- PDF export uses client-side libraries (`jsPDF`) and will include uploaded images when possible.
- Saved records are stored locally in the browser's `localStorage` (no server, no tracking).
- To add backend-powered account features, we can scaffold a small API next.



