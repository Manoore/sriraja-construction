import type { Metadata } from "next";
import { Bodoni_Moda, IBM_Plex_Mono, Jost, Mukta } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const bodoni = Bodoni_Moda({ subsets: ["latin"], variable: "--font-bodoni" });
const jost = Jost({ subsets: ["latin"], variable: "--font-jost" });
const mukta = Mukta({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-mukta" });
const plex = IBM_Plex_Mono({ subsets: ["latin"], weight: "400", variable: "--font-plex" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name}, Hyderabad`,
  description: site.description,
  openGraph: { title: site.name, description: site.description, url: site.url, type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodoni.variable} ${jost.variable} ${mukta.variable} ${plex.variable}`}>
      <body>{children}</body>
    </html>
  );
}
