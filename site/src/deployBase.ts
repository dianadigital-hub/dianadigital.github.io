/* Statt import.meta.env.BASE_URL (das vite-plugin-singlefile ohnehin auf "./" erzwingt):
   der Tailscale-Funnel gibt beim Aufruf ohne Trailing-Slash (/diana statt /diana/) keinen
   Redirect an den Browser weiter, dadurch loesen relative "./"-Pfade falsch auf.
   Per VITE_DEPLOY_BASE steuerbar: "/diana/" fuer servermitte, "/" fuer die eigene Domain
   (Root-Deployment via GitHub Pages). */
export const DEPLOY_BASE = import.meta.env.VITE_DEPLOY_BASE ?? "/diana/";
