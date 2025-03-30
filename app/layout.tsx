import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CabWise",
  description: "Aggregator of Cab Aggregators",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className="bg-white min-h-screen">{children}</body>
    </html>
  );
}
