import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kalaveeryam – MIAC Arts Fest",
  description: "Kalaveeryam – MIAC Arts Fest, Maunathul Islam Arabic College, Puthuponnani.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}