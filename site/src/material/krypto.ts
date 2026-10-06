/* Verschlüsselter Materialbereich: Die Seite liegt statisch auf GitHub Pages, dort gibt es keinen
   Server, der ein Passwort prüfen könnte. Deshalb liegen die Dateien nur verschlüsselt im Netz
   (AES-GCM, Schlüssel per PBKDF2 aus dem Passwort) und werden erst im Browser entschlüsselt.
   Dasselbe Modul nutzt scripts/material.mjs beim Verschlüsseln — ein Format, eine Stelle. */

export interface MaterialEintrag {
  id: string;
  titel: string;
  beschreibung: string;
  datei: string;
  typ: string;
  groesse: number;
}

export interface SchluesselInfo {
  v: 1;
  salt: string;
  iter: number;
}

const IV_LAENGE = 12;
type Bytes = Uint8Array<ArrayBuffer>;

export const zuBase64 = (b: Uint8Array) => btoa(String.fromCharCode(...b));
export const ausBase64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

export async function schluesselAusPasswort(passwort: string, info: SchluesselInfo): Promise<CryptoKey> {
  const roh = await crypto.subtle.importKey("raw", new TextEncoder().encode(passwort), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", hash: "SHA-256", salt: ausBase64(info.salt), iterations: info.iter },
    roh,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

export async function verschluesseln(schluessel: CryptoKey, daten: Bytes): Promise<Bytes> {
  const iv = crypto.getRandomValues(new Uint8Array(IV_LAENGE));
  const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, schluessel, daten));
  const aus = new Uint8Array(IV_LAENGE + ct.length);
  aus.set(iv);
  aus.set(ct, IV_LAENGE);
  return aus;
}

/** Wirft bei falschem Passwort (GCM-Prüfsumme passt nicht). */
export async function entschluesseln(schluessel: CryptoKey, daten: Bytes): Promise<Bytes> {
  const iv = daten.slice(0, IV_LAENGE);
  return new Uint8Array(await crypto.subtle.decrypt({ name: "AES-GCM", iv }, schluessel, daten.slice(IV_LAENGE)));
}
