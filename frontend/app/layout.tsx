import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import Header from "@/src/components/layouts/header/Header";
import Providers from "@/src/providers/providers";
import {cookies} from "next/headers";
import {userService} from "@/src/services/users.service";
import {IUser} from "@/src/interfaces/users/IUser";
import UserInfo from "@/src/components/features/users/user-info/UserInfo";
import {Button} from "@heroui/react";
import Link from "next/link";

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
    const profileContent = user ? (
        <UserInfo user={user} />
    ) : (
        <div className="flex gap-8">
            <Button>
                <Link href={'/auth/sign-up'}>Зареєструватись</Link>
            </Button>
            <Button>
                <Link href={'/auth/sign-in'}>Увійти</Link>
            </Button>
        </div>
    );
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="root">
            <Header profileSlot={profileContent}/>
            <main className="h-[80%] mt-[17vh]">
                <Providers>
                    {children}
                </Providers>
            </main>
        </div>
      </body>
    </html>
  );
}
