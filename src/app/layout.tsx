import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Promptability",
  description: "Transform your AI prompts into powerful, optimized commands",
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: "eC2ESpjkk1_blap_8F1VEOivQlUShdqeB1dC24BuLVU",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://firebase.googleapis.com" />
        <link rel="preconnect" href="https://promptability-a35a1.firebaseapp.com" />
        <link rel="dns-prefetch" href="https://upload.wikimedia.org" />
        <link rel="dns-prefetch" href="https://download.logo.wine" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen overflow-x-hidden`}>
        <AuthProvider>
          <div className="relative z-20 min-h-screen flex flex-col">
            <NavBar />
            <main className="flex-1 pt-16 sm:pt-20">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
