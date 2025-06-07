import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Consulta CID-Medicamentos",
  description: "Consulta rápida de CIDs e medicamentos associados.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      {/* Apply min-height to ensure footer stays at bottom */}
      <body className={`${inter.className} flex flex-col min-h-screen bg-gray-50`}>
        <Header />
        {/* Adjust padding for different screen sizes */}
        <main className="flex-grow container mx-auto px-2 sm:px-4 py-6 md:py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

