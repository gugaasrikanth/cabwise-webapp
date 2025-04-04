import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Suspense } from "react";

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
    <ClerkProvider>
      <html lang="en" data-theme="light">
        <body className="min-h-screen">
          <Navbar />
          <div className="p-12">
            <Suspense>{children}</Suspense>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
