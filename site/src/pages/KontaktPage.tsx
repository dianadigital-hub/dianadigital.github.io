import { useState, useEffect, FormEvent } from "react";
import { Content } from "../types/content";
import { useRoute } from "../router";
import { Reveal } from "../components/Reveal";
import { ArrowUpRight } from "../components/Icons";

interface KontaktPageProps {
  data: Content;
}

export function KontaktPage({ data }: KontaktPageProps) {
  const { params } = useRoute();
  const d = data;

  const [formMode, setFormMode] = useState<"contact" | "feedback">("contact");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Parameter aus URL (z.B. ?topic=Fortbildung) übernehmen
  useEffect(() => {
    const urlTopic = params.get("topic");
    if (urlTopic) {
      // Prüfe, ob das Topic in d.contact.topics existiert oder füge es temporär hinzu
      const matched = d.contact.topics.find((t) =>
        t.toLowerCase().includes(urlTopic.toLowerCase())
      );
      if (matched) {
        setSelectedTopic(matched);
      } else {
        setSelectedTopic(urlTopic);
      }
    }
  }, [params, d.contact.topics]);

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formId =
      formMode === "feedback"
        ? (import.meta.env.VITE_FORMSPREE_FEEDBACK_ID as string | undefined)
        : (import.meta.env.VITE_FORMSPREE_CONTACT_ID as string | undefined);

    const form = e.currentTarget;

    if (!formId) {
      // Simulierter Erfolg im Entwicklungsmodus
      console.info(
        `VITE_FORMSPREE_${formMode === "feedback" ? "FEEDBACK" : "CONTACT"}_ID ist nicht gesetzt – Simulation erfolgreich.`
      );
      setTimeout(() => {
        setIsSubmitting(false);
        setFormSubmitted(true);
      }, 500);
      return;
    }

    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (res.ok) {
        setFormSubmitted(true);
        form.reset();
      }
    } catch (err) {
      console.error("Formularübertragungsfehler:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#173530] text-[#fffaf0] pt-28 pb-20">
      <section className="mx-auto max-w-4xl px-6 sm:px-10">
        <Reveal>
          <span className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#e9be5b]">
            {d.contact.label}
          </span>
          <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
            {d.contact.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#e9e6da] sm:text-lg">
            {d.contact.body}
          </p>

          {/* Form Mode Tabs */}
          <div className="mt-12 flex border-b border-white/20 pb-2">
            <button
              type="button"
              onClick={() => {
                setFormMode("contact");
                setFormSubmitted(false);
              }}
              className={`form-tab ${formMode === "contact" ? "is-active" : ""}`}
            >
              Anfrage stellen
            </button>
            <button
              type="button"
              onClick={() => {
                setFormMode("feedback");
                setFormSubmitted(false);
              }}
              className={`form-tab ${formMode === "feedback" ? "is-active" : ""}`}
            >
              Feedback geben
            </button>
          </div>

          {/* Success State */}
          {formSubmitted ? (
            <div className="mt-10 rounded-2xl bg-white/10 p-8 text-center backdrop-blur-md">
              <span className="font-serif text-2xl text-[#e9be5b]">Bestätigung</span>
              <h2 className="mt-3 font-serif text-2xl text-[#fffaf0]">
                Vielen Dank für Ihre Nachricht!
              </h2>
              <p className="mt-2 text-sm text-[#e9e6da]">
                {formMode === "contact"
                  ? d.contact.successMessageContact
                  : d.contact.successMessageFeedback}
              </p>
              <button
                type="button"
                onClick={() => setFormSubmitted(false)}
                className="mt-6 rounded-full bg-[#e9be5b] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#173530] hover:bg-[#f3cc70]"
              >
                Weitere Nachricht senden
              </button>
            </div>
          ) : (
            /* Form Fields */
            <form onSubmit={submitForm} className="mt-10 grid gap-7">
              <div className="grid gap-7 sm:grid-cols-2">
                <label className="form-label">
                  <span>Name *</span>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Ihr vollständiger Name"
                    className="focus:border-[#e9be5b]"
                  />
                </label>

                <label className="form-label">
                  <span>E-Mail *</span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="ihre.adresse@schule.de"
                    className="focus:border-[#e9be5b]"
                  />
                </label>
              </div>

              <div className="grid gap-7 sm:grid-cols-2">
                <label className="form-label">
                  <span>Schule / Institution <em>(optional)</em></span>
                  <input
                    type="text"
                    name="institution"
                    placeholder="z. B. Gymnasium Berlin"
                    className="focus:border-[#e9be5b]"
                  />
                </label>

                <label className="form-label">
                  <span>Thema / Anliegen *</span>
                  <select
                    name="topic"
                    required
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="focus:border-[#e9be5b]"
                  >
                    <option value="" disabled className="bg-[#173530]">
                      Bitte Thema wählen …
                    </option>
                    {d.contact.topics.map((t, idx) => (
                      <option key={idx} value={t} className="bg-[#173530]">
                        {t}
                      </option>
                    ))}
                    {selectedTopic &&
                      !d.contact.topics.includes(selectedTopic) && (
                        <option value={selectedTopic} className="bg-[#173530]">
                          {selectedTopic}
                        </option>
                      )}
                  </select>
                </label>
              </div>

              <label className="form-label">
                <span>
                  {formMode === "contact" ? "Ihre Nachricht *" : "Ihr Feedback *"}
                </span>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder={
                    formMode === "contact"
                      ? "Beschreiben Sie kurz Ihr Vorhaben, Ihre Zielgruppe und den zeitlichen Rahmen …"
                      : "Was hat Ihnen gefallen, welche Anregungen haben Sie?"
                  }
                  className="focus:border-[#e9be5b]"
                />
              </label>

              {/* DSGVO Consent */}
              <p className="text-[0.72rem] leading-relaxed text-[#a9b9b0]">
                Ihre Daten werden ausschließlich zur Bearbeitung und Beantwortung Ihrer Anfrage verarbeitet und vertraulich behandelt. Weitere Informationen finden Sie in der Datenschutzerklärung.
              </p>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button-primary rounded-full px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] disabled:opacity-50"
                >
                  <span>
                    {isSubmitting
                      ? "Wird übertragen …"
                      : formMode === "contact"
                      ? "Anfrage absenden"
                      : "Feedback senden"}
                  </span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}
        </Reveal>
      </section>
    </div>
  );
}
