import type { Metadata } from "next";

import { Inter, IBM_Plex_Serif } from "next/font/google"; // Changed serif font to IBM Plex Serif for a more "intellectual" vibe
import "./globals.css";
import content from "@/lib/content";
import { ReactNode } from "react";

const sans = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });
const serif = IBM_Plex_Serif({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap", variable: "--font-serif" });

// Simplified theme script - just checks local storage or system preference
const themeInitScript = `(() => {
  try {
    const stored = window.localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored === 'light' || stored === 'dark' ? stored : prefersDark ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch (e) {}
})();`;

export const metadata: Metadata = {
  metadataBase: new URL(content.site.domain),
  title: content.site.title,
  description: content.site.description,
  alternates: {
    canonical: content.site.domain,
  },
  openGraph: {
    title: content.site.title,
    description: content.site.description,
    url: content.site.domain,
    siteName: content.site.title,
    locale: content.site.language,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: content.site.title,
    description: content.site.description,
    site: content.person.handle,
    creator: content.person.handle,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // Removed dynamic style injection since we assume a fixed minimalist theme now
  return (
    <html lang={content.site.language} suppressHydrationWarning>
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: themeInitScript,
          }}
          suppressHydrationWarning
        />
      </head>
      <body className={`${sans.variable} ${serif.variable}`}>
        {children}
      </body>
    </html>
  );
}
