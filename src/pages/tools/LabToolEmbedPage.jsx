import { Link, Navigate } from "react-router-dom";
import { getLabToolUrls } from "../../config/labTools.js";

const TOOL_CONFIG = {
  synth: { urlKey: "synth", title: "Synth Master" },
  detector: { urlKey: "detector", title: "Detector" },
  frequencyGame: { urlKey: "frequencyGame", title: "Find the frequency" },
};

/**
 * @param {{ toolKey: keyof typeof TOOL_CONFIG }} props
 */
export function LabToolEmbedPage({ toolKey }) {
  const cfg = TOOL_CONFIG[toolKey];
  const urls = getLabToolUrls();
  const src = cfg ? urls[cfg.urlKey] : null;

  if (!cfg || !src) {
    return <Navigate to="/herramientas" replace />;
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col">
      <div className="flex flex-wrap items-center gap-3 border-b border-white/10 bg-black/30 px-4 py-3 backdrop-blur-sm">
        <Link
          to="/herramientas"
          className="text-sm font-medium text-accent hover:text-accent/90 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          ← The Lab
        </Link>
        <span className="hidden h-4 w-px bg-white/15 sm:block" aria-hidden />
        <h1 className="m-0 text-sm font-semibold text-white md:text-base">{cfg.title}</h1>
      </div>
      <iframe
        title={cfg.title}
        src={src}
        className="min-h-[min(85vh,720px)] w-full flex-1 border-0 bg-black"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
