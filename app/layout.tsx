import type { Metadata } from "next";
import { Geist_Mono, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Technical Lead · Interactive Node Network",
  description:
    "Personal portfolio as an immersive 3D node network. Technical leadership, architecture, engineering, and open source — explore by clicking orbiting satellites.",
  keywords: [
    "technical lead",
    "software architect",
    "fullstack engineer",
    "portfolio",
    "node network",
    "3D",
  ],
  openGraph: {
    title: "Technical Lead · Interactive Node Network",
    description:
      "Explore an immersive 3D node network showcasing technical leadership, architecture, and engineering.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Lead · Interactive Node Network",
    description:
      "Immersive 3D portfolio — click nodes to explore architecture, leadership, and engineering.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
