type Block = { heading: string; paragraphs: (string | string[])[] };

/* Platzhalter wie [PLZ] oder [E-Mail-Adresse] gelb markieren, damit sie beim Review auffallen */
function withPlaceholders(text: string) {
  return text.split(/(\[[^\]]+\])/g).map((part, i) =>
    part.startsWith("[") && part.endsWith("]") ? (
      <mark key={i} className="rounded bg-[#e9be5b]/60 px-1 text-[#173530]">{part}</mark>
    ) : (
      part
    )
  );
}

function Paragraph({ text }: { text: string }) {
  return (
    <p className="mt-4 text-[0.95rem] leading-7 text-[#3e4a44] first:mt-0">
      {text.split("\n").map((line, i) => (
        <span key={i}>
          {i > 0 && <br />}
          {withPlaceholders(line)}
        </span>
      ))}
    </p>
  );
}

function Blocks({ sections }: { sections: Block[] }) {
  return (
    <>
      {sections.map((s) => (
        <section key={s.heading} className="mt-10 first:mt-0">
          <h3 className="font-serif text-xl tracking-[-0.02em] text-[#173530]">{s.heading}</h3>
          {s.paragraphs.map((p, i) =>
            Array.isArray(p) ? (
              <ul key={i} className="mt-4 list-disc space-y-2 pl-5 text-[0.95rem] leading-7 text-[#3e4a44]">
                {p.map((item, j) => <li key={j}>{withPlaceholders(item)}</li>)}
              </ul>
            ) : (
              <Paragraph key={i} text={p} />
            )
          )}
        </section>
      ))}
    </>
  );
}

export const DATENSCHUTZ: Block[] = [
  {
    heading: "1. Verantwortliche",
    paragraphs: [
      "Verantwortlich für die Verarbeitung personenbezogener Daten auf dieser Website ist:",
      "Diana Jeske-Siegel\nPostfach [Nummer]\n[PLZ] Berlin-Köpenick\nDeutschland",
      "E-Mail: [E-Mail-Adresse]",
    ],
  },
  {
    heading: "2. Allgemeines zur Datenverarbeitung",
    paragraphs: [
      "Der Schutz personenbezogener Daten ist wichtig. Personenbezogene Daten werden auf dieser Website nur verarbeitet, soweit dies für den Betrieb der Website, die Bearbeitung von Kontaktanfragen oder aufgrund einer gesetzlichen Verpflichtung erforderlich ist.",
      "Personenbezogene Daten werden nicht verkauft oder zu Werbezwecken an Dritte weitergegeben.",
    ],
  },
  {
    heading: "3. Besuch der Website",
    paragraphs: [
      "Beim Aufruf dieser Website können durch den technischen Betrieb des Webservers bzw. des eingesetzten Website-Dienstes technische Informationen verarbeitet werden. Dazu können insbesondere IP-Adresse, Zeitpunkt des Zugriffs, aufgerufene Seiten, Browsertyp und Betriebssystem gehören.",
      "Die Verarbeitung erfolgt, soweit erforderlich, zur technischen Bereitstellung, Sicherheit und Stabilität der Website.",
      "Die konkrete Verarbeitung richtet sich auch nach den Datenschutzbestimmungen des eingesetzten Hosting- bzw. Websiteanbieters.",
    ],
  },
  {
    heading: "4. Kontaktformular",
    paragraphs: [
      "Wenn Sie über das Kontaktformular Kontakt aufnehmen, werden die von Ihnen eingegebenen Angaben verarbeitet. Dazu können insbesondere Name, E-Mail-Adresse, ausgewählter Anfragegrund und der Inhalt Ihrer Nachricht gehören.",
      "Die Daten werden ausschließlich zur Bearbeitung und Beantwortung der jeweiligen Anfrage verwendet.",
      "Rechtsgrundlage ist grundsätzlich Art. 6 Abs. 1 lit. f DSGVO, soweit die Kontaktaufnahme der Bearbeitung einer Anfrage dient und hierfür ein berechtigtes Interesse an der Kommunikation besteht. Soweit die Anfrage auf den Abschluss oder die Durchführung eines Vertrags gerichtet ist, kann Art. 6 Abs. 1 lit. b DSGVO einschlägig sein.",
      "Die Daten werden gelöscht, sobald sie für die Bearbeitung der Anfrage nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.",
    ],
  },
  {
    heading: "5. Empfänger und technische Dienstleister",
    paragraphs: [
      "Für den Betrieb dieser Website können technische Dienstleister eingesetzt werden, insbesondere für Hosting, Websitebereitstellung, E-Mail-Kommunikation und die Verarbeitung von Kontaktanfragen.",
      "Soweit solche Dienstleister personenbezogene Daten im Auftrag verarbeiten, erfolgt dies im Rahmen der gesetzlichen datenschutzrechtlichen Vorgaben.",
      "Welche Dienstleister konkret eingesetzt werden und welche Daten dabei verarbeitet werden, hängt von der technischen Konfiguration dieser Website ab.",
    ],
  },
  {
    heading: "6. Cookies und ähnliche Technologien",
    paragraphs: [
      "Diese Website verwendet nach derzeitiger Konfiguration keine nicht erforderlichen Cookies zu Werbe-, Tracking- oder Analysezwecken.",
      "Soweit technisch notwendige Cookies oder vergleichbare Technologien eingesetzt werden, dienen diese ausschließlich dem sicheren und funktionsfähigen Betrieb der Website.",
    ],
  },
  {
    heading: "7. Externe Inhalte und Links",
    paragraphs: [
      "Auf dieser Website können Inhalte oder Links zu externen Websites eingebunden sein. Beim Aufruf solcher externen Inhalte können personenbezogene Daten an den jeweiligen Anbieter übertragen werden.",
      "Auf die Datenverarbeitung durch externe Anbieter hat Diana Jeske-Siegel keinen Einfluss. Für deren Datenschutzbestimmungen ist der jeweilige Anbieter verantwortlich.",
    ],
  },
  {
    heading: "8. Rechte betroffener Personen",
    paragraphs: [
      "Sie haben nach Maßgabe der gesetzlichen Voraussetzungen insbesondere folgende Rechte:",
      [
        "Recht auf Auskunft über die verarbeiteten personenbezogenen Daten,",
        "Recht auf Berichtigung unrichtiger Daten,",
        "Recht auf Löschung,",
        "Recht auf Einschränkung der Verarbeitung,",
        "Recht auf Datenübertragbarkeit,",
        "Recht auf Widerspruch gegen bestimmte Verarbeitungen,",
        "Recht auf Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft.",
      ],
      "Sie haben außerdem das Recht, sich bei einer Datenschutzaufsichtsbehörde über die Verarbeitung personenbezogener Daten zu beschweren.",
    ],
  },
  {
    heading: "9. Aktualität dieser Datenschutzerklärung",
    paragraphs: [
      "Diese Datenschutzerklärung wird angepasst, wenn sich die technische Ausstattung oder die Art der Verarbeitung personenbezogener Daten auf dieser Website ändert.",
      "Stand: [Monat Jahr]",
    ],
  },
];

export const IMPRESSUM: Block[] = [
  {
    heading: "Angaben gemäß § 5 DDG",
    paragraphs: [
      "Diana Jeske-Siegel\n[ggf. vollständiger Vorname]\nPostfach [Nummer]\n[PLZ] Berlin-Köpenick\nDeutschland",
      "E-Mail: [E-Mail-Adresse]",
    ],
  },
  {
    heading: "Zweck dieser Website",
    paragraphs: [
      "Diese Website ist ein persönliches berufliches Portfolio und dient der Darstellung von beruflichen Erfahrungen, Projekten, Qualifikationen und fachlichen Arbeitsschwerpunkten im Bereich digitale Bildung, Medienbildung, KI und Schulentwicklung.",
      "Die Website stellt kein privates gewerbliches Angebot für Beratungs-, Fortbildungs- oder sonstige Dienstleistungen dar.",
      "Die auf dieser Website dargestellten Tätigkeiten und Projekte beziehen sich auf die berufliche Tätigkeit von Diana Jeske-Siegel, insbesondere im Rahmen ihrer Tätigkeit als Lehrkraft sowie ihrer Tätigkeit als Beraterin und Fortbildnerin für BliQ.",
      "Die Website wird nicht im Namen des Senats für Bildung, Jugend und Familie (SenBJF), des BliQ oder einer anderen öffentlichen Stelle betrieben.",
    ],
  },
  {
    heading: "Verantwortlich für die Inhalte",
    paragraphs: [
      "Diana Jeske-Siegel\n[Anschrift entsprechend der rechtlich erforderlichen Anschrift]",
      "E-Mail: [E-Mail-Adresse]",
    ],
  },
  {
    heading: "Haftung für Inhalte",
    paragraphs: [
      "Die Inhalte dieser Website wurden mit Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte wird jedoch keine Gewähr übernommen.",
      "Als Diensteanbieterin ist Diana Jeske-Siegel für eigene Inhalte auf dieser Website nach den allgemeinen gesetzlichen Vorschriften verantwortlich. Eine Verpflichtung zur Überwachung übermittelter oder gespeicherter fremder Informationen besteht nur nach Maßgabe der gesetzlichen Vorschriften.",
    ],
  },
  {
    heading: "Haftung für Links",
    paragraphs: [
      "Diese Website kann Links zu externen Websites Dritter enthalten. Auf deren Inhalte besteht kein Einfluss. Für die Inhalte der verlinkten Seiten ist grundsätzlich der jeweilige Betreiber verantwortlich.",
      "Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar.",
    ],
  },
  {
    heading: "Urheberrecht",
    paragraphs: [
      "Die auf dieser Website veröffentlichten Inhalte und Werke unterliegen dem deutschen Urheberrecht. Eine Vervielfältigung, Bearbeitung, Verbreitung oder sonstige Verwertung außerhalb der Grenzen des Urheberrechts bedarf der vorherigen Zustimmung der jeweiligen Rechteinhaberin bzw. des jeweiligen Rechteinhabers.",
      "Soweit Inhalte auf dieser Website nicht von Diana Jeske-Siegel stammen, werden die Rechte der jeweiligen Urheberinnen und Urheber beachtet.",
    ],
  },
];

export function LegalOverlay({ page, onClose }: { page: "datenschutz" | "impressum" | null; onClose: () => void }) {
  const sections = page === "datenschutz" ? DATENSCHUTZ : IMPRESSUM;
  const title = page === "datenschutz" ? "Datenschutzerklärung" : "Impressum";
  return (
    <div
      className={`fixed inset-0 z-[58] overflow-y-auto bg-[#f6f5ef] transition-all duration-400 ${page ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      aria-hidden={!page}
    >
      <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
        <button onClick={onClose} className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-[#527267] hover:text-[#173530]">
          ← Zurück
        </button>
        <h2 className="mt-6 font-serif text-4xl tracking-[-0.05em] text-[#173530] sm:text-5xl">{title}</h2>
        <div className="mt-10">{page && <Blocks sections={sections} />}</div>
      </div>
    </div>
  );
}
