import { FormEvent, useState } from "react";
import { DEPLOY_BASE } from "../deployBase";
import { DownloadIcon } from "../components/Icons";
import { MaterialEintrag, SchluesselInfo, entschluesseln, schluesselAusPasswort } from "../material/krypto";

const BASIS = `${DEPLOY_BASE}material/`;

const ladeBytes = async (pfad: string) => {
  const r = await fetch(`${BASIS}${pfad}`, { cache: "no-store" });
  if (!r.ok) throw new Error(String(r.status));
  return new Uint8Array(await r.arrayBuffer());
};

const groesse = (b: number) => (b < 1024 * 1024 ? `${Math.max(1, Math.round(b / 1024))} KB` : `${(b / 1024 / 1024).toFixed(1)} MB`);

export function MaterialPage() {
  const [passwort, setPasswort] = useState("");
  const [schluessel, setSchluessel] = useState<CryptoKey | null>(null);
  const [liste, setListe] = useState<MaterialEintrag[]>([]);
  const [fehler, setFehler] = useState("");
  const [laedt, setLaedt] = useState(false);

  const entsperren = async (e: FormEvent) => {
    e.preventDefault();
    setLaedt(true);
    setFehler("");
    try {
      const info: SchluesselInfo = await fetch(`${BASIS}schluessel.json`, { cache: "no-store" }).then((r) => {
        if (!r.ok) throw new Error("leer");
        return r.json();
      });
      const k = await schluesselAusPasswort(passwort, info);
      const index = await entschluesseln(k, await ladeBytes("index.bin")).catch(() => {
        throw new Error("passwort");
      });
      setListe(JSON.parse(new TextDecoder().decode(index)));
      setSchluessel(k);
      setPasswort("");
    } catch (err) {
      const grund = (err as Error).message;
      setFehler(
        grund === "passwort"
          ? "Das Passwort stimmt nicht."
          : grund === "leer"
            ? "Hier ist noch kein Material hinterlegt."
            : "Das Material konnte nicht geladen werden. Bitte später erneut versuchen.",
      );
    } finally {
      setLaedt(false);
    }
  };

  const herunterladen = async (m: MaterialEintrag) => {
    if (!schluessel) return;
    try {
      const klar = await entschluesseln(schluessel, await ladeBytes(`${m.id}.bin`));
      const url = URL.createObjectURL(new Blob([klar], { type: m.typ }));
      const a = document.createElement("a");
      a.href = url;
      a.download = m.datei;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch {
      setFehler(`„${m.titel}“ konnte nicht geladen werden.`);
    }
  };

  return (
    <div className="bg-[#f6f5ef] text-[#12221f]">
      <section className="px-5 pt-36 pb-20 sm:px-8 sm:pt-44 sm:pb-28 lg:px-12">
        <div className="mx-auto max-w-[760px]">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#b0872b]">Geschützter Bereich</p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-[#173530] sm:text-5xl">Unterrichtsmaterial</h1>
          <p className="mt-6 max-w-[62ch] text-base leading-relaxed text-[#3d4f4b]">
            Material für Kolleginnen, Kollegen und Kooperationspartner. Den Zugang erhalten Sie persönlich von mir.
            Die Dateien werden erst in Ihrem Browser entschlüsselt; es gibt kein Konto, und es werden keine Daten
            über Sie gespeichert.
          </p>

          {!schluessel ? (
            <form onSubmit={entsperren} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <label className="sr-only" htmlFor="material-passwort">Passwort</label>
              <input
                id="material-passwort"
                type="password"
                autoComplete="current-password"
                value={passwort}
                onChange={(e) => setPasswort(e.target.value)}
                placeholder="Passwort"
                required
                className="min-w-0 flex-1 border border-[#173530]/25 bg-[#fffaf0] px-4 py-3 text-base text-[#12221f] focus:border-[#173530] focus:outline-none"
              />
              <button
                type="submit"
                disabled={laedt}
                className="bg-[#173530] px-6 py-3 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[#fffaf0] transition-colors hover:bg-[#12221f] hover:text-[#e9be5b] disabled:opacity-60"
              >
                {laedt ? "Wird geprüft …" : "Öffnen"}
              </button>
            </form>
          ) : (
            <ul className="mt-10 divide-y divide-[#173530]/10 border-y border-[#173530]/10">
              {liste.map((m) => (
                <li key={m.id} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="font-semibold text-[#173530]">{m.titel}</p>
                    {m.beschreibung && <p className="mt-1 text-sm text-[#3d4f4b]">{m.beschreibung}</p>}
                    <p className="mt-1 text-xs text-[#6b7b77]">
                      {m.datei.split(".").pop()?.toUpperCase()} · {groesse(m.groesse)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => herunterladen(m)}
                    className="inline-flex shrink-0 items-center gap-2 border border-[#173530] px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#173530] transition-colors hover:bg-[#173530] hover:text-[#fffaf0]"
                  >
                    <DownloadIcon className="h-4 w-4" /> Herunterladen
                  </button>
                </li>
              ))}
            </ul>
          )}

          {fehler && <p role="alert" className="mt-4 text-sm text-[#9b2c2c]">{fehler}</p>}
        </div>
      </section>
    </div>
  );
}
