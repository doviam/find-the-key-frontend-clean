import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLabToolUrls } from "../../config/labTools.js";

const TOOL_CONFIG = {
  synth: { urlKey: "synth", title: "Synth Master" },
  detector: { urlKey: "detector", title: "Detector" },
  frequencyGame: { urlKey: "frequencyGame", title: "Find the frequency" },
};

const LOAD_WARN_MS = 10000;

function ToolLoadingOverlay({ label }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-6 bg-black/50 backdrop-blur-[2px]"
      aria-hidden
    >
      <div className="h-px w-40 bg-gradient-to-r from-transparent via-accent/60 to-transparent motion-safe:animate-pulse" />
      <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-accent/80">{label}</p>
      <div className="flex h-8 items-end gap-1">
        {[0.35, 0.7, 1, 0.55, 0.9, 0.45].map((s, i) => (
          <span
            key={i}
            className="w-1 rounded-sm bg-accent/70 motion-safe:animate-pulse"
            style={{ height: `${s * 100}%`, animationDelay: `${i * 0.12}s` }}
          />
        ))}
      </div>
    </div>
  );
}

function ToolFallbackPanel({ title, embedUrl }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-12 text-center">
      <div className="max-w-md space-y-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.45em] text-accent/90">Lab signal</p>
        <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">{title}</h2>
        <p className="text-sm leading-relaxed text-white/45">
          No se detectó respuesta del entorno embebido. En local, monta el proyecto en{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-xs text-accent/90">{embedUrl}</code>{" "}
          o define la variable <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-xs">VITE_LAB_*</code>{" "}
          en Vercel.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/herramientas"
          className="rounded-full border border-accent/35 bg-accent/10 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent shadow-[0_0_32px_-12px_rgba(57,255,20,0.45)] transition hover:border-accent/55 hover:bg-accent/15"
        >
          Volver al Lab
        </Link>
        <Link
          to="/"
          className="rounded-full border border-white/12 bg-white/[0.04] px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/70 transition hover:border-white/25 hover:text-white"
        >
          Inicio
        </Link>
      </div>
    </div>
  );
}

/**
 * Superficie embebida fullscreen para una herramienta (iframe). Sin Layout global.
 *
 * @param {{ toolKey: keyof typeof TOOL_CONFIG }} props
 */
export function LabToolEmbedPage({ toolKey }) {
  const cfg = TOOL_CONFIG[toolKey];
  const urls = getLabToolUrls();
  const src = cfg ? urls[cfg.urlKey] : null;

  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [showSlowHint, setShowSlowHint] = useState(false);

  useEffect(() => {
    setIframeLoaded(false);
    setShowSlowHint(false);
    const slow = window.setTimeout(() => setShowSlowHint(true), LOAD_WARN_MS);
    return () => window.clearTimeout(slow);
  }, [src, toolKey]);

  if (!cfg || !src) {
    return (
      <div className="flex min-h-0 flex-1 flex-col">
        <ToolFallbackPanel title="Herramienta no configurada" embedUrl="—" />
      </div>
    );
  }

  const showStallOverlay = showSlowHint && !iframeLoaded;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="flex shrink-0 flex-wrap items-center gap-3 border-b border-white/[0.07] bg-black/55 px-4 py-2.5 backdrop-blur-md">
        <Link
          to="/herramientas"
          className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/95 transition hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          ← Lab
        </Link>
        <span className="hidden h-3 w-px bg-white/15 sm:block" aria-hidden />
        <h1 className="m-0 text-xs font-semibold uppercase tracking-[0.28em] text-white/90 md:text-sm">{cfg.title}</h1>
      </header>

      <div className="relative min-h-0 flex-1 bg-black">
        <iframe
          title={cfg.title}
          src={src}
          onLoad={() => setIframeLoaded(true)}
          className="absolute inset-0 h-full w-full border-0 bg-black"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        {!iframeLoaded && <ToolLoadingOverlay label="Routing audio engine" />}
        {showStallOverlay && (
          <div className="absolute inset-0 z-[1] overflow-y-auto bg-black/85 backdrop-blur-sm">
            <ToolFallbackPanel title={cfg.title} embedUrl={src} />
          </div>
        )}
      </div>
    </div>
  );
}
