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
    <div className="bg-[#c85d35] text-[#fffaf0]">
      <section className="px-5 pt-36 pb-20 sm:px-8 sm:pt-44 sm:pb-32 lg:px-12">
        <div className="mx-auto grid max-w-[1280px] gap-10 sm:gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          {/* Left Column: Heading & Info */}
          <Reveal>
            <p className="text-[0.67rem] font-semibold uppercase tracking-[0.2em] text-[#ffe0a0]">
              {d.contact.label}
            </p>
            <h1 className="mt-5 max-w-lg font-serif text-[clamp(2.8rem,5.3vw,5.4rem)] leading-[0.93] tracking-[-0.065em]">
              {d.contact.headline}
            </h1>
            <p className="mt-7 max-w-md text-[0.98rem] leading-7 text-white/85">
              {d.contact.body}
            </p>

            <div className="mt-12 border-t border-white/25 pt-6 text-xs text-white/80 space-y-2">
              <p className="font-semibold uppercase tracking-wider text-[#ffe0a0]">
                Direkter Kontakt & Reaktionszeit
              </p>
              <p>
                In der Regel erhalten Sie innerhalb von 24–48 Stunden eine persönliche Rückmeldung zur Abstimmung Ihres Anliegens.
              </p>
            </div>
          </Reveal>

          {/* Right Column: Mode Tabs & Form */}
          <Reveal delay={100}>
            <div className="flex border-b border-white/35" role="tablist" aria-label="Kontaktoptionen">
              <button
                type="button"
                role="tab"
                aria-selected={formMode === "contact"}
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
                role="tab"
                aria-selected={formMode === "feedback"}
                onClick={() => {
                  setFormMode("feedback");
                  setFormSubmitted(false);
                }}
                className={`form-tab ${formMode === "feedback" ? "is-active" : ""}`}
              >
                Feedback geben
              </button>
            </div>

            {formSubmitted ? (
              <div className="py-14" aria-live="polite">
                <p className="font-serif text-4xl tracking-[-0.055em]">Vielen Dank.</p>
                <p className="mt-4 max-w-md text-[0.97rem] leading-7 text-white/85">
                  {formMode === "feedback"
                    ? d.contact.successMessageFeedback
                    : d.contact.successMessageContact}
                </p>
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  className="mt-7 border-b border-white pb-1 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-white hover:text-[#ffe0a0] hover:border-[#ffe0a0]"
                >
                  Weitere Nachricht senden
                </button>
              </div>
            ) : (
              <form className="mt-9" onSubmit={submitForm}>
                <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
                  <label className="form-label">
                    <span>Name {formMode === "feedback" && <em>(optional)</em>}</span>
                    <input
                      name="name"
                      type="text"
                      autoComplete="name"
                      required={formMode === "contact"}
                    />
                  </label>
                  <label className="form-label">
                    <span>E-Mail-Adresse</span>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                    />
                  </label>
                  <label className="form-label sm:col-span-2">
                    <span>
                      {formMode === "feedback" ? "Kontext der Zusammenarbeit" : "Worum geht es?"}
                    </span>
                    {formMode === "contact" ? (
                      <select
                        name="topic"
                        value={selectedTopic}
                        onChange={(e) => setSelectedTopic(e.target.value)}
                        required
                        className="bg-[#c85d35] text-white"
                      >
                        <option value="" disabled className="bg-[#c85d35]">
                          Bitte wählen …
                        </option>
                        {d.contact.topics.map((t) => (
                          <option key={t} value={t} className="bg-[#c85d35]">
                            {t}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        name="context"
                        type="text"
                        placeholder="z. B. Fortbildung, Projekt, Kooperation"
                      />
                    )}
                  </label>
                  <label className="form-label sm:col-span-2">
                    <span>
                      {formMode === "feedback" ? "Ihre Rückmeldung" : "Ihre Nachricht"}
                    </span>
                    <textarea name="message" rows={4} required />
                  </label>
                </div>

                {formMode === "feedback" && (
                  <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm leading-5 text-white/85">
                    <input
                      className="mt-1 h-4 w-4 accent-[#173530]"
                      type="checkbox"
                      name="permission"
                    />
                    <span>Meine Rückmeldung darf anonymisiert veröffentlicht werden.</span>
                  </label>
                )}

                <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm leading-5 text-white/85">
                  <input
                    className="mt-1 h-4 w-4 accent-[#173530]"
                    type="checkbox"
                    name="privacy"
                    required
                  />
                  <span>
                    Ich habe den Datenschutzhinweis zur Kenntnis genommen und stimme der Verarbeitung meiner Angaben zu.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-8 inline-flex items-center gap-3 border border-white bg-white px-7 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#173530] transition-all duration-300 hover:bg-transparent hover:text-white disabled:opacity-50"
                >
                  <span>
                    {isSubmitting
                      ? "Wird gesendet …"
                      : formMode === "feedback"
                      ? "Feedback absenden"
                      : "Anfrage senden"}
                  </span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
