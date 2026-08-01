import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import Header from "@/src/components/layouts/header/Header";
import Providers from "@/src/providers/providers";
import {cookies} from "next/headers";
import {userService} from "@/src/services/users.service";
import {IUser} from "@/src/interfaces/users/IUser";

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
    let user: IUser | null = null
    if(accessTokenCookie){
        const userResponse = await userService.me({headers: {'Cookie': `${accessTokenCookie.name}=${accessTokenCookie.value}`}})
        user = userResponse.success ? userResponse.data : null
    }
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="root">
            <Header user={user}/>
            <main className="h-[80%] mt-[16vh]">
                <Providers>
                    {children}
                </Providers>
            </main>
        </div>
      </body>
    </html>
  );
}
