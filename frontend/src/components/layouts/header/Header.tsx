'use client'
import Image from "next/image";
import Logo from "@/src/public/logo.png"
import Menu from "@/src/components/shared/ui/Menu";
import Link from "next/link";
import React from "react";
import WelcomeModal from "@/src/components/shared/components/welcome-modal/WelcomeModal";
import HamburgerMenu from "@/src/components/shared/ui/HamburgerMenu";
import { IUser } from "@/src/interfaces/users/IUser";
import UserInfo from "@/src/components/features/users/user-info/UserInfo";
import {Button} from "@heroui/react";

interface HeaderProps {
    user: IUser | null;
}

const Header = ({user}: HeaderProps) => {
    return (
        <header className="flex justify-between h-[14.5vh] items-center pb-2 border-b-1 fixed z-10 w-[80%] bg-white max-lg:px-4">
            <div className="flex gap-10 max-lg:gap-4 items-center max-lg:flex-1">
                <Link href={'/'}>
                    <Image src={Logo} alt="Logo" width={150} height={150} priority={true} className={`w-[150px] max-sm:w-[100px]`}/>
                </Link>
                <div className="max-lg:hidden">
                    <Menu/>
                </div>
                <div className="max-lg:hidden">
                    <WelcomeModal/>
                </div>
            </div>
            <div className="flex justify-end items-center h-[10%] gap-2 max-lg:gap-3">
                <div className="lg:hidden">
                    <HamburgerMenu/>
                </div>
                {user ? (
                <UserInfo user={user} />
                ) : (
                <div className="flex gap-8">
                    <Button className="max-sm:hidden">
                        <Link href={'/auth/sign-up'}>Зареєструватись</Link>
                    </Button>
                    <Button>
                        <Link href={'/auth/sign-in'}>Увійти</Link>
                    </Button>
                </div>
                )}
            </div>
        </header>
    )
}

export default Header