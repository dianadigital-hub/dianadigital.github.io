import { useEffect, useState } from "react";
import { DraftBanner, PasswordGate, usePasswordGate } from "./PasswordGate";
import { LegalOverlay } from "./legal";
import { DEPLOY_BASE, IS_PREVIEW } from "./deployBase";
import defaultContent from "./content/data.json";
import { Content } from "./types/content";
import { RouterProvider, useRoute } from "./router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { AngebotePage } from "./pages/AngebotePage";
import { ProjektePage } from "./pages/ProjektePage";
import { UeberMichPage } from "./pages/UeberMichPage";
import { KontaktPage } from "./pages/KontaktPage";
import { CmsOverlay } from "./cms/CmsOverlay";

function AppView({
  data,
  onSaveData,
}: {
  data: Content;
  onSaveData: (newData: Content) => void;
}) {
  const { path } = useRoute();
  const [legalOpen, setLegalOpen] = useState<"datenschutz" | "impressum" | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);

  // Body overflow handling when admin or legal is open
  useEffect(() => {
    document.body.style.overflow = adminOpen || legalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [adminOpen, legalOpen]);

  // Impressum/Datenschutz bekommen einen eigenen Verlaufseintrag: Zurück-Taste/-Geste und Esc schließen
  // die Einblendung, statt die Website zu verlassen.
  useEffect(() => {
    const onPop = () => setLegalOpen((window.history.state?.legal as "datenschutz" | "impressum") ?? null);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && window.history.state?.legal) window.history.back();
    };
    window.addEventListener("popstate", onPop);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const openLegal = (page: "datenschutz" | "impressum") => {
    if (window.history.state?.legal) window.history.replaceState({ legal: page }, "");
    else window.history.pushState({ legal: page }, "");
    setLegalOpen(page);
  };

  const closeLegal = () => {
    if (window.history.state?.legal) window.history.back();
    else setLegalOpen(null);
  };

  // Route Switcher
  const renderCurrentPage = () => {
    switch (path) {
      case "/angebote":
        return <AngebotePage data={data} />;
      case "/projekte":
        return <ProjektePage data={data} />;
      case "/ueber-mich":
        return <UeberMichPage data={data} />;
      case "/kontakt":
        return <KontaktPage data={data} />;
      case "/":
      default:
        return <HomePage data={data} />;
    }
  };

  return (
    <main className="overflow-x-clip bg-[#f6f5ef] text-[#12221f] selection:bg-[#e9be5b] selection:text-[#12221f]">
      {IS_PREVIEW && <DraftBanner />}
      <Header data={data} />

      {/* Dynamic Page View */}
      {renderCurrentPage()}

      <Footer data={data} onOpenLegal={openLegal} />
      <LegalOverlay page={legalOpen} onClose={closeLegal} />

      {/* ============ ADMIN CMS TOGGLE BUTTON (nur Vorschau) ============ */}
      {IS_PREVIEW && (
      <button
        type="button"
        onClick={() => setAdminOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-[#173530] px-5 py-2.5 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#fffaf0] shadow-2xl transition-all hover:scale-105 hover:bg-[#12221f] hover:text-[#e9be5b] focus:outline-none"
        aria-label="Inhalts-Editor (CMS) öffnen"
      >
        CMS
      </button>
      )}

      {/* ============ MODULAR ADMIN CMS STUDIO ============ */}
      <CmsOverlay
        open={adminOpen}
        onClose={() => setAdminOpen(false)}
        data={data}
        onSaveData={onSaveData}
      />
    </main>
  );
}

export default function App() {
  const { unlocked, unlock } = usePasswordGate();
  const [data, setData] = useState<Content>(defaultContent as unknown as Content);

  /* Inhalte nachladen mit Cache-Busting */
  useEffect(() => {
    fetch(`${DEPLOY_BASE}content/data.json?t=${Date.now()}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((d: Content) => {
        setData(d);
      })
      .catch(() => {
        // Fallback bleibt defaultContent
      });
  }, []);

  if (IS_PREVIEW && !unlocked) {
    return <PasswordGate onUnlock={unlock} />;
  }

  return (
    <RouterProvider>
      <AppView data={data} onSaveData={setData} />
    </RouterProvider>
  );
}
