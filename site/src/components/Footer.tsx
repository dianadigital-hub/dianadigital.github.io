import { useRoute, RoutePath } from "../router";
import { DEPLOY_BASE } from "../deployBase";
import { Content } from "../types/content";

export function Footer({
  data,
  onOpenLegal,
}: {
  data: Content;
  onOpenLegal: (type: "impressum" | "datenschutz") => void;
}) {
  const { navigate } = useRoute();

  const navLinks: { label: string; to: RoutePath }[] = [
    { label: "Startseite", to: "/" },
    { label: data.meta.navLabelLeistungen || "Angebote", to: "/angebote" },
    { label: data.meta.navLabelProjekte || "Projekte", to: "/projekte" },
    { label: data.meta.navLabelUeberMich || "Über mich", to: "/ueber-mich" },
    { label: data.meta.navLabelKontakt || "Kontakt", to: "/kontakt" },
  ];

  return (
    <footer className="border-t border-[#173530]/10 bg-[#173530] text-[#fffaf0]">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div className="space-y-4 lg:col-span-2">
            <img
              src={`${DEPLOY_BASE}images/logo/logo-horizontal-on-dark.svg`}
              alt={data.meta.brand}
              className="h-10 w-auto object-contain"
            />
            <p className="max-w-md font-serif text-lg leading-relaxed text-[#e9e6da]">
              „Schule gestalten, die Menschen auf eine digitale Zukunft vorbereitet.“
            </p>
            <p className="text-xs uppercase tracking-[0.16em] text-[#a9b9b0]">
              Pädagogische Praxis · Schulentwicklung · Didaktik
            </p>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#e9be5b]">
              Navigation
            </h4>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((item) => (
                <li key={item.to}>
                  <button
                    type="button"
                    onClick={() => navigate(item.to)}
                    className="text-sm text-[#e9e6da] transition-colors hover:text-[#e9be5b] focus:outline-none"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / Rechtliches */}
          <div>
            <h4 className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#e9be5b]">
              Rechtliches
            </h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal("impressum")}
                  className="text-sm text-[#e9e6da] transition-colors hover:text-[#e9be5b] focus:outline-none"
                >
                  Impressum
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal("datenschutz")}
                  className="text-sm text-[#e9e6da] transition-colors hover:text-[#e9be5b] focus:outline-none"
                >
                  Datenschutzerklärung
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate("/kontakt")}
                  className="text-sm text-[#e9e6da] transition-colors hover:text-[#e9be5b] focus:outline-none"
                >
                  Anfrage & Feedback
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#fffaf0]/10 pt-8 text-center text-xs text-[#a9b9b0] sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} Diana Jeske-Siegel. Alle Rechte vorbehalten.</p>
          <p className="tracking-wide">
            Design & Redaktionelle Konzeption im P1-Standard
          </p>
        </div>
      </div>
    </footer>
  );
}
