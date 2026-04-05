import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import HeaderComponent from "@/components/HeaderComponent/header.component";
import Providers from "@/providers/providers";

export const metadata: Metadata = {
  title: "Головна",
  description: "Сторінка закладів",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="root">
            <HeaderComponent/>
            <main className="h-[80%]">
                <Providers>
                    {children}
                </Providers>
            </main>
        </div>
      </body>
    </html>
  );
}
