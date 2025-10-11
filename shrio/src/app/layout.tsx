import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: {
    default: "Shrio",
    template: "%s | Shrio", 
  },
  description:
    "Shrio is a blazing-fast URL shortener and QR code generator. Shorten long links, share them easily, and create QR codes in one click.",
  keywords: [
    "URL shortener",
    "QR code generator",
    "link shortener",
    "free URL shortener",
    "create QR code",
    "fast link sharing",
  ],
  authors: [{ name: "Shrio" }],
  openGraph: {
    title: "Shrio - Fast URL Shortener & QR Code Generator",
    description:
      "Make your links shorter and smarter. Generate QR codes instantly and share anywhere with Shrio.",
    url: "https://yourdomain.com",
    siteName: "Shrio",
    images: [
      {
        url: "https://yourdomain.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shrio - Shorten URLs & Generate QR Codes",
      },
    ],
    locale: "en_US",
    type: "website",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="w-[80vw] mx-auto max-md:w-[90vw]">
        <Header />
        {children}
      </body>
    </html>
  );
}
