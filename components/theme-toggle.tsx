"use client";

import { useEffect, useState } from "react";

const getPreferredTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyTheme = (theme: "light" | "dark") => {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  window.localStorage.setItem("theme", theme);
};

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    // Read theme only on client after mount
    const current = document.documentElement.dataset.theme;
    const initialTheme = (current === "light" || current === "dark") ? current : getPreferredTheme();
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (theme) applyTheme(theme);
  }, [theme]);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
  };

  // Render placeholder during SSR to avoid hydration mismatch
  if (theme === null) {
    return (
      <button
        type="button"
        className="button-ghost text-sm"
        aria-label="切换浅色/深色"
      >
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="button-ghost text-sm"
      aria-label="切换浅色/深色"
    >
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}
