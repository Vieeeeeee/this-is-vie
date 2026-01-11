import { Accent, Density } from "@/content/types";

export const accentThemes: Record<Accent, { base: string; on: string; faint: string }> = {
  inkBlue: {
    base: "#1d2a44",
    on: "#e8f0ff",
    faint: "rgba(29, 42, 68, 0.08)",
  },
  amber: {
    base: "#b45309",
    on: "#0f0a05",
    faint: "rgba(180, 83, 9, 0.12)",
  },
  forest: {
    base: "#0f3d2e",
    on: "#e6fff4",
    faint: "rgba(15, 61, 46, 0.12)",
  },
  neutral: {
    base: "#111827",
    on: "#f8fafc",
    faint: "rgba(17, 24, 39, 0.08)",
  },
};

export const densityScale: Record<Density, { stack: string; section: string; cluster: string }> = {
  tight: { stack: "space-y-6", section: "space-y-10", cluster: "gap-2" },
  default: { stack: "space-y-7", section: "space-y-12", cluster: "gap-3" },
  roomy: { stack: "space-y-9", section: "space-y-14", cluster: "gap-4" },
};
