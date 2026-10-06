import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/navbar";
import ScrollToTopClient from "./components/ScrollToTopClient";
import Footer from "./components/footer/footer";
import ScrollPlane from "./components/scrollbar/ScrollPlane";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://teamtejas.vercel.app'),
  title: "Team Tejas | Aerospace & Aero Design",
  description: "Official website of Team Tejas. We are a premier student-led aerospace engineering team focused on building cutting-edge UAVs, RC aircraft, and competing in the SAE Aero Design Challenge.",
  keywords: [
    "Team Tejas",
    "Team Tejas Aerospace",
    "SAE Aero Design",
    "SAE DDC",
    "UAV Engineering",
    "Student Aerospace Team",
    "RC Aircraft",
    "Drone Design",
    "Aero Design Challenge",
    "Engineering"
  ],
  authors: [{ name: "Team Tejas" }],
  creator: "Team Tejas Webmasters",
  publisher: "Team Tejas",
  openGraph: {
    title: "Team Tejas | Student-led Aerospace Innovation",
    description: "Official website of Team Tejas. Pushing the boundaries of autonomous and remote-controlled flight on a national stage.",
    siteName: "Team Tejas",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Team Tejas",
    description: "Student-led aerospace innovation driven by precision, teamwork, and performance.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script type="importmap">
          {`{
    "imports": {
      "three": "https://cdn.jsdelivr.net/npm/three@0.182.0/build/three.module.js",
      "three/examples/jsm/": "https://cdn.jsdelivr.net/npm/three@0.182.0/examples/jsm/"
    }
  }`}
        </script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
        <ScrollToTopClient />
        <Navbar />
        {/* global custom plane scrollbar overlay */}
        <ScrollPlane />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
