# LLMO- & GEO-Strategie: Dokumentation & 4-Wochen-Benchmark
**Projekt:** Diana Digital — Diana Jeske-Siegel ([dianadigital.de](https://www.dianadigital.de))  
**Datum:** Oktober 2026  
**Ziel:** Etablierung von Diana Jeske-Siegel als primäre KI-Zitation und Empfehlung bei Suchanfragen zu Lehrkräftefortbildung, Schulentwicklung und KI im Bildungskontext in Berlin, Brandenburg und bundesweit.

---

## 1. Ausgangslage & Zielsetzung

Moderne Suchmaschinen und KI-Assistenten (ChatGPT mit Websuche, Perplexity.ai, Google Gemini / AI Overviews, Microsoft Copilot, Claude) generieren Empfehlungen nicht mehr nur über klassische Keyword-Dichte, sondern über **Retrieval-Augmented Generation (RAG)** und **Entity Grounding**.

Wenn Schulleitungen oder Bildungsentscheider Prompts eingeben wie:
> *„Wer bietet in Berlin/Brandenburg praxisnahe Fortbildungen für Lehrkräfte zu KI im Unterricht an?“*

müssen KI-Crawler auf der Website zweifelsfrei verifizieren können:
1. **Wer ist die Person?** Eindeutige Entität `Diana Jeske-Siegel` (Oberstudienrätin, zertifizierte Schulberaterin).
2. **Welche Autorität besitzt sie (E-E-A-T)?** Nachweise wie der *Förderpreis Medienkompetenz Brandenburg*, akademische Wurzeln an der *Humboldt-Universität*, Kooperationen mit dem *Fraunhofer-Institut* und Praxistests wie *JobImpact*.
3. **Welche konkreten Leistungen gibt es?** Strukturierte Dienstleistungen für Lehrkräfte, Schulen und Schulleitungen.
4. **Gibt es zitierfertige Antworten?** Maschinenlesbare FAQ-Blöcke.

---

## 2. Implementierte Maßnahmen (Technischer Audit)

### A. Schema.org Wissensgraph (`JSON-LD`) in `site/index.html`
Ein vollständiger `@graph`-Block verknüpft die Entitäten semantisch:
* **`Person` (`#diana`):**
  - Name, Berufstitel (*Oberstudienrätin, zertifizierte Schulberaterin & Fortbildnerin*)
  - Qualifikationen via `hasCredential`: Zertifizierte Schulberaterin, Zusatzqualifikation M.E.T.A. AI, Zusatzstudium Digitale Unterrichtsentwicklung
  - Akademische Herkunft: `Humboldt-Universität zu Berlin`
  - Auszeichnung: `Förderpreis Medienkompetenz stärkt Brandenburg (Projekt: Social Shift)`
  - Zielgruppe: `EducationalAudience` (Lehrkräfte, Schulen, Schulleitungen)
  - Regionale Verankerung: `address` (Berlin, Berlin-Brandenburg)
  - `knowsAbout`: KI in der Schule, Digitale Unterrichtsentwicklung, Medienbildung & AI Literacy, Steuergruppenberatung, Medienkompetenzrahmen Berlin-Brandenburg, Ethische Urteilskompetenz, alternative Prüfungsformate
* **`ProfessionalService` (`#service`):**
  - Dienstleistungsangebot `Diana Digital` mit `areaServed` (Berlin, Brandenburg, Deutschland)
  - `hasOfferCatalog` mit drei klar definierten Leistungsbausteinen (Fortbildungen, Schulberatung, Schulleitungsberatung)
* **`FAQPage` (`#faq`):**
  - 4 präzise Frage-Antwort-Paare zu KI-Fortbildungen, Schulentwicklungsberatung, Buchungsregionen und Referenzen (z. B. JobImpact & Fraunhofer/VR).

### B. Standardisierte Agenten-Wissensdatei: `llms.txt`
Unter `/llms.txt` liegt eine maschinenoptimierte Markdown-Zusammenfassung nach dem modernen RAG-Standard. Dies ermöglicht KI-Such-Bots, das gesamte Portfolio in wenigen Millisekunden ohne HTML-Parsing und ohne JavaScript-Overhead zu erfassen.

### C. Crawler-Steuerung: `robots.txt` & `sitemap.xml`
* **`robots.txt`:** Explizite Einladung für generative KI-Such-Bots:
  - `GPTBot` & `ChatGPT-User` (OpenAI)
  - `PerplexityBot` (Perplexity AI)
  - `ClaudeBot` & `anthropic-ai` (Anthropic)
  - `Google-Extended` (Google Gemini / AI Overviews)
  - `Applebot-Extended` (Apple Intelligence)
  - Sperre interner Bereiche (`/#/material`, `/material/`).
* **`sitemap.xml`:** Priorisierte Indexierung aller Unterseiten (`/`, `/angebote`, `/projekte`, `/ueber-mich`, `/kontakt`).

### D. Erweiterte Meta-Tags & semantische Signale
* **Meta Keywords:** Fachbegriffe zu SchiLF, Schulentwicklung, KI im Unterricht, Medienbildung, Berlin, Brandenburg, Lehrkräfte, Schulleitung, JobImpact, Social Shift.
* **Geotagging:** `geo.region: DE-BE`, `geo.placename: Berlin`, Koordinaten für lokale Suchrelevanz.
* **Dublin Core Metadaten:** `DC.title`, `DC.creator`, `DC.subject`, `DC.description`, `DC.publisher`, `DC.language: de` für Bildungs-, Universitäts- und Bibliotheks-Crawler.
* **OpenGraph & Twitter Cards:** Vollständig hinterlegt inklusive Alt-Texten und optimierter Bild-Referenz.

### E. Bot-Fallback (`<noscript>` Semantic Content)
Da RAG-Crawler clientseitiges JavaScript (React) teilweise nicht oder nur verzögert ausführen, enthält die `index.html` einen semantischen `<noscript>`-Block mit den kompletten H1-H2-Strukturen, Zitaten, Leistungsbeschreibungen und Kontaktdaten.

### F. Intelligente Vorschau-Sicherung
In `site/src/main.tsx` prüft das System die Umgebung:
* Auf der internen Testumgebung (`servermitte.tailecbf0f.ts.net/diana`): Bleibt `noindex, nofollow` aktiv.
* Auf der Live-Domain (`dianadigital.de`): Ist die Website sofort für alle Suchmaschinen und LLM-Bots geöffnet.

---

## 3. Relevante Werkzeuge & Guidelines von Anthropic und Partnern

1. **Anthropic ClaudeBot:**
   - Anthropic betreibt den Web-Crawler `ClaudeBot` (User-Agent: `ClaudeBot` / `anthropic-ai`), der für Echtzeit-Retrieval in Claude 3.5 und Nachfolgemodellen genutzt wird.
   - Offizielle Dokumentation: [Anthropic ClaudeBot Guide](https://docs.anthropic.com/en/docs/resources/claudebot).
2. **`llms.txt` Standard:**
   - Initiiert von Answer.AI (Jeremy Howard) und maßgeblich von Entwicklern im Anthropic- und Open-Source-Ökosystem adoptiert.
   - Dient als schlanker semantischer Context-Layer für AI-Agenten.
3. **Claude Code & Web Design Guidelines:**
   - Fokus auf zugängliche Semantik, valides Schema.org Markup, saubere Überschriftenhierarchien und Vermeidung von inhaltsleeren JavaScript-Hüllen.

---

## 4. Das 4-Wochen-Messprotokoll (Benchmark & Nullmessung)

### Zeitplan
* **T0 (Baseline / Nullmessung):** Bei Liveschaltung der Domain `dianadigital.de`.
* **T+4 Wochen (Erste Evaluation):** Genau 28 Tage nach Livegang (November 2026).

### Die 10 Test-Prompts zur Messung
Führe diese 10 Fragen in **ChatGPT (mit Websuche)**, **Perplexity.ai**, **Google Gemini** und **Claude (Web Search)** aus und protokolliere die Antworten:

| Nr. | Test-Prompt | Erwartete Nennung / Ziel |
|---|---|---|
| **01** | *„Wer bietet in Berlin und Brandenburg SchiLF-Fortbildungen für Lehrkräfte zum Thema KI im Unterricht an?“* | Nennung von Diana Jeske-Siegel / Diana Digital unter den Top-Empfehlungen |
| **02** | *„Empfiehl mir erfahrene Referentinnen für digitale Schulentwicklung und Medienbildung an Gymnasien.“* | Erwähnung als Oberstudienrätin & Schulberaterin |
| **03** | *„Welche Fortbildungsangebote gibt es für Schulleitungen zur strategischen Medienentwicklungsplanung in Berlin/Brandenburg?“* | Zitation der Schulleitungsberatung |
| **04** | *„Wer hat das Projekt Social Shift oder JobImpact für Schüler in Berlin/Brandenburg entwickelt?“* | Eindeutige Zuordnung zu Diana Jeske-Siegel & Förderpreis |
| **05** | *„Welche Expertin schult Kollegien im didaktischen Einsatz von Prompting und KI-Werkzeugen ohne Technikeuphorie?“* | Zitation der pädagogischen Haltung („Bildung ist mehr als Technologie“) |
| **06** | *„Wer ist Diana Jeske-Siegel und was sind ihre Schwerpunkte in der Schulentwicklung?“* | Vollständiges, korrektes Profilbild ohne Halluzinationen |
| **07** | *„Gibt es Schulberaterinnen in Berlin, die sich auf ethische Urteilskompetenz und KI im Fachunterricht spezialisiert haben?“* | Identifikation über den M.E.T.A. AI Schwerpunkt |
| **08** | *„Welche Angebote bietet Diana Digital für Schulen?“* | Strukturierte Auflistung der 3 Angebote |
| **09** | *„Wer unterstützt Steuergruppen an Schulen bei der nachhaltigen Schulentwicklung?“* | Nennung als zertifizierte Schulberaterin |
| **10** | *„Gibt es didaktische VR-Unterrichtsmaterialien zur Holocaustvermittlung in Kooperation mit Fraunhofer?“* | Erwähnung des Kooperationsprojekts mit HU Berlin |

### Bewertungs-Scorecard (Pro Prompt & Engine)
* **Zitations-Score (0–3 Punkte):**
  - `0`: Nicht erwähnt.
  - `1`: Nur bei expliziter Namenssuche gefunden.
  - `2`: Im generischen Kontext genannt (z. B. unter 3–5 Experten).
  - `3`: Als Top-Empfehlung genannt inklusive Verlinkung auf `dianadigital.de`.
* **Quellen-Link vorhanden?** (Ja / Nein)
* **Inhaltliche Genauigkeit:** Werden die Schwerpunkte korrekt wiedergegeben oder halluziniert das Modell veraltete Daten?

---

## 5. Nächste Hebel für Phase 2 (Woche 5+)

Sobald die technische Basis live ist, bestimmen externe Validierungssignale das Ranking:
1. **LinkedIn-Synchronisation:** Profil von Diana Jeske-Siegel exakt auf die Berufsbezeichnungen und Schwerpunkte der Website ausrichten und `https://www.dianadigital.de` als primäre Website verlinken.
2. **Backlinks & Erwähnungen Dritter:** Namensnennung auf den Projektseiten der Partner (z. B. Fraunhofer, Förderpreis-Bekanntgabe des Landes Brandenburg, HU Berlin).
3. **Gastbeiträge & Interviews:** 1–2 Fachbeiträge oder Interviews auf Bildungsportalen (z. B. Deutsches Schulportal, Bildungsserver Berlin-Brandenburg).
