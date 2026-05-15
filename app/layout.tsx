import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Moodfy | AI Song Recommendation",
    template: "%s | Moodfy"
  },
  description:
    "A semantic music discovery experience that recommends songs from emotional confessions using SBERT lyric similarity.",
  keywords: ["music recommendation", "SBERT", "semantic similarity", "NLP", "curhat", "song discovery"],
  openGraph: {
    title: "Moodfy",
    description: "Find songs that understand the feeling behind your words.",
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
