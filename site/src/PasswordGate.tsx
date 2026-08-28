import { FormEvent, useState } from "react";

const DRAFT_PASSWORD = "DianaEntwurf26!";
const STORAGE_KEY = "diana-draft-unlocked";

/* ponytail: client-side check only hides the draft from casual visitors & search engines,
   it's not real access control (password ships inside the JS bundle). Upgrade to
   server-side Basic Auth on servermitte once that's set up. */
export function usePasswordGate() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(STORAGE_KEY) === "1");
  return {
    unlocked,
    unlock: () => { sessionStorage.setItem(STORAGE_KEY, "1"); setUnlocked(true); },
  };
}

export function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (value === DRAFT_PASSWORD) onUnlock();
    else setError(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#173530] px-6">
      <form onSubmit={submit} className="w-full max-w-sm text-center">
        <span className="font-serif text-5xl tracking-[-0.08em] text-white">diana.</span>
        <p className="mt-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#e9be5b]">Entwurf — nicht öffentlich</p>
        <p className="mt-6 text-sm leading-6 text-white/70">Diese Website befindet sich in Vorbereitung. Bitte Zugangspasswort eingeben.</p>
        <input
          type="password"
          autoFocus
          value={value}
          onChange={(e) => { setValue(e.target.value); setError(false); }}
          className="mt-6 w-full border-b border-white/40 bg-transparent py-2 text-center text-white outline-none focus:border-[#e9be5b]"
          placeholder="Passwort"
        />
        {error && <p className="mt-3 text-xs text-[#e9be5b]">Falsches Passwort.</p>}
        <button type="submit" className="button-primary mt-7 w-full justify-center">Zugang freischalten</button>
      </form>
    </div>
  );
}

export function DraftBanner() {
  return (
    <div className="fixed inset-x-0 top-0 z-[70] flex h-8 items-center justify-center bg-[#c85d35] px-4 text-center text-[0.62rem] font-bold uppercase tracking-[0.15em] text-white">
      Entwurf — Vorschau, nicht die finale Version
    </div>
  );
}
