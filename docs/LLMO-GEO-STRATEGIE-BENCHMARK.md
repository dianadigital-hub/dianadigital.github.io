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

## 5. Messergebnisse: T+4-Wochen-Evaluation (Stand: 04.11.2026)

Genau 29 Tage nach Aktivierung der LLMO- und GEO-Maßnahmen (Commit `ed0aa0c` vom 06.10.2026) wurde die erste planmäßige Kontrollmessung über Live-Retrieval-Engines durchgeführt.

### Gesamt-Scorecard (T+4 Wochen)

| Nr. | Test-Prompt | T0 | T+4 | Link? | Score | Live-Befund & Zitationsnachweis |
|:---:|:---|:---:|:---:|:---:|:---:|:---|
| **01** | *SchiLF-Fortbildungen KI Berlin/Brandenburg* | 0 | 1 | Nein | **1/3** | Institutionen (LIBRA, Senat/mobile.schule, fobizz) dominieren. Diana taucht noch nicht generisch in Top 5 auf. |
| **02** | *Referentinnen digitale Schulentwicklung Gymnasien* | 0 | 0 | Nein | **0/3** | Generisches Umfeld von etablierten Keynote-Speakern besetzt (Silke Müller, Dr. Braasch, Paula Friedrich). |
| **03** | *Schulleitungen MEP Berlin/Brandenburg* | 0 | 0 | Nein | **0/3** | Rein staatliche Portale und Institute (LIBRA, BLiQ, Bildungsserver Berlin-Brandenburg). |
| **04** | *Projekt Social Shift oder JobImpact für Schüler* | 0 | 3 | **Ja** | **3/3** | **Volltreffer:** JobImpact wird Diana Jeske-Siegel & [dianadigital.de](https://www.dianadigital.de) als KI-Bewerbungscoach eindeutig zugeschrieben. |
| **05** | *Prompting ohne Technikeuphorie* | 0 | 0 | Nein | **0/3** | Nennung von Dr. Braasch, Prof. Dr. Knopf, ai-fluencer, Joscha Falck. Haltung noch nicht als eigenständiges Ranking-Signal erfasst. |
| **06** | *Wer ist Diana Jeske-Siegel & Schwerpunkte?* | 1 | 3 | **Ja** | **3/3** | **Volltreffer (Top-Zitation):** [dianadigital.de](https://www.dianadigital.de) ist Primärquelle (mehrfach verlinkt). Titel (*Oberstudienrätin, zertifizierte Schulberaterin*), Leitsatz (*„...und dabei menschlich bleibt“*) und Kernschwerpunkte (Entlastung, Binnendifferenzierung, Schulklima) werden 100 % akkurat wiedergegeben. |
| **07** | *Schulberaterinnen ethische Urteilskompetenz & KI* | 0 | 0 | Nein | **0/3** | Primär über Senatskooperationen, Prof. Mühlhoff und Hochschulen (FU Berlin) abgedeckt. |
| **08** | *Welche Angebote bietet Diana Digital für Schulen?* | 0 | 2 | **Ja** | **2/3** | **Teiltreffer:** Diana Jeske-Siegel mit [dianadigital.de](https://www.dianadigital.de) wird mit Fortbildungen, Prozessbegleitung und ethischer Urteilskompetenz zitiert (Abgrenzung zum Uni-Projekt DiAna). |
| **09** | *Steuergruppen nachhaltige Schulentwicklung* | 0 | 0 | Nein | **0/3** | Landesinstitute, Zukunftsstiftung Bildung, BNE-Netzwerke. |
| **10** | *VR-Unterrichtsmaterialien Fraunhofer Holocaust* | 0 | 0 | Nein | **0/3** | Fraunhofer HHI, Ernst Grube, LediZ / LMU München. Eigene Beteiligung wird noch nicht aggregiert. |

**Gesamtergebnis T+4:**
* **Baseline T0:** 1 / 30 Punkte (3 %)
* **Evaluation T+4:** **9 / 30 Punkte (30 %)**
* **Entity- & Brand-Grounding:** **8 / 9 Punkten (89 %)** – Sobald die Person oder eigene Marken/Projekte (Diana Jeske-Siegel, Diana Digital, JobImpact) abgefragt werden, zitiert das System verlässlich `dianadigital.de` als Primärquelle.
* **Kategorie- & Generik-Discovery:** **1 / 21 Punkten (5 %)** – Bei rein generischen Fachsuchen ohne Personenbezug dominieren noch Landesinstitute und Großanbieter.

---

## 6. Weiterentwicklung der Optimierungsstrategie (Phase 2 & Phase 3)

Die Erkenntnis aus der T+4-Messung ist eindeutig:
* **Was On-Page (Schema.org, `llms.txt`, Meta-Tags) leistet:** Schnelles und 100 % präzises Entity-Grounding. Die KI halluziniert nicht mehr über Diana Jeske-Siegel, kennt ihre Titel, Haltungen und Angebote und zitiert `dianadigital.de` als Primärquelle.
* **Wo die Lücke liegt:** Bei unpersonalisierten Suchanfragen (*„Wer bietet SchiLF KI Berlin?“*) reichen reine On-Page-Signale gegen etablierte Landesinstitute und Großverlage noch nicht aus.

Hier setzt die weiterentwickelte 3-Stufen-Roadmap an:

### Stufe 1: Thematische Intent-Pillars & Zitat-Snippets (On-Page Vertiefung)
1. **Themen-Spezifische Landingpages / Deep URLs:**
   - Statt reiner One-Page-Sections eigene kanonische URLs schaffen (z. B. `/schilf-ki-berlin-brandenburg`, `/schulberatung-medienentwicklungsplan`).
   - Diese Seiten liefern den exakten Frage-Antwort-Kontext, nach dem Lehrkräfte und Schulleitungen suchen (Ablauf, Fördermöglichkeiten, Zielgruppen, FAQ).
2. **Definitorische Micro-Snippets & Phrasen-Prägung:**
   - LLMs zitieren bevorzugt kompakte Definitionen und Modelle (z. B. *„Das 3-Phasen-Modell zur KI-Integration von Diana Jeske-Siegel“*). Durch das Schaffen zitierfähiger Nomenklaturen werden KIs dazu gebracht, das Konzept namentlich mit der Urheberin zu verknüpfen.

### Stufe 2: Authority- & Co-Occurrence-Netzwerk (Off-Page GEO)
1. **Verifizierte Co-Occurrences:**
   - Erwähnung der Domain `dianadigital.de` und des Namens im selben Satz auf externen Autoritätsseiten:
     - Preisträgerseite des *Förderpreises Medienkompetenz Brandenburg*
     - Projektseiten der *Humboldt-Universität zu Berlin*
     - Kooperationserwähnung im Rahmen des VR-Holocaust-Projekts mit *Fraunhofer HHI*
2. **LinkedIn-Taxonomie-Gleichlauf:**
   - Exakter Abgleich des LinkedIn-Profils mit den `knowsAbout`-Einträgen aus dem JSON-LD Schema.
   - Primäre Verlinkung der Website im Header und im Kontaktbereich.

### Stufe 3: Kontinuierlicher Monitoring-Zyklus & Multi-Engine-Matrix
Die Messung wird in festen Zyklen über die Multi-Engine-Matrix fortgeschrieben:

| Intervall | Termin | Fokus & Meilenstein | Ziel-Score |
|---|---|---|:---:|
| **T0 (Baseline)** | 06.10.2026 | Nullmessung bei Start technischer Maßnahmen | 1 / 30 |
| **T+4 (Woche 4)** | 04.11.2026 | On-Page Entity-Grounding & Brand-Zitation | **9 / 30** (erreicht) |
| **T+8 (Woche 8)** | Anfang Dez. 2026 | Off-Page Hebel & LinkedIn; Erste generische Nennungen | 15 / 30 |
| **T+12 (Woche 12)**| Januar 2027 | Quartalsabschluss: Etablierung in regionalen Top-3-Listen | 22 / 30 |

---

## 7. Automatisiertes Evaluation-Tooling

Im Verzeichnis `site/scripts/geo-eval.mjs` liegt das standardisierte Evaluierungs-Skript. Es ermöglicht:
1. Automatisiertes Abfragen der 10 Prompts über LLM-Websuche (Perplexity / OpenRouter).
2. Prüfung auf Nennung von Entität und Primärlink `dianadigital.de`.
3. Direkte Ausgabe der aktualisierten Scorecard für das Protokoll.
