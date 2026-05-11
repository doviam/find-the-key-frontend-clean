import { LabToolEmbedPage } from "./LabToolEmbedPage.jsx";

/**
 * `/synth` — solo el sintetizador embebido (fullscreen bajo ToolLayout).
 * No Home, sin HeroSection, sin Layout global.
 */
export function SynthPage() {
  return <LabToolEmbedPage toolKey="synth" />;
}
