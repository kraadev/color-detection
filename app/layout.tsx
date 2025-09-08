import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Color Detection - Extract Colors from Images",
  description:
    "Easily detect and extract dominant colors from your images. Generate color palettes, check contrast, and explore color harmonies for your design projects.",
  keywords: [
    "color detection",
    "extract colors",
    "color palette generator",
    "image color tool",
    "color harmonies",
    "web design colors",
  ],
  openGraph: {
    title: "Color Detection - Extract Colors from Images",
    description:
      "Upload an image and generate beautiful color palettes instantly.",
    url: "https://color-detection-lyart.vercel.app",
    siteName: "Color Detection",
    images: [
      {
        url: "https://color-detection-lyart.vercel.app/og-image.png", // bukan localhost
        width: 1200,
        height: 630,
        alt: "Color Detection Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Detection - Extract Colors from Images",
    description:
      "Generate color palettes and detect dominant colors from images.",
    images: ["https://color-detection-lyart.vercel.app/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
