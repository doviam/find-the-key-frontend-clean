import { Outlet } from "react-router-dom";

/**
 * Shell fullscreen para herramientas: sin navbar del sitio ni footer.
 * Ocupa 100dvh; el contenido (synth, detector, etc.) llena el viewport.
 */
export function ToolLayout() {
  return (
    <div className="relative flex h-[100dvh] min-h-0 w-full flex-col overflow-hidden bg-[#030303] text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-15%,rgba(57,255,20,0.09),transparent_52%),linear-gradient(180deg,#060608_0%,#020202_55%,#030303_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14] bg-[linear-gradient(rgba(57,255,20,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(57,255,20,0.04)_1px,transparent_1px)] bg-[size:56px_56px]"
        aria-hidden
      />
      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <Outlet />
      </div>
    </div>
  );
}
