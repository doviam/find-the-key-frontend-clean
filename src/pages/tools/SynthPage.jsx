import { LabToolEmbedPage } from "./LabToolEmbedPage.jsx";

/** Ruta SPA: `/synth` — iframe → ver `getLabToolUrls()` en `config/labTools.js`. */
export function SynthPage() {
  return <LabToolEmbedPage toolKey="synth" />;
}
