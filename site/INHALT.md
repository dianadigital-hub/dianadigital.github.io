# Inhalt, Konzept & Anleitung — diana.

Ergänzt [`DESIGN.md`](DESIGN.md) (visuelle Definitionen) um alle Texte, die Grundidee der Seite und eine Anleitung zum Bearbeiten/Deployen. Zielgruppe dieses Dokuments: Diana selbst und alle, die später am Inhalt oder Code weiterarbeiten.

---

## 1. Konzept

**Was die Seite ist:** Ein persönliches berufliches Portfolio für Diana Jeske-Siegel — Oberstudienrätin, Beraterin und Fortbildnerin für digitale Unterrichtsentwicklung, KI und Medienbildung. Kein Unternehmensauftritt, keine Verkaufsseite — Positionierung als vertrauenswürdige, erfahrene Ansprechpartnerin für Schulen, Schulleitungen und Kollegien.

**Zielgruppen:** Schulleitungen und Kollegien, die Fortbildung oder Beratung suchen · Institutionen/Kooperationspartner (z. B. Fraunhofer, Humboldt-Universität) · Personen, die ihre Projekte kennenlernen wollen.

**Tonalität:** Ruhig, reflektiert, fachlich fundiert — bewusst *nicht* techno-euphorisch. Leitmotiv (Philosophie-Sektion): „Bildung ist und bleibt mehr als Technologie.“ KI/Digitalisierung wird immer im pädagogischen, nicht im rein technischen Kontext gerahmt.

**Aufbau der Seite (Begründung der Reihenfolge):**

1. **Hero** — Wer ist das, worum geht es, direkter Einstieg zur Kontaktaufnahme
2. **Philosophie/Haltung** — Grundhaltung *vor* den Leistungen, damit klar ist, aus welcher Perspektive beraten wird
3. **Leistungen** — konkrete, buchbare Angebote (3 Zielgruppen: Lehrkräfte, Schulen, Schulleitungen)
4. **Projekte** — Referenzen/Nachweise, dass die Haltung aus Punkt 2 in echten Projekten wirksam wird
5. **Qualifikation & Erfahrung** — Vertrauensbasis/Legitimation
6. **Über mich** — die Person dahinter, mit Porträt und persönlichem Zitat
7. **Kontakt** — Handlungsaufforderung am Ende, zwei Modi (Anfrage vs. Feedback)

**Visuelle Definitionen** (Farben, Typografie, Spacing, Animationen, Komponenten): siehe [`DESIGN.md`](DESIGN.md).

---

## 2. Alle Texte

Quelle: [`public/content/data.json`](public/content/data.json), sofern nicht anders vermerkt. Über das CMS editierbar, außer wo vermerkt.

### Navigation
- Marke: **diana.** / Subline: **JESKE-SIEGEL**
- Leistungen · Projekte · Über mich · Kontakt

### Hero
- Tagline: *„Digitale Unterrichtsentwicklung. KI. Medienbildung.“*
- Headline: *„Schule gestalten, die Menschen auf eine digitale Zukunft vorbereitet.“*
- Subheadline: *„Beratung, Fortbildung und Impulse für eine digitale Bildung, die menschlich bleibt.“*
- CTA primär: „Zusammenarbeit anfragen“ · CTA sekundär: „Leistungen entdecken“
- Scroll-Hinweis: „Scroll to explore“
- Bild-Alt-Text: „Fortbildungssituation mit Lehrkräften an einem digitalen Whiteboard“

### Philosophie / Haltung
- Label: „Haltung“
- Zitat: *„Digitalisierung ist Teil unserer Zukunft. Bildung ist und bleibt jedoch mehr als Technologie.“*
- Text: *„Lernen braucht Beziehung, Kommunikation, soziale Erfahrung und echte Begegnung. Gleichzeitig sollen junge Menschen digitale Entwicklungen kritisch beurteilen, verantwortungsvoll handeln und ethische Urteilskraft entwickeln.“*

### Leistungen
Label: „Expertise“ · Headline: „Digital denken. Pädagogisch handeln.“ · Subheadline: *„Praxisnahe Fortbildung und strategische Beratung für Lehrkräfte, Schulen und Schulleitungen.“*

| Nr. | Titel | Beschreibung | Button |
|---|---|---|---|
| 01 | Fortbildungen für Lehrkräfte | Praxisnahe Formate zu KI, digitaler Unterrichtsentwicklung, Medienbildung und neuen Lernformen. Immer mit Blick auf den didaktischen Mehrwert. | Fortbildung anfragen |
| 02 | Beratung von Schulen | Digitale Strategien entwickeln, Prozesse gestalten und Strukturen im Schulalltag verankern — gemeinsam, realistisch und nachhaltig. | Schulentwicklung besprechen |
| 03 | Beratung von Schulleitungen | Strategische Klarheit für Digitalisierung, KI und Schulentwicklung. Pädagogische, organisatorische und technische Perspektiven kommen zusammen. | Gespräch vereinbaren |

**Fokus** (eigener Block am Ende der Sektion): Label „Fokus“ · Titel „KI, Medienbildung und ethische Urteilskraft.“ · Text: *„KI verändert Lernen, Arbeiten und gesellschaftliche Entscheidungsprozesse. Schule muss digitale Kompetenzen, kritisches Denken, Medienkompetenz und ethische Urteilskraft gleichermaßen fördern.“*

### Projekte
Label: „Ausgewählte Projekte“ · Headline: „Innovation wird wirksam, wenn sie Haltung zeigt.“

| Kategorie | Titel | Beschreibung | Hinweis | Link |
|---|---|---|---|---|
| Berufsorientierung | **JobImpact** | Ein Bewerbungs-Coach für Schüler:innen der 9. Klasse: Stärken entdecken, Lebenslauf, Anschreiben und Vorstellungsgespräch üben — anonym, DSGVO-sicher und kostenlos für Schulen. | Gemeinsam mit meinem Bruder entwickelt — aktuell im Pilotbetrieb in Berlin. | „Pilot ansehen“ → `servermitte.tailecbf0f.ts.net/pilot` |
| Demokratiebildung | Social Shift | Ein medienpädagogisches Projekt für Medienkompetenz, gesellschaftliche Teilhabe und reflektierte Meinungsbildung. | Ausgezeichnet mit dem Förderpreis Medienkompetenz stärkt Brandenburg. | — |
| Virtual Reality | Holocaustvermittlung in VR | Didaktische Materialien für immersive Zeitzeugeninterviews, entwickelt in Kooperation mit dem Fraunhofer-Institut und der Humboldt-Universität zu Berlin. | Historisches Lernen verantwortungsvoll in neue Erfahrungsräume übersetzen. | — |
| Schulentwicklung | Steuergruppe Digitalisierung | Leitung und Koordination eines Entwicklungsteams mit Fokus auf Strategie, Evaluation, Fortbildungsplanung und Projektinitiierung. | Entwicklung braucht Orientierung, Beteiligung und einen tragfähigen Prozess. | — |
| Unterrichtsentwicklung | Digitale Lern- und Fortbildungsformate | Entwicklung und Erprobung digitaler Lernsettings sowie Fortbildungsformate für neue Medien, KI und zeitgemäße Unterrichtsgestaltung. | Vom einzelnen Impuls zur nachhaltig gelebten Praxis. | — |

*Neues Projekt mit externem Link hinzufügen: im JSON `"href"` und optional `"linkLabel"` beim Projekt-Objekt ergänzen — der Link erscheint dann automatisch.*

### Qualifikation & Erfahrung
Label: „Qualifikation & Erfahrung“ · Headline: „Fundiert. Erfahren. Zugewandt.“

1. **Digitale Unterrichtsentwicklung** — Zusatzstudium und kontinuierliche fachliche Arbeit an digitalen Lehr- und Lernprozessen.
2. **Schulentwicklung & Prozessbegleitung** — Zertifizierte Schulberaterin mit Erfahrung in Moderation und der Begleitung von Entwicklungsprozessen.
3. **Künstliche Intelligenz (M.E.T.A. AI)** — Zusatzqualifikation zu KI, Bildung und verantwortungsvoller Anwendung digitaler Systeme.
4. **Beratung, Steuerung & Fortbildung** — Mehrjährige Erfahrung in Digitalberatung, Unterrichtsentwicklung, Fortbildung und Teamkoordination.

### Über mich
- Label: „Über mich“ · Name: **Diana Jeske-Siegel** · Rolle: „Oberstudienrätin, Lehrerin, Beraterin und Fortbildnerin“
- Headline: „Digitaler Wandel braucht einen menschlichen Kompass.“
- Absätze:
  1. *„Schulentwicklungsprozesse sind heute nicht mehr ohne digitale Transformation zu denken. Als Lehrerin kenne ich Chancen und ganz praktische Herausforderungen im Schulalltag.“*
  2. *„Ausgangspunkt sind immer vorhandene Ressourcen und konkrete Entwicklungsbedarfe. Daraus entstehen realistische Ziele, passende Formate und nachhaltige Strukturen.“*
  3. *„Es geht nicht darum, möglichst viel Technologie in den Unterricht zu bringen. Digitale Werkzeuge sollen Lernen, Lehren und schulische Prozesse sinnvoll unterstützen.“*
  4. *„Digitale Gesundheit und AI Literacy bilden dabei ein wichtiges Fundament — für einen selbstbestimmten, kritischen und verantwortungsvollen Umgang mit Technologie.“*
- Zitat: *„Gute digitale Bildung beginnt für mich nicht mit einem Gerät oder einer App. Sie beginnt mit der Frage, was junge Menschen für ihre Zukunft brauchen und wie Schule sie dabei bestmöglich unterstützen kann.“*

### Kontakt
- Label: „Kontakt & Feedback“ · Headline: „Lassen Sie uns Schule weiterdenken.“
- Text: *„Ob Fortbildung, strategische Beratung, Projekt oder fachlicher Austausch: Ich freue mich auf Ihre Nachricht.“*
- Themen-Dropdown (Modus „Anfrage“): Fortbildung für das Kollegium · Beratung einer Schule · Beratung einer Schulleitung · Projekt oder Kooperation · Vortrag oder Veranstaltung · Fachlicher Austausch
- Datenschutz-Checkbox-Text: „Ich habe den Datenschutzhinweis zur Kenntnis genommen und stimme der Verarbeitung meiner Angaben zur Kontaktaufnahme zu.“
- Feedback-Zusatz-Checkbox: „Meine Rückmeldung darf anonymisiert veröffentlicht werden.“
- Erfolgsmeldung Anfrage: *„Ihre Anfrage ist bei mir eingegangen. Ich melde mich zeitnah bei Ihnen zurück.“*
- Erfolgsmeldung Feedback: *„Ihre Rückmeldung ist bei mir eingegangen. Vielen Dank für Ihre Zeit.“*

### Footer
- Marke „diana.“ + Subline „Digitale Unterrichtsentwicklung. KI. Medienbildung.“
- Links: Kontakt · Datenschutz · Impressum · CMS · Copyright-Jahr (automatisch aktuelles Jahr)

### Passwort-Gate & Entwurfs-Banner
*(statisch in `PasswordGate.tsx`, **nicht** über das CMS steuerbar)*

- Gate-Überschrift: „diana.“ / „Entwurf — nicht öffentlich“
- Gate-Text: „Diese Website befindet sich in Vorbereitung. Bitte Zugangspasswort eingeben.“
- Fehlermeldung: „Falsches Passwort.“
- Button: „Zugang freischalten“
- Banner (immer sichtbar nach Login): „Entwurf — Vorschau, nicht die finale Version“

### Datenschutz *(vollständig, in `legal.tsx`)*

**1. Verantwortliche** — Diana Jeske-Siegel, Postfach **[Nummer]**, **[PLZ]** Berlin-Köpenick, Deutschland · E-Mail: **[E-Mail-Adresse]**

**2. Allgemeines zur Datenverarbeitung** — Personenbezogene Daten werden nur verarbeitet, soweit für Betrieb der Website, Bearbeitung von Kontaktanfragen oder aufgrund gesetzlicher Verpflichtung erforderlich. Kein Verkauf, keine Weitergabe zu Werbezwecken.

**3. Besuch der Website** — Technische Informationen (IP-Adresse, Zugriffszeitpunkt, aufgerufene Seiten, Browsertyp, Betriebssystem) können durch den Webserver/Website-Dienst verarbeitet werden, zur technischen Bereitstellung, Sicherheit und Stabilität. Richtet sich zusätzlich nach den Datenschutzbestimmungen des Hosting-/Websiteanbieters.

**4. Kontaktformular** — Verarbeitung der eingegebenen Angaben (Name, E-Mail, Anfragegrund, Nachricht), ausschließlich zur Bearbeitung der Anfrage. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse), ggf. lit. b (Vertragsanbahnung). Löschung sobald nicht mehr erforderlich.

**5. Empfänger und technische Dienstleister** — Technische Dienstleister möglich (Hosting, Websitebereitstellung, E-Mail, Kontaktanfragen-Verarbeitung) im Rahmen der gesetzlichen Vorgaben; konkrete Dienstleister hängen von der technischen Konfiguration ab.

**6. Cookies und ähnliche Technologien** — Aktuell keine nicht erforderlichen Cookies zu Werbe-, Tracking- oder Analysezwecken. Technisch notwendige Cookies nur für sicheren, funktionsfähigen Betrieb.

**7. Externe Inhalte und Links** — Externe Inhalte/Links möglich; auf deren Datenverarbeitung besteht kein Einfluss, verantwortlich ist der jeweilige Anbieter.

**8. Rechte betroffener Personen** — Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerspruch, Widerruf einer Einwilligung; Beschwerderecht bei einer Datenschutzaufsichtsbehörde.

**9. Aktualität** — Wird angepasst bei Änderungen der technischen Ausstattung oder Datenverarbeitung. Stand: **[Monat Jahr]**

### Impressum *(vollständig, in `legal.tsx`)*

**Angaben gemäß § 5 DDG** — Diana Jeske-Siegel, **[ggf. vollständiger Vorname]**, Postfach **[Nummer]**, **[PLZ]** Berlin-Köpenick, Deutschland · E-Mail: **[E-Mail-Adresse]**

**Zweck dieser Website** — Persönliches berufliches Portfolio zur Darstellung beruflicher Erfahrungen, Projekte, Qualifikationen und fachlicher Arbeitsschwerpunkte (digitale Bildung, Medienbildung, KI, Schulentwicklung). Kein privates gewerbliches Angebot für Beratungs-, Fortbildungs- oder sonstige Dienstleistungen. Bezug auf Tätigkeit als Lehrkraft sowie als Beraterin/Fortbildnerin für BliQ. Kein Betrieb im Namen des Senats für Bildung, Jugend und Familie (SenBJF), des BliQ oder einer anderen öffentlichen Stelle.

**Verantwortlich für die Inhalte** — Diana Jeske-Siegel, **[Anschrift entsprechend der rechtlich erforderlichen Anschrift]** · E-Mail: **[E-Mail-Adresse]**

**Haftung für Inhalte** — Inhalte mit Sorgfalt erstellt, keine Gewähr für Richtigkeit/Vollständigkeit/Aktualität. Verantwortlich nach allgemeinen gesetzlichen Vorschriften.

**Haftung für Links** — Keine Kontrolle über verlinkte Fremdinhalte; verantwortlich ist der jeweilige Betreiber. Zum Zeitpunkt der Verlinkung keine erkennbaren Rechtsverstöße.

**Urheberrecht** — Inhalte unterliegen deutschem Urheberrecht; Vervielfältigung/Bearbeitung/Verbreitung außerhalb der Grenzen des Urheberrechts bedarf Zustimmung. Rechte Dritter werden beachtet.

**Technische Umsetzung** *(neu ergänzt, nicht Teil der Original-Vorlage)* — Friedrich Börner, `servermitte.tailecbf0f.ts.net/fb`

> ⚠️ **Vor Live-Gang zwingend auszufüllen:** alle gelb markierten Platzhalter — Postfach-Nummer, PLZ, vollständiger Vorname, E-Mail-Adresse (mehrfach), vollständige Anschrift, Monat/Jahr des Stands. Ohne diese Angaben ist das Impressum rechtlich nicht vollständig.

---

## 3. Anleitung

### 3.1 Texte ändern (CMS-Editor)

1. Auf der Live-Seite unten rechts (oder im Footer) auf **„CMS“** klicken — öffnet den Inhalts-Editor (nur nach Passwort-Login sichtbar).
2. Texte in den Feldern direkt bearbeiten.
3. Unten auf **„Daten als JSON herunterladen“** klicken.
4. Die heruntergeladene `data.json` ersetzt die Datei [`site/public/content/data.json`](public/content/data.json) im Projekt.
5. Änderung committen und deployen (siehe 3.3).

> Der CMS-Editor deckt aktuell nur einen Teil der Felder ab (Hero, Philosophie, Leistungen-Beschreibungen, Über-mich-Absätze, Kontakt-Headline). Für alles andere (Projekte, Qualifikationen, Footer-Texte, Datenschutz/Impressum) direkt die Datei bearbeiten — Datenschutz/Impressum liegen fest codiert in [`site/src/legal.tsx`](src/legal.tsx), nicht im JSON.

### 3.2 Lokal entwickeln

```bash
cd site
npm install
npm run dev      # Entwicklungsserver mit Live-Reload
npm run build    # Produktions-Build nach site/dist
```

Vor jedem Build/Commit sinnvoll: `npx tsc --noEmit` (Type-Check).

### 3.3 Deployment — zwei Ziele

Die Seite wird aktuell an zwei Orten gebaut, mit unterschiedlicher Basis-Pfad-Konfiguration (`VITE_DEPLOY_BASE`, siehe [`vite.config.ts`](vite.config.ts) / `App.tsx`):

| Ziel | Zweck | Basis-Pfad | Wie |
|---|---|---|---|
| `servermitte.tailecbf0f.ts.net/diana` | Privates Staging (Passwort-geschützt) | `/diana/` (Standard beim Build) | `npm run build`, dann Dateien aus `site/dist/` manuell auf den Server kopieren |
| `www.dianadigital.de` (GitHub Pages) | Zukünftige öffentliche Domain | `/` (Root) | `VITE_DEPLOY_BASE=/ npm run build`, automatisch via GitHub Actions bei Push auf `main` — **sobald der Workflow eingerichtet ist** (siehe Abschnitt 3.5) |

### 3.4 Umgebungsvariablen

In `site/.env` (nicht eingecheckt, siehe [`.env.example`](.env.example)):

```
VITE_FORMSPREE_CONTACT_ID=xjyvvjoz
VITE_FORMSPREE_FEEDBACK_ID=xqpkkwlr
VITE_DEPLOY_BASE=/diana/
```

Ohne gesetzte Formspree-IDs läuft das Formular nur simuliert (kein echter Versand).

### 3.5 Offene Punkte / TODOs

- [ ] **Platzhalter in Datenschutz/Impressum ausfüllen** (siehe Abschnitt 2) — sonst rechtlich unvollständig
- [x] ~~Erfolgsmeldungen im Kontaktformular umformulieren~~ — erledigt
- [ ] **GitHub-Actions-Workflow** (`.github/workflows/deploy-pages.yml`) muss manuell im Ziel-Repo angelegt werden (Details im zugehörigen PR — konnte wegen fehlendem Token-Scope nicht mitgepusht werden)
- [ ] **Repo-Settings → Pages** auf „GitHub Actions“ als Quelle umstellen
- [ ] **Formspree-IDs als Actions-Secrets** hinterlegen (`VITE_FORMSPREE_CONTACT_ID`, `VITE_FORMSPREE_FEEDBACK_ID`)
- [ ] Passwortschutz ist rein clientseitig (siehe Kommentar in `PasswordGate.tsx`) — für echten Schutz später Server-seitige Basic-Auth ergänzen
- [ ] „ENTWURF“-Banner und Passwort-Gate entfernen, sobald die Seite offiziell live geht

### 3.6 Wo liegt was

```
site/
├── DESIGN.md              ← visuelle Definitionen (Farben, Typo, Spacing, Animationen)
├── INHALT.md               ← diese Datei
├── public/
│   ├── content/data.json  ← über CMS editierbare Texte
│   ├── images/             ← hero.png, portrait.jpg
│   └── CNAME               ← Zieldomain für GitHub Pages
└── src/
    ├── App.tsx              ← Hauptkomponente, alle Sektionen, CMS-Editor
    ├── PasswordGate.tsx     ← Zugangs-Gate + Entwurfs-Banner
    ├── legal.tsx            ← Datenschutz/Impressum (fest codiert)
    └── index.css            ← globale Styles, Animationen, Fonts
```
