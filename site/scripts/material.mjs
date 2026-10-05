// Verschlüsselt das Unterrichtsmaterial für den geschützten Bereich (#/material).
//
//   MATERIAL_PASSWORT='…' node scripts/material.mjs
//
// Liest site/material-quelle/ (nicht im Git!), optional mit liste.json:
//   [{ "datei": "Arbeitsblatt.pdf", "titel": "…", "beschreibung": "…" }]
// Dateien ohne Eintrag bekommen den Dateinamen als Titel.
// Schreibt site/public/material/ komplett neu: neues Salz, also gilt danach nur noch das neue Passwort.
// Zum Schluss entschlüsselt das Skript alles zur Probe wieder.
import { readFileSync, writeFileSync, readdirSync, rmSync, mkdirSync, existsSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { schluesselAusPasswort, verschluesseln, entschluesseln, zuBase64 } from "../src/material/krypto.ts";

const QUELLE = fileURLToPath(new URL("../material-quelle/", import.meta.url));
const ZIEL = fileURLToPath(new URL("../public/material/", import.meta.url));
const TYPEN = { ".pdf": "application/pdf", ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation", ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".odt": "application/vnd.oasis.opendocument.text", ".png": "image/png", ".jpg": "image/jpeg", ".zip": "application/zip", ".txt": "text/plain" };

const passwort = process.env.MATERIAL_PASSWORT ?? "";
if (passwort.length < 12) {
  console.error("MATERIAL_PASSWORT fehlt oder ist kürzer als 12 Zeichen (die Dateien liegen öffentlich, nur das Passwort schützt sie).");
  process.exit(1);
}
if (!existsSync(QUELLE)) {
  console.error(`Ordner fehlt: ${QUELLE}`);
  process.exit(1);
}

const liste = existsSync(join(QUELLE, "liste.json")) ? JSON.parse(readFileSync(join(QUELLE, "liste.json"), "utf8")) : [];
const dateien = readdirSync(QUELLE).filter((f) => f !== "liste.json" && !f.startsWith("."));
if (!dateien.length) {
  console.error("Keine Dateien in material-quelle/.");
  process.exit(1);
}

const info = { v: 1, salt: zuBase64(crypto.getRandomValues(new Uint8Array(16))), iter: 600000 };
const schluessel = await schluesselAusPasswort(passwort, info);

rmSync(ZIEL, { recursive: true, force: true });
mkdirSync(ZIEL, { recursive: true });

const eintraege = [];
for (const [i, datei] of dateien.entries()) {
  const meta = liste.find((e) => e.datei === datei) ?? {};
  const id = `m${String(i + 1).padStart(3, "0")}`;
  const daten = readFileSync(join(QUELLE, datei));
  writeFileSync(join(ZIEL, `${id}.bin`), await verschluesseln(schluessel, new Uint8Array(daten)));
  eintraege.push({ id, titel: meta.titel ?? datei.replace(/\.[^.]+$/, ""), beschreibung: meta.beschreibung ?? "",
    datei, typ: TYPEN[extname(datei).toLowerCase()] ?? "application/octet-stream", groesse: daten.length });
}
writeFileSync(join(ZIEL, "index.bin"), await verschluesseln(schluessel, new TextEncoder().encode(JSON.stringify(eintraege))));
writeFileSync(join(ZIEL, "schluessel.json"), JSON.stringify(info));

// Probe: mit frisch abgeleitetem Schlüssel alles zurück, und ein falsches Passwort muss scheitern.
const probe = await schluesselAusPasswort(passwort, info);
const zurueck = JSON.parse(new TextDecoder().decode(await entschluesseln(probe, readFileSync(join(ZIEL, "index.bin")))));
for (const e of zurueck) {
  const klar = await entschluesseln(probe, readFileSync(join(ZIEL, `${e.id}.bin`)));
  if (!Buffer.from(klar).equals(readFileSync(join(QUELLE, e.datei)))) throw new Error(`Probe fehlgeschlagen: ${e.datei}`);
}
const falsch = await schluesselAusPasswort(passwort + "x", info);
if (await entschluesseln(falsch, readFileSync(join(ZIEL, "index.bin"))).then(() => true, () => false)) {
  throw new Error("Probe fehlgeschlagen: falsches Passwort wurde angenommen");
}
console.log(`${zurueck.length} Datei(en) verschlüsselt nach public/material/, Probe bestanden.`);
