import type { Metadata } from "next";
import "./globals.css";
import { appConfig } from "@/constants/content";

export const metadata: Metadata = {
  title: {
    default: `${appConfig.name} | ${appConfig.subtitle}`,
    template: `%s | ${appConfig.name}`
  },
  description:
    "A semantic music discovery experience that recommends songs from emotional confessions using SBERT lyric similarity.",
  keywords: ["music recommendation", "SBERT", "semantic similarity", "NLP", "curhat", "song discovery"],
  openGraph: {
    title: appConfig.name,
    description: appConfig.tagline,
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
