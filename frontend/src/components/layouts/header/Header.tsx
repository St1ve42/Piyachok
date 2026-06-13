'use client'
import Image from "next/image";
import Logo from "@/src/public/logo.png"
import Menu from "@/src/components/ui/menu/Menu";
import Link from "next/link";
import { ReactNode } from "react";
import WelcomeModal from "@/src/components/ui/welcome-modal/WelcomeModal";

interface HeaderProps {
    profileSlot: ReactNode;
}

const Header = ({profileSlot}: HeaderProps) => {
    return (
        <header className="flex justify-between h-[14.5vh] items-center px-6 pb-2 border-b-1 fixed z-10 w-[80%] bg-white">
            <div className="flex gap-10 items-center">
                <Link href={'/'}>
                    <Image src={Logo} alt="Logo" width={150} height={150} priority={true} className="w-[150px] h-auto"/>
                </Link>
                <Menu/>
                <WelcomeModal/>
            </div>
            <div className="flex justify-end items-center h-[10%]">
                {profileSlot}
            </div>
        </header>
    )
}

export default Header