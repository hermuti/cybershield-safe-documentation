import React from "react";
import { generatePDF } from "../utils/pdf";
import {
  encryptObject,
  decryptObject,
  deriveKey,
  generateSalt,
} from "../utils/crypto";
import { getPersonalizedGuidance } from "../utils/guidanceDatabase";
import { useTranslation } from "../i18n.jsx";

function Home({ onStart, setData }) {
  const { t } = useTranslation();
  const attacks = [
    { id: "cyber_flashing", key: "Cyber flashing", icon: "🔥" },
    { id: "digital_voyeurism", key: "Digital voyeurism", icon: "👁️" },
    {
      id: "morphing_transmogrification",
      key: "Morphing / Transmogrification",
      icon: "🎭",
    },
    {
      id: "non_consenting_dissemination",
      key: "Non-consensual dissemination",
      icon: "📸",
    },
    { id: "sexploitation", key: "Sexploitation", icon: "💀" },
    { id: "cyber_stalking", key: "Cyber stalking", icon: "🐺" },
    { id: "doxing", key: "Doxing", icon: "📍" },
    {
      id: "gender_based_hate_speech",
      key: "Gender-based hate speech",
      icon: "☠️",
    },
    {
      id: "online_sexual_harassment_bullying",
      key: "Online sexual harassment & bullying",
      icon: "😈",
    },
    {
      id: "online_threats_blackmail",
      key: "Online threats & blackmail",
      icon: "⚡",
    },
    { id: "sextortion", key: "Sextortion", icon: "🔐" },
    {
      id: "identity_theft_impersonation",
      key: "Identity theft / Impersonation",
      icon: "🎭",
    },
    { id: "online_grooming", key: "Online grooming", icon: "🎣" },
    { id: "zoom_bombing", key: "Zoom bombing", icon: "💥" },
  ];

  const [selected, setSelected] = React.useState(null);

  function openAndStart(key) {
    // prefill the draft with the selected category and open the document form
    const draft = { narrative: "", categories: [key], platform: "" };
    if (setData) setData(draft);
    onStart();
  }

  return (
    <div className="card large-card home-root interactive-home">
      <header className="home-header">
        <h2>{t("home.title")}</h2>
        <p className="lead">{t("home.lead")}</p>
      </header>

      <section className="intro-grid">
        <div className="intro-card">
          <div className="intro-icon">🔒</div>
          <h4>{t("home.intro.card1.title")}</h4>
          <p>{t("home.intro.card1.desc")}</p>
        </div>
        <div className="intro-card">
          <div className="intro-icon">🧭</div>
          <h4>{t("home.intro.card2.title")}</h4>
          <p>{t("home.intro.card2.desc")}</p>
        </div>
        <div className="intro-card">
          <div className="intro-icon">🗂️</div>
          <h4>{t("home.intro.card3.title")}</h4>
          <p>{t("home.intro.card3.desc")}</p>
        </div>
      </section>

      <section className="attack-identifier">
        <h3>{t("home.attack_identifier_title")}</h3>
        <p className="form-help">{t("home.attack_help")}</p>
        <div className="attack-grid">
          {attacks.map((a) => (
            <button
              key={a.key}
              className={`attack-card ${selected === a.key ? "active" : ""}`}
              onClick={() => setSelected(selected === a.key ? null : a.key)}
            >
              <div className="attack-icon">{a.icon}</div>
              <div className="attack-title">{t(`attacks.${a.id}.title`)}</div>
            </button>
          ))}
        </div>

        {selected && (
          <div className="attack-details card">
            {(() => {
              const info = attacks.find((x) => x.key === selected);
              return (
                <>
                  <h4>
                    {info.icon} {t(`attacks.${info.id}.title`)}
                  </h4>
                  <p>{t(`attacks.${info.id}.short`)}</p>
                  {t(`attacks.${info.id}.causes`) && (
                    <>
                      <h4>{t("home.how_this_happens")}</h4>
                      <ul>
                        {t(`attacks.${info.id}.causes`).map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  <div className="actions">
                    <button onClick={() => openAndStart(selected)}>
                      {t("home.start_documenting_this")}
                    </button>
                    <button onClick={() => setSelected(null)}>
                      {t("home.close")}
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </section>

      <section className="interactive-bottom">
        <div className="find-match">
          <h4>{t("home.find_match.title")}</h4>
          <p className="form-help">{t("home.find_match.help")}</p>
          <div className="example-grid">
            <div
              className="example-card"
              onClick={() => openAndStart("Doxing")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") openAndStart("Doxing");
              }}
            >
              <div className="example-title">{t("examples.doxing.title")}</div>
              <div className="example-sub">{t("examples.doxing.sub")}</div>
            </div>
            <div
              className="example-card"
              onClick={() => openAndStart("Sextortion")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") openAndStart("Sextortion");
              }}
            >
              <div className="example-title">
                {t("examples.sextortion.title")}
              </div>
              <div className="example-sub">{t("examples.sextortion.sub")}</div>
            </div>
            <div
              className="example-card"
              onClick={() => openAndStart("Identity theft / Impersonation")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter")
                  openAndStart("Identity theft / Impersonation");
              }}
            >
              <div className="example-title">
                {t("examples.impersonation.title")}
              </div>
              <div className="example-sub">
                {t("examples.impersonation.sub")}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="home-cta actions">
        <button
          onClick={() => {
            setSelected(null);
            onStart();
          }}
        >
          {t("home.cta_start")}
        </button>
      </div>
    </div>
  );
}

function DocumentForm({ data, setData, onNext }) {
  // keep a local copy while editing, then commit
  const [local, setLocal] = React.useState(data);
  React.useEffect(() => setLocal(data), [data]);
  const { t } = useTranslation();

  function onFileChange(e) {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setLocal((prev) => ({
          ...prev,
          evidence: [
            ...(prev.evidence || []),
            { name: file.name, dataUrl: ev.target.result },
          ],
        }));
      };
      reader.readAsDataURL(file);
    });
  }

  function toggleCategory(cat) {
    setLocal((prev) => ({
      ...prev,
      categories:
        prev.categories && prev.categories.includes(cat)
          ? prev.categories.filter((c) => c !== cat)
          : [...(prev.categories || []), cat],
    }));
  }

  function saveAndNext() {
    setData(local);
    onNext();
  }

  return (
    <div className="card large-card document-form">
      <div className="document-hero">
        <div className="hero-icon">📝</div>
        <div>
          <h2>{t("document.title")}</h2>
          <p className="form-welcome">{t("document.welcome")}</p>
        </div>
      </div>

      <div className="field-group">
        <label className="field-label">{t("document.q1_label")}</label>
        <textarea
          className="large-input"
          value={local.narrative || ""}
          onChange={(e) => setLocal({ ...local, narrative: e.target.value })}
          placeholder="e.g., I received threatening messages from @badactor on 2025-11-30 at 9pm..."
        />
        <div className="field-help">{t("document.q1_help")}</div>
      </div>

      <div className="field-group">
        <label className="field-label">{t("document.q2_label")}</label>
        <div className="checkbox-grid">
          {(() => {
            const categoryKeys = [
              "Cyber flashing",
              "Cyber stalking",
              "Digital voyeurism",
              "Doxing",
              "Gender-based hate speech",
              "Identity theft / Impersonation",
              "Morphing / Transmogrification",
              "Non-consensual dissemination",
              "Online grooming",
              "Online sexual harassment & bullying",
              "Online threats & blackmail",
              "Sextortion",
              "Sexploitation",
              "Zoom bombing",
              "Other",
            ];

            function slugify(s) {
              return s
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "_")
                .replace(/^_|_$/g, "");
            }

            return categoryKeys.map((cat) => (
              <label key={cat} className="checkbox-pill">
                <input
                  type="checkbox"
                  checked={(local.categories || []).includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
                <span>{t(`categories.${slugify(cat)}`) || cat}</span>
              </label>
            ));
          })()}
        </div>
      </div>

      <div className="field-group">
        <label className="field-label">{t("document.q3_label")}</label>
        <select
          className="platform-select"
          value={local.platform || ""}
          onChange={(e) => setLocal({ ...local, platform: e.target.value })}
        >
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

        {local.platform === "Other" && (
          <input
            className="small-input"
            type="text"
            value={local.platformOther || ""}
            onChange={(e) =>
              setLocal({ ...local, platformOther: e.target.value })
            }
            placeholder="Describe the platform (e.g., private forum)"
          />
        )}
      </div>

      <div className="field-group">
        <label className="field-label">{t("document.q4_label")}</label>
        <div className="field-help">{t("document.q4_help")}</div>
        <input
          className="file-input"
          type="file"
          multiple
          onChange={onFileChange}
        />

        <div className="evidence-list">
          {(local.evidence || []).map((ev, i) => (
            <div key={i} className="evidence-item">
              {ev.name}
            </div>
          ))}
        </div>
      </div>

      <div className="actions" style={{ justifyContent: "center" }}>
        <button className="primary-large" onClick={saveAndNext}>
          {t("document.review_next")}
        </button>
      </div>
    </div>
  );
}

function Guidance({ data, onNext, onBack }) {
  // Get personalized guidance based on user's selections
  const { t, lang } = useTranslation();
  const guidance = getPersonalizedGuidance(data.categories, data.platform, lang);
  const platform = data.platform || (lang === "am" ? "አልታወቀ መድረክ" : "an unknown platform");
  // localize the abuse list (use category keys -> localized category labels)
  function slugify(s) {
    return String(s || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_|_$/g, "")
  }
  const abuseList = (guidance.abusesAffected || []).map((c) => {
    const key = slugify(c)
    const label = t(`categories.${key}`)
    return label || c
  }).join(" & ");

  return (
    <div className="card large-card">
      <h2>{t("guidance.title")}</h2>
      <p>
        {(() => {
          const tmpl = t("guidance.full")
          if (tmpl && tmpl.includes("{abuseList}")) {
            return tmpl.replace("{abuseList}", abuseList).replace("{platform}", platform)
          }
          return (
            <>
              {t("guidance.based_on")} <strong>{abuseList}</strong> {t("guidance.on_platform")} <strong>{platform}</strong>, {t("guidance.disclaimer")}
            </>
          )
        })()}
      </p>

      {guidance.platformHelp && (
        <div className="guidance-section">
          <h3>Platform-specific steps for {guidance.platformHelp.name}</h3>
          <ul>
            {guidance.platformHelp.steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
          {guidance.platformHelp.note && (
            <p style={{ marginTop: 8, color: "#444" }}>
              {guidance.platformHelp.note}
            </p>
          )}
        </div>
      )}

          {Object.entries(guidance.sections).map(([categoryKey, sections]) => (
            <div key={categoryKey} className="guidance-section">
              {categoryKey !== "generic" && (
                <h3>
                  {t("guidance.for_prefix")} {t(`categories.${categoryKey.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "")}`)}
                </h3>
              )}

          {sections.immediate && (
            <>
              <h4>{t("guidance.immediate_title")}</h4>
              <ul>
                {sections.immediate.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </>
          )}

          {sections.platformAction && (
            <>
              <h4>{t("guidance.report_title")}</h4>
              <p>{sections.platformAction}</p>
            </>
          )}

          {sections.evidence && (
            <>
              <h4>{t("guidance.evidence_title")}</h4>
              <p>{sections.evidence}</p>
            </>
          )}

          {sections.support && (
            <>
              <h4>{t("guidance.support_title")}</h4>
              <p>{sections.support}</p>
            </>
          )}
        </div>
      ))}

      <div className="guidance-final-note">
        <p>
          <strong>{t("guidance.remember_prefix")}</strong> {t("guidance.remember_note")}
        </p>
      </div>

      <div className="actions">
        <button onClick={onBack}>{t("nav.back")}</button>
        <button onClick={onNext}>{t("nav.proceed_save")}</button>
      </div>
    </div>
  );
}

function Review({ data, onDownload, onSaveLocal, onBack }) {
  const { t } = useTranslation();
  return (
    <div className="card large-card review-container">
      <div className="review-header">
        <div className="review-icon">✓</div>
        <h2>{t("review.title")}</h2>
        <p className="review-subtitle">{t("review.subtitle")}</p>
      </div>

      <div className="review-section">
        <div className="review-field">
          <label className="review-label">📝 Your Narrative</label>
          <p className="review-value narrative">
            {data.narrative || t("review.none")}
          </p>
        </div>
      </div>

      <div className="review-grid">
        <div className="review-section">
          <div className="review-field">
            <label className="review-label">🏷️ Type of Abuse</label>
            <div className="review-tags">
              {(data.categories || []).length > 0 ? (
                (data.categories || []).map((cat, i) => (
                  <span key={i} className="review-tag">
                    {cat}
                  </span>
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
            <p className="review-value">{data.platform || "(none)"}</p>
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
              <p className="review-value">{t("review.no_files")}</p>
            )}
          </div>
        </div>
      </div>

      <div className="review-actions">
        <button className="review-btn-back" onClick={onBack}>
          ← {t("nav.back")} to Edit
        </button>
        <button className="review-btn-primary" onClick={() => onDownload(data)}>
          {t("actions.download_pdf")}
        </button>
        <button className="review-btn-save" onClick={() => onSaveLocal(data)}>
          {t("actions.save_encrypted")}
        </button>
      </div>
    </div>
  );
}

function MyRecords({ onBack, refreshSavedCount, setStep, setData }) {
  const [wrappers, setWrappers] = React.useState(() =>
    JSON.parse(localStorage.getItem("cybershield-saved-encrypted") || "[]")
  );
  const [records, setRecords] = React.useState([]);
  const { t } = useTranslation();

  // Auto-derive the same browser-based key used for encryption
  React.useEffect(() => {
    async function load() {
      const w = JSON.parse(
        localStorage.getItem("cybershield-saved-encrypted") || "[]"
      );
      setWrappers(w);

      // Generate a consistent browser-based key for decryption
      const browserSalt = localStorage.getItem("cybershield-browser-salt");
      let cryptoKey = null;
      if (browserSalt) {
        try {
          cryptoKey = await deriveKey("browser-local-default", browserSalt);
        } catch (e) {
          console.error("Failed to derive decryption key:", e);
        }
      }

      const acc = [];
      for (const item of w) {
        try {
          const plain = cryptoKey
            ? await decryptObject(item.encrypted, cryptoKey)
            : null;
          acc.push({
            id: item.id,
            createdAt: item.createdAt,
            plain: plain || {
              narrative: "(encrypted)",
              categories: [],
              platform: "",
            },
          });
        } catch (e) {
          acc.push({
            id: item.id,
            createdAt: item.createdAt,
            plain: { narrative: "(encrypted)", categories: [], platform: "" },
          });
        }
      }
      setRecords(acc);
    }
    load();
  }, [refreshSavedCount]);

  function deleteRecord(id) {
    const next = wrappers.filter((w) => w.id !== id);
    setWrappers(next);
    localStorage.setItem("cybershield-saved-encrypted", JSON.stringify(next));
    setRecords((prev) => prev.filter((r) => r.id !== id));
    if (refreshSavedCount) refreshSavedCount();
  }

  return (
    <div className="card large-card">
      <h2>{t("records.title")}</h2>
      {records.length === 0 ? (
        <p>{t("records.empty")}</p>
      ) : (
        <ul>
          {records.map((r) => (
            <li key={r.id} className="record-item">
              <div>
                <strong>{new Date(r.createdAt).toLocaleString()}</strong>
              </div>
              <div>
                {(r.plain.narrative || "").slice(0, 200)}
                {(r.plain.narrative || "").length > 200 ? "..." : ""}
              </div>
              <div className="record-actions">
                <button
                  onClick={() => {
                    generatePDF(r.plain);
                  }}
                >
                  {t("common.export_pdf")}
                </button>
                <button
                  onClick={() => {
                    // load record into editor
                    if (setData && setStep) {
                      setData(r.plain);
                      setStep(1);
                    }
                  }}
                >
                  {t("common.edit")}
                </button>
                <button onClick={() => deleteRecord(r.id)}>
                  {t("common.delete")}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="actions">
        <button onClick={onBack}>Back</button>
      </div>
    </div>
  );
}

export default function MultiStepForm({
  step,
  setStep,
  data,
  setData,
  refreshSavedCount,
}) {
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [isUpdate, setIsUpdate] = React.useState(false);
  const { t } = useTranslation();

  function start() {
    setStep(1);
  }

  function next() {
    setStep((s) => s + 1);
  }

  async function handleDownload(d) {
    await generatePDF(d);
    // clear session draft after download to honor "session-only" behavior
    sessionStorage.removeItem("cybershield-draft-session");
    setData({ narrative: "", categories: [], platform: "", evidence: [] });
    setStep(0);
  }

  async function handleSaveLocal(d) {
    try {
      // Initialize browser-based encryption on first save
      let browserSalt = localStorage.getItem("cybershield-browser-salt");
      if (!browserSalt) {
        browserSalt = await generateSalt();
        localStorage.setItem("cybershield-browser-salt", browserSalt);
      }

      // Derive a consistent key from browser salt + a default passphrase
      const cryptoKey = await deriveKey("browser-local-default", browserSalt);

      // Create and encrypt record
      const now = new Date().toISOString();
      const record = {
        id: d.id || Date.now(),
        createdAt: d.createdAt || now,
        updatedAt: d.id ? now : undefined,
        ...d,
      };

      const encrypted = await encryptObject(record, cryptoKey);
      const wrapper = { id: record.id, createdAt: record.createdAt, encrypted };

      const stored = JSON.parse(
        localStorage.getItem("cybershield-saved-encrypted") || "[]"
      );
      const idx = stored.findIndex((s) => s.id === record.id);

      if (idx >= 0) {
        stored[idx] = wrapper;
      } else {
        stored.push(wrapper);
      }

      localStorage.setItem(
        "cybershield-saved-encrypted",
        JSON.stringify(stored)
      );
      if (refreshSavedCount) refreshSavedCount();

      // Show success modal instead of alert
      setIsUpdate(!!d.id);
      setShowSuccessModal(true);
    } catch (e) {
      console.error(e);
      alert("Failed to encrypt and save the record.");
    }
  }

  function closeSuccessModal() {
    setShowSuccessModal(false);
    setStep(0);
  }

  if (step === 0) return <Home onStart={start} setData={setData} />;
  if (step === 1)
    return <DocumentForm data={data} setData={setData} onNext={next} />;
  if (step === 2)
    return <Guidance data={data} onNext={next} onBack={() => setStep(1)} />;
  if (step === 3)
    return (
      <>
        <Review
          data={data}
          onDownload={handleDownload}
          onSaveLocal={handleSaveLocal}
          onBack={() => setStep(0)}
        />
        {showSuccessModal && (
          <div className="modal-overlay">
            <div className="success-modal">
              <div className="success-icon">✓</div>
              <h2>{t("saved.title")}</h2>
              <p className="success-message">{t("saved.message")}</p>
              <div className="success-details">
                <p>{t("saved.from_there")}</p>
                <ul>
                  <li>{t("saved.from_edit")}</li>
                  <li>{t("saved.from_export")}</li>
                  <li>{t("saved.from_delete")}</li>
                </ul>
              </div>
              <button className="success-btn" onClick={closeSuccessModal}>
                {t("saved.ok")}
              </button>
            </div>
          </div>
        )}
      </>
    );
  if (step === 4)
    return (
      <MyRecords
        onBack={() => setStep(0)}
        refreshSavedCount={refreshSavedCount}
        setStep={setStep}
        setData={setData}
      />
    );
  return null;
}
