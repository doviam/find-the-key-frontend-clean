/**
 * Rutas SPA de cada herramienta (deben coincidir con las `<Route>` en App.jsx).
 */
export const LAB_TOOL_ROUTES = {
  synth: "/synth",
  detector: "/detector",
  findthefrequency: "/findthefrequency",
};

/**
 * URLs del documento embebido (iframe).
 * En dev, Vite sirve /lab/* desde el monorepo (ver vite.config.js).
 * En producción, define VITE_LAB_* o copia los builds a public/lab/.
 */
export function getLabToolUrls() {
  return {
    synth: import.meta.env.VITE_LAB_SYNTH_URL || "/lab/synth/",
    detector: import.meta.env.VITE_LAB_DETECTOR_URL || "/lab/detector/",
    frequencyGame: import.meta.env.VITE_LAB_FREQUENCY_URL || "/lab/find-the-frequency/",
  };
}
