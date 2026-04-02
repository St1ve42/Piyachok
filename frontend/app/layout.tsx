import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import HeaderComponent from "@/components/HeaderComponent/HeaderComponent";

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
            {children}
        </div>
      </body>
    </html>
  );
}
