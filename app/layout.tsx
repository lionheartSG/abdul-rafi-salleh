import type { Metadata } from "next";
import { Geist_Mono, Space_Grotesk } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://abdul-rafi-salleh.vercel.app"),
  title: "Abdul Rafi Salleh · Ops-Tech Lead",
  description:
    "Ops-Tech Lead bridging security operations and digital systems. 20 years across law enforcement, aviation security, and fullstack engineering.",
  keywords: [
    "Abdul Rafi Salleh",
    "Ops-Tech Lead",
    "Tech Lead",
    "security operations",
    "digital transformation",
    "fullstack engineer",
    "Next.js",
    "Singapore",
  ],
  openGraph: {
    title: "Abdul Rafi Salleh · Ops-Tech Lead",
    description:
      "Bridging security operations and digital systems. Explore my journey, skills, and projects in an immersive 3D experience.",
    type: "website",
    url: "https://abdul-rafi-salleh.vercel.app",
    siteName: "Abdul Rafi Salleh",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdul Rafi Salleh · Ops-Tech Lead",
    description:
      "Ops-Tech Lead bridging operations and technology. Interactive 3D portfolio.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abdul Rafi Salleh",
  jobTitle: "Tech Lead & Ops-Tech Integrator",
  description:
    "Ops-Tech Lead bridging security operations and digital systems. 20 years across law enforcement, aviation security, and fullstack engineering.",
  url: "https://abdul-rafi-salleh.vercel.app",
  sameAs: [
    "https://www.linkedin.com/in/arbms/",
    "https://github.com/lionheartSG",
  ],
  knowsAbout: [
    "Security Operations",
    "Digital Transformation",
    "Fullstack Development",
    "Next.js",
    "React",
    "TypeScript",
    "PostgreSQL",
    "Systems Integration",
    "Change Management",
    "Leadership",
  ],
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Singapore University of Social Sciences",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "Singapore Polytechnic",
    },
  ],
  nationality: "Singaporean",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <JsonLd data={jsonLd} />
        {children}
      </body>
    </html>
  );
}
