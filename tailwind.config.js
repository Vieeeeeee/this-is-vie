/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.json",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      },
      colors: {
        background: "var(--bg)",
        foreground: "var(--fg)",
        muted: "var(--muted)",
        subtle: "var(--subtle)",
        border: "var(--border)",
        accent: "var(--accent)",
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

