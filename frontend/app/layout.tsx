import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import HeaderComponent from "@/src/components/HeaderComponent/HeaderComponent";
import Providers from "@/src/providers/providers";
import {cookies} from "next/headers";

export const metadata: Metadata = {
  title: "Головна",
  description: "Сторінка закладів",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const cookieStore = await cookies()
    const accessTokenCookie = cookieStore.get('accessToken')
  return (
    <html lang="en">
      <body>
        <div className="root">
            <HeaderComponent accessTokenCookie={accessTokenCookie}/>
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
