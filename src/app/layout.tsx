import type { Metadata } from "next";
import { Inter as GeistSans } from "next/font/google";
import { Source_Code_Pro as GeistMono } from "next/font/google";
import "./globals.css";

const geistSans = GeistSans({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = GeistMono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: {
    default: 'Dil Se - Bakery E-commerce',
    template: '%s | Dil Se'
  },
  description: 'A modern bakery e-commerce platform',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
