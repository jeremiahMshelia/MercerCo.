import type { Metadata } from "next";
import "./globals.css";
import Preloader from "@/components/Preloader";

export const metadata: Metadata = {
  title: "Mercer & Co. | The Private Office",
  description: "Facilitating the acquisition of the world's most significant assets. A curated portfolio of off-market listings and expert advisory for the discerning client.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Preloader />
        {children}
      </body>
    </html>
  );
}
