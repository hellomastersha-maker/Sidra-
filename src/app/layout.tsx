import type { Metadata } from "next";
import "./globals.css";

const title = "Kalaveeryam – MIAC Arts Fest";
const description = "Welcome to the official web portal for the Kalaveeryam Arts Fest at Maunathul Islam Arabic College, Puthuponnani. Organized by SIDRA.";
const url = "https://kalaveeryam.vercel.app"; // Replace with your actual deployment URL
const imageUrl = `${url}/logo.jpg`; // Make sure logo.jpg is in the public folder

export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description,
    url: url,
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: "Kalaveeryam Arts Fest Logo",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: description,
    images: [imageUrl],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}