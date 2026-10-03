import { useState, useRef, ChangeEvent } from "react";
import { Content, CvStation, EducationStation, CertificateItem, ProjectItem } from "../types/content";

interface CmsOverlayProps {
  open: boolean;
  onClose: () => void;
  data: Content;
  onSaveData: (newData: Content) => void;
}

type CmsTab = "slides" | "home" | "services" | "projects" | "cv" | "contact";

export function CmsOverlay({ open, onClose, data, onSaveData }: CmsOverlayProps) {
  const [activeTab, setActiveTab] = useState<CmsTab>("slides");
  const [editData, setEditData] = useState<Content>(JSON.parse(JSON.stringify(data)));
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const showStatus = (msg: string) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(null), 3000);
  };

  const updateField = (path: string, val: any) => {
    const clone: any = JSON.parse(JSON.stringify(editData));
    const parts = path.split(".");
    let curr = clone;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!curr[parts[i]]) curr[parts[i]] = {};
      curr = curr[parts[i]];
    }
    curr[parts[parts.length - 1]] = val;
    setEditData(clone);
    onSaveData(clone);
  };

  // Download data.json
  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(editData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(url);
    showStatus("data.json erfolgreich heruntergeladen");
  };

  // Upload/Import data.json
  const handleFileImport = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target?.result as string);
        setEditData(parsed);
        onSaveData(parsed);
        showStatus("data.json erfolgreich importiert und live angewendet");
      } catch (err) {
        alert("Fehler beim Parsen der JSON-Datei: Ungültiges Format.");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Quick Copy
  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(editData, null, 2));
    showStatus("Komplettes JSON in die Zwischenablage kopiert");
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#12221f]/98 text-[#fffaf0] backdrop-blur-md">
      {/* Top Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-6 py-4 sm:px-10">
        <div>
          <h2 className="font-serif text-2xl tracking-tight text-[#fffaf0] sm:text-3xl">
            Inhalts-Studio v3
          </h2>
          <p className="text-xs text-[#a9b9b0]">
            Alle Texte und Daten live bearbeiten, importieren und exportieren.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {statusMsg && (
            <span className="hidden rounded-full bg-[#e9be5b]/20 px-3 py-1 text-xs font-semibold text-[#e9be5b] sm:inline">
              {statusMsg}
            </span>
          )}

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileImport}
            accept=".json"
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:border-[#e9be5b] hover:text-[#e9be5b]"
            title="Lokale data.json importieren"
          >
            Upload JSON
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="hidden rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:border-[#e9be5b] hover:text-[#e9be5b] sm:inline"
            title="In Zwischenablage kopieren"
          >
            Quick Copy
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="rounded-full bg-[#e9be5b] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#173530] shadow transition-all hover:bg-[#f3cc70]"
          >
            Download data.json
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/20"
          >
            Schließen
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex shrink-0 gap-2 overflow-x-auto border-b border-white/10 px-6 py-2 sm:px-10">
        {[
          { key: "slides", label: "Hero-Slides & News" },
          { key: "home", label: "Startseite & Philosophie" },
          { key: "services", label: "Angebote & Ablauf" },
          { key: "projects", label: "Projektarchiv" },
          { key: "cv", label: "Lebenslauf & Vita" },
          { key: "contact", label: "Kontakt & Metadaten" },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key as CmsTab)}
            className={`shrink-0 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === tab.key
                ? "bg-[#173530] text-[#e9be5b] border border-[#e9be5b]/30"
                : "text-[#a9b9b0] hover:text-white hover:bg-white/5"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-10">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* ===================== TAB: SLIDES ===================== */}
          {activeTab === "slides" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl text-[#e9be5b]">
                  Hero-Slideshow (Impulse, Termine & News)
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    const slides = [...(editData.heroSlides || [])];
                    slides.push({
                      id: `slide-${Date.now()}`,
                      badge: "Neu",
                      type: "Aktuelles",
                      title: "Neuer Impuls oder Vortrag",
                      teaser: "Beschreibung des Themas und Relevanz für Schulen.",
                      date: "Frühjahr 2027",
                      location: "Berlin",
                      ctaLabel: "Mehr erfahren",
                      ctaLink: "/angebote",
                      active: true,
                    });
                    updateField("heroSlides", slides);
                  }}
                  className="rounded-full bg-[#173530] px-4 py-1.5 text-xs font-bold text-[#e9be5b] hover:bg-[#12221f]"
                >
                  + Slide hinzufügen
                </button>
              </div>

              {(editData.heroSlides || []).map((slide, idx) => (
                <div key={slide.id || idx} className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-xs font-bold text-[#e9be5b]">Slide #{idx + 1}</span>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 text-xs">
                        <input
                          type="checkbox"
                          checked={slide.active}
                          onChange={(e) => {
                            const slides = [...(editData.heroSlides || [])];
                            slides[idx].active = e.target.checked;
                            updateField("heroSlides", slides);
                          }}
                        />
                        <span>Aktiv</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const slides = (editData.heroSlides || []).filter((_, i) => i !== idx);
                          updateField("heroSlides", slides);
                        }}
                        className="text-xs text-red-400 hover:text-red-300"
                      >
                        Löschen
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-xs">
                      <span className="text-[#a9b9b0]">Kategorie-Badge (z.B. Pilotprojekt Berlin):</span>
                      <input
                        type="text"
                        value={slide.badge}
                        onChange={(e) => {
                          const slides = [...(editData.heroSlides || [])];
                          slides[idx].badge = e.target.value;
                          updateField("heroSlides", slides);
                        }}
                        className="mt-1 w-full rounded bg-[#173530] p-2 text-sm text-white border border-white/10"
                      />
                    </label>

                    <label className="block text-xs">
                      <span className="text-[#a9b9b0]">Typ (z.B. Fortbildung):</span>
                      <input
                        type="text"
                        value={slide.type}
                        onChange={(e) => {
                          const slides = [...(editData.heroSlides || [])];
                          slides[idx].type = e.target.value;
                          updateField("heroSlides", slides);
                        }}
                        className="mt-1 w-full rounded bg-[#173530] p-2 text-sm text-white border border-white/10"
                      />
                    </label>
                  </div>

                  <label className="block text-xs">
                    <span className="text-[#a9b9b0]">Headline / Titel:</span>
                    <input
                      type="text"
                      value={slide.title}
                      onChange={(e) => {
                        const slides = [...(editData.heroSlides || [])];
                        slides[idx].title = e.target.value;
                        updateField("heroSlides", slides);
                      }}
                      className="mt-1 w-full rounded bg-[#173530] p-2 text-sm text-white border border-white/10"
                    />
                  </label>

                  <label className="block text-xs">
                    <span className="text-[#a9b9b0]">Teaser (Kurzbeschreibung, ca. 100-140 Zeichen):</span>
                    <textarea
                      rows={2}
                      value={slide.teaser}
                      onChange={(e) => {
                        const slides = [...(editData.heroSlides || [])];
                        slides[idx].teaser = e.target.value;
                        updateField("heroSlides", slides);
                      }}
                      className="mt-1 w-full rounded bg-[#173530] p-2 text-sm text-white border border-white/10"
                    />
                  </label>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-xs">
                      <span className="text-[#a9b9b0]">Datum / Zeitraum:</span>
                      <input
                        type="text"
                        value={slide.date}
                        onChange={(e) => {
                          const slides = [...(editData.heroSlides || [])];
                          slides[idx].date = e.target.value;
                          updateField("heroSlides", slides);
                        }}
                        className="mt-1 w-full rounded bg-[#173530] p-2 text-sm text-white border border-white/10"
                      />
                    </label>

                    <label className="block text-xs">
                      <span className="text-[#a9b9b0]">Ort / Rahmen:</span>
                      <input
                        type="text"
                        value={slide.location}
                        onChange={(e) => {
                          const slides = [...(editData.heroSlides || [])];
                          slides[idx].location = e.target.value;
                          updateField("heroSlides", slides);
                        }}
                        className="mt-1 w-full rounded bg-[#173530] p-2 text-sm text-white border border-white/10"
                      />
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-xs">
                      <span className="text-[#a9b9b0]">Button-Text:</span>
                      <input
                        type="text"
                        value={slide.ctaLabel}
                        onChange={(e) => {
                          const slides = [...(editData.heroSlides || [])];
                          slides[idx].ctaLabel = e.target.value;
                          updateField("heroSlides", slides);
                        }}
                        className="mt-1 w-full rounded bg-[#173530] p-2 text-sm text-white border border-white/10"
                      />
                    </label>

                    <label className="block text-xs">
                      <span className="text-[#a9b9b0]">Ziel-Link (z.B. /projekte oder /kontakt):</span>
                      <input
                        type="text"
                        value={slide.ctaLink}
                        onChange={(e) => {
                          const slides = [...(editData.heroSlides || [])];
                          slides[idx].ctaLink = e.target.value;
                          updateField("heroSlides", slides);
                        }}
                        className="mt-1 w-full rounded bg-[#173530] p-2 text-sm text-white border border-white/10"
                      />
                    </label>
                  </div>

                  <label className="block text-xs">
                    <span className="text-[#a9b9b0]">Hintergrundbild Pfad (z.B. images/hero/hero-1-lernprojekt.png):</span>
                    <input
                      type="text"
                      value={slide.image || ""}
                      onChange={(e) => {
                        const slides = [...(editData.heroSlides || [])];
                        slides[idx].image = e.target.value;
                        updateField("heroSlides", slides);
                      }}
                      className="mt-1 w-full rounded bg-[#173530] p-2 text-sm text-white border border-white/10"
                    />
                  </label>
                </div>
              ))}
            </div>
          )}

          {/* ===================== TAB: HOME ===================== */}
          {activeTab === "home" && (
            <div className="space-y-6">
              <h3 className="font-serif text-xl text-[#e9be5b]">Hero & Philosophie</h3>

              <label className="block text-xs">
                <span className="text-[#a9b9b0]">Hero Tagline:</span>
                <input
                  type="text"
                  value={editData.hero.tagline}
                  onChange={(e) => updateField("hero.tagline", e.target.value)}
                  className="mt-1 w-full rounded bg-[#173530] p-2 text-sm text-white border border-white/10"
                />
              </label>

              <label className="block text-xs">
                <span className="text-[#a9b9b0]">Hero Hauptüberschrift (Headline):</span>
                <textarea
                  rows={2}
                  value={editData.hero.headline}
                  onChange={(e) => updateField("hero.headline", e.target.value)}
                  className="mt-1 w-full rounded bg-[#173530] p-2 text-sm text-white border border-white/10"
                />
              </label>

              <label className="block text-xs">
                <span className="text-[#a9b9b0]">Hero Untertitel (Subheadline):</span>
                <textarea
                  rows={3}
                  value={editData.hero.subheadline}
                  onChange={(e) => updateField("hero.subheadline", e.target.value)}
                  className="mt-1 w-full rounded bg-[#173530] p-2 text-sm text-white border border-white/10"
                />
              </label>

              <div className="border-t border-white/10 pt-4 space-y-4">
                <h4 className="text-sm font-bold text-[#e9be5b]">Philosophie / Haltung</h4>
                <label className="block text-xs">
                  <span className="text-[#a9b9b0]">Großes Zitat:</span>
                  <textarea
                    rows={2}
                    value={editData.philosophy.quote}
                    onChange={(e) => updateField("philosophy.quote", e.target.value)}
                    className="mt-1 w-full rounded bg-[#173530] p-2 text-sm text-white border border-white/10"
                  />
                </label>
                <label className="block text-xs">
                  <span className="text-[#a9b9b0]">Fließtext Haltung:</span>
                  <textarea
                    rows={3}
                    value={editData.philosophy.body}
                    onChange={(e) => updateField("philosophy.body", e.target.value)}
                    className="mt-1 w-full rounded bg-[#173530] p-2 text-sm text-white border border-white/10"
                  />
                </label>
              </div>
            </div>
          )}

          {/* ===================== TAB: SERVICES ===================== */}
          {activeTab === "services" && (
            <div className="space-y-6">
              <h3 className="font-serif text-xl text-[#e9be5b]">Angebote & Ablauf</h3>

              <div className="space-y-6">
                {editData.services.items.map((srv, idx) => (
                  <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-3">
                    <span className="text-xs font-bold text-[#e9be5b]">Angebot #{srv.number}</span>
                    <input
                      type="text"
                      value={srv.title}
                      onChange={(e) => {
                        const items = [...editData.services.items];
                        items[idx].title = e.target.value;
                        updateField("services.items", items);
                      }}
                      className="w-full rounded bg-[#173530] p-2 font-serif text-base text-white border border-white/10"
                    />
                    <textarea
                      rows={3}
                      value={srv.description}
                      onChange={(e) => {
                        const items = [...editData.services.items];
                        items[idx].description = e.target.value;
                        updateField("services.items", items);
                      }}
                      className="w-full rounded bg-[#173530] p-2 text-sm text-white border border-white/10"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================== TAB: PROJECTS ===================== */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl text-[#e9be5b]">Projektarchiv</h3>
                <button
                  type="button"
                  onClick={() => {
                    const items = [...editData.projects.items];
                    items.push({
                      id: `proj-${Date.now()}`,
                      label: "Neues Thema",
                      category: "ki",
                      title: "Neues Modellprojekt",
                      copy: "Kurzbeschreibung für das Projektarchiv.",
                      note: "Zusätzliche Notiz oder Auszeichnung.",
                    });
                    updateField("projects.items", items);
                  }}
                  className="rounded-full bg-[#173530] px-4 py-1.5 text-xs font-bold text-[#e9be5b]"
                >
                  + Projekt hinzufügen
                </button>
              </div>

              {editData.projects.items.map((proj: ProjectItem, idx) => (
                <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs font-bold text-[#e9be5b]">Projekt #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const items = editData.projects.items.filter((_, i) => i !== idx);
                        updateField("projects.items", items);
                      }}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Löschen
                    </button>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      type="text"
                      placeholder="Label (z.B. Berufsorientierung)"
                      value={proj.label}
                      onChange={(e) => {
                        const items = [...editData.projects.items];
                        items[idx].label = e.target.value;
                        updateField("projects.items", items);
                      }}
                      className="rounded bg-[#173530] p-2 text-xs text-white border border-white/10"
                    />
                    <input
                      type="text"
                      placeholder="Titel"
                      value={proj.title}
                      onChange={(e) => {
                        const items = [...editData.projects.items];
                        items[idx].title = e.target.value;
                        updateField("projects.items", items);
                      }}
                      className="rounded bg-[#173530] p-2 text-sm font-semibold text-white border border-white/10"
                    />
                  </div>

                  <textarea
                    rows={2}
                    placeholder="Kurzbeschreibung"
                    value={proj.copy}
                    onChange={(e) => {
                      const items = [...editData.projects.items];
                      items[idx].copy = e.target.value;
                      updateField("projects.items", items);
                    }}
                    className="w-full rounded bg-[#173530] p-2 text-xs text-white border border-white/10"
                  />

                  <input
                    type="text"
                    placeholder="Hinweis / Statusnote (z.B. Ein echtes Familienstück...)"
                    value={proj.note}
                    onChange={(e) => {
                      const items = [...editData.projects.items];
                      items[idx].note = e.target.value;
                      updateField("projects.items", items);
                    }}
                    className="w-full rounded bg-[#173530] p-2 text-xs italic text-[#e9e6da] border border-white/10"
                  />
                </div>
              ))}
            </div>
          )}

          {/* ===================== TAB: CV ===================== */}
          {activeTab === "cv" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl text-[#e9be5b]">Curriculum Vitae (Werdegang & Abschlüsse)</h3>
                <button
                  type="button"
                  onClick={() => {
                    const cv = editData.curriculumVitae || { career: [], education: [], qualifications: [] };
                    const career = [...cv.career];
                    career.push({
                      period: "Zeitraum",
                      role: "Funktion / Rolle",
                      institution: "Schule / Einrichtung",
                      description: "Kurzbeschreibung der Aufgaben.",
                    });
                    updateField("curriculumVitae.career", career);
                  }}
                  className="rounded-full bg-[#173530] px-4 py-1.5 text-xs font-bold text-[#e9be5b]"
                >
                  + Station hinzufügen
                </button>
              </div>

              {/* Career Stations */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">1. Berufliche Praxis</h4>
                {(editData.curriculumVitae?.career || []).map((c: CvStation, idx) => (
                  <div key={idx} className="rounded-lg border border-white/10 bg-white/5 p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-[#e9be5b]">Station #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const career = (editData.curriculumVitae?.career || []).filter((_, i) => i !== idx);
                          updateField("curriculumVitae.career", career);
                        }}
                        className="text-xs text-red-400"
                      >
                        Entfernen
                      </button>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-3">
                      <input
                        type="text"
                        placeholder="Zeitraum"
                        value={c.period}
                        onChange={(e) => {
                          const career = [...(editData.curriculumVitae?.career || [])];
                          career[idx].period = e.target.value;
                          updateField("curriculumVitae.career", career);
                        }}
                        className="rounded bg-[#173530] p-1.5 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Rolle"
                        value={c.role}
                        onChange={(e) => {
                          const career = [...(editData.curriculumVitae?.career || [])];
                          career[idx].role = e.target.value;
                          updateField("curriculumVitae.career", career);
                        }}
                        className="rounded bg-[#173530] p-1.5 text-xs text-white sm:col-span-2"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Institution"
                      value={c.institution}
                      onChange={(e) => {
                        const career = [...(editData.curriculumVitae?.career || [])];
                        career[idx].institution = e.target.value;
                        updateField("curriculumVitae.career", career);
                      }}
                      className="w-full rounded bg-[#173530] p-1.5 text-xs text-white"
                    />
                    <textarea
                      rows={2}
                      placeholder="Beschreibung"
                      value={c.description}
                      onChange={(e) => {
                        const career = [...(editData.curriculumVitae?.career || [])];
                        career[idx].description = e.target.value;
                        updateField("curriculumVitae.career", career);
                      }}
                      className="w-full rounded bg-[#173530] p-1.5 text-xs text-white"
                    />
                  </div>
                ))}
              </div>

              {/* Education Stations */}
              <div className="space-y-4 border-t border-white/10 pt-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">2. Ausbildung & Staatsexamina</h4>
                {(editData.curriculumVitae?.education || []).map((ed: EducationStation, idx) => (
                  <div key={idx} className="rounded-lg border border-white/10 bg-white/5 p-4 space-y-2">
                    <div className="grid gap-2 sm:grid-cols-2">
                      <input
                        type="text"
                        placeholder="Zeitraum"
                        value={ed.period}
                        onChange={(e) => {
                          const education = [...(editData.curriculumVitae?.education || [])];
                          education[idx].period = e.target.value;
                          updateField("curriculumVitae.education", education);
                        }}
                        className="rounded bg-[#173530] p-1.5 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Abschluss"
                        value={ed.title}
                        onChange={(e) => {
                          const education = [...(editData.curriculumVitae?.education || [])];
                          education[idx].title = e.target.value;
                          updateField("curriculumVitae.education", education);
                        }}
                        className="rounded bg-[#173530] p-1.5 text-xs text-white"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Universität / Seminar"
                      value={ed.institution}
                      onChange={(e) => {
                        const education = [...(editData.curriculumVitae?.education || [])];
                        education[idx].institution = e.target.value;
                        updateField("curriculumVitae.education", education);
                      }}
                      className="w-full rounded bg-[#173530] p-1.5 text-xs text-white"
                    />
                  </div>
                ))}
              </div>

              {/* Qualifications */}
              <div className="space-y-4 border-t border-white/10 pt-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">3. Zertifikate & Spezialisierungen</h4>
                {(editData.curriculumVitae?.qualifications || []).map((q: CertificateItem, idx) => (
                  <div key={idx} className="rounded-lg border border-white/10 bg-white/5 p-4 space-y-2">
                    <div className="grid gap-2 sm:grid-cols-3">
                      <input
                        type="text"
                        placeholder="Jahr"
                        value={q.year}
                        onChange={(e) => {
                          const qual = [...(editData.curriculumVitae?.qualifications || [])];
                          qual[idx].year = e.target.value;
                          updateField("curriculumVitae.qualifications", qual);
                        }}
                        className="rounded bg-[#173530] p-1.5 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Titel der Zertifizierung"
                        value={q.title}
                        onChange={(e) => {
                          const qual = [...(editData.curriculumVitae?.qualifications || [])];
                          qual[idx].title = e.target.value;
                          updateField("curriculumVitae.qualifications", qual);
                        }}
                        className="rounded bg-[#173530] p-1.5 text-xs text-white sm:col-span-2"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Details / Institut"
                      value={q.details}
                      onChange={(e) => {
                        const qual = [...(editData.curriculumVitae?.qualifications || [])];
                        qual[idx].details = e.target.value;
                        updateField("curriculumVitae.qualifications", qual);
                      }}
                      className="w-full rounded bg-[#173530] p-1.5 text-xs text-white"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================== TAB: CONTACT ===================== */}
          {activeTab === "contact" && (
            <div className="space-y-6">
              <h3 className="font-serif text-xl text-[#e9be5b]">Kontakt & Metadaten</h3>

              <label className="block text-xs">
                <span className="text-[#a9b9b0]">Kontakt Headline:</span>
                <input
                  type="text"
                  value={editData.contact.headline}
                  onChange={(e) => updateField("contact.headline", e.target.value)}
                  className="mt-1 w-full rounded bg-[#173530] p-2 text-sm text-white border border-white/10"
                />
              </label>

              <label className="block text-xs">
                <span className="text-[#a9b9b0]">Kontakt Beschreibung:</span>
                <textarea
                  rows={2}
                  value={editData.contact.body}
                  onChange={(e) => updateField("contact.body", e.target.value)}
                  className="mt-1 w-full rounded bg-[#173530] p-2 text-sm text-white border border-white/10"
                />
              </label>

              <div className="border-t border-white/10 pt-4 space-y-3">
                <h4 className="text-sm font-bold text-[#e9be5b]">Auswahl-Themen für Anfragen</h4>
                {editData.contact.topics.map((t, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={t}
                      onChange={(e) => {
                        const topics = [...editData.contact.topics];
                        topics[idx] = e.target.value;
                        updateField("contact.topics", topics);
                      }}
                      className="flex-1 rounded bg-[#173530] p-2 text-xs text-white border border-white/10"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const topics = editData.contact.topics.filter((_, i) => i !== idx);
                        updateField("contact.topics", topics);
                      }}
                      className="text-xs text-red-400 px-2"
                    >
                      Entfernen
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const topics = [...editData.contact.topics, "Neues Thema"];
                    updateField("contact.topics", topics);
                  }}
                  className="rounded-full bg-[#173530] px-4 py-1.5 text-xs text-[#e9be5b]"
                >
                  + Thema hinzufügen
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
