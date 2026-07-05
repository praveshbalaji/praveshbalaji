import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Balaji Manokaran — Full-stack engineer. AI-accelerated shipper.",
  description: "Balaji Manokaran — AI-native full-stack engineer on .NET, React, Next.js and AWS. 4+ years shipping production systems, now 3–5x faster with Cursor and Claude as co-pilots — turning prompts into deployable code. Obsessed with agentic workflows and compressing idea-to-production to hours.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
