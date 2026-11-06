# Anleitung: dianadigital.de bei Bing anmelden

**Warum das wichtig ist:** Microsoft Copilot und die Websuche von ChatGPT greifen unter anderem auf den Bing-Suchindex zurück. Was Bing nicht kennt, kann dort schlechter zitiert werden. Mit den Bing Webmaster Tools sagst du Bing: „Diese Seite gehört mir, hier ist alles, bitte regelmäßig vorbeischauen.“

Dauer: ca. 15 Minuten. Kosten: keine.

---

## Schritt 1: Anmelden

1. Öffne **https://www.bing.com/webmasters**
2. Klicke auf **Anmelden** und melde dich mit einem Microsoft-, Google- oder Facebook-Konto an. Am einfachsten: das Google-Konto, mit dem du auch sonst arbeitest.

## Schritt 2: Seite hinzufügen

Du siehst zwei Wege. Nimm den, der zu dir passt:

**Weg A: Import aus der Google Search Console** (nur wenn du dianadigital.de dort schon angemeldet hast)
- Auf **Importieren** klicken, Google-Konto freigeben, `www.dianadigital.de` auswählen.
- Fertig, die Seite ist automatisch bestätigt. Weiter mit Schritt 3.

**Weg B: Manuell hinzufügen**
1. Bei „Website manuell hinzufügen“ eintragen: `https://www.dianadigital.de/` und **Hinzufügen** klicken.
2. Bing will jetzt wissen, ob die Seite wirklich dir gehört. Wähle **HTML-Meta-Tag**.
3. Du bekommst eine Zeile wie `<meta name="msvalidate.01" content="…" />`. **Kopiere sie und schick sie Friedrich.** Er baut sie in die Seite ein.
4. Sobald er Bescheid gibt (die Seite ist dann neu veröffentlicht), klickst du auf **Überprüfen**.

## Schritt 3: Sitemap einreichen

1. Links im Menü **Sitemaps** öffnen.
2. **Sitemap übermitteln** klicken und eintragen: `https://www.dianadigital.de/sitemap.xml`
3. Status sollte nach einiger Zeit „Erfolgreich“ zeigen.

## Schritt 4: Startseite direkt anstoßen

1. Links **URL-Überprüfung** öffnen.
2. `https://www.dianadigital.de/` eintragen und prüfen.
3. Falls angeboten: **Indizierung anfordern** klicken.

## Schritt 5: Nichts weiter tun – das läuft automatisch

Bei jeder Veröffentlichung der Seite meldet sie sich jetzt selbst bei Bing (Technik: *IndexNow*). Unter **IndexNow** in den Webmaster Tools siehst du diese Meldungen. Du musst dafür nichts einstellen.

## Nach 1–2 Wochen einmal reinschauen

- **Suchleistung:** Bei welchen Suchbegriffen taucht die Seite auf, wie oft wird geklickt?
- **Website-Überprüfung / Empfehlungen:** Meldet Bing Fehler? Dann einen Screenshot an Friedrich.
- **robots.txt-Tester:** Sollte „Zulässig“ für die Startseite zeigen.

---

## Technischer Hinweis (für Friedrich)

- `site/public/robots.txt`: Eine Gruppe für alle Crawler. Vorher galt `Disallow` nur für den letzten Bot-Block (Applebot-Extended), und `/#/material` ist wirkungslos, weil der Teil nach `#` nie beim Server ankommt.
- `site/public/sitemap.xml`: Nur noch die Startseite. `/angebote`, `/projekte`, `/ueber-mich`, `/kontakt` lieferten live **404**, weil die Seite Hash-Routen (`/#/angebote`) nutzt. Damit Unterseiten einzeln in Suchmaschinen und KI-Antworten auftauchen, müssten sie als echte URLs vorgerendert werden (größerer Umbau, eigener Schritt).
- IndexNow: Schlüsseldatei `site/public/48f1c414bef50781cca834ac424a02f2.txt` (absichtlich öffentlich), Ping als letzter Schritt in `.github/workflows/deploy-pages.yml`, schlägt den Deploy bei Fehlern nicht fehl.
- Meta-Tag aus Weg B gehört in `site/index.html` in den `<head>`.
