import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { DEPLOY_BASE, IS_PREVIEW } from "./deployBase";

/* Favicon-Links hier statt in index.html: DEPLOY_BASE ist erst zur Laufzeit bekannt
   (relative Pfade in index.html braechen unter /diana wegen des Funnel-Slash-Bugs). */
function addIcon(rel: string, href: string, type?: string, sizes?: string) {
  const link = document.createElement("link");
  link.rel = rel;
  link.href = href;
  if (type) link.type = type;
  if (sizes) link.sizes = sizes;
  document.head.appendChild(link);
}
addIcon("icon", `${DEPLOY_BASE}favicon.svg`, "image/svg+xml");
addIcon("icon", `${DEPLOY_BASE}favicon-32x32.png`, "image/png", "32x32");
addIcon("icon", `${DEPLOY_BASE}favicon-16x16.png`, "image/png", "16x16");
addIcon("apple-touch-icon", `${DEPLOY_BASE}apple-touch-icon.png`);

// Nur in der internen Vorschau (/diana/) noindex setzen und Titel anpassen
if (IS_PREVIEW) {
  document.title = "diana. – Entwurf (nicht öffentlich)";
  const robots = document.querySelector('meta[name="robots"]');
  if (robots) {
    robots.setAttribute("content", "noindex, nofollow");
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
