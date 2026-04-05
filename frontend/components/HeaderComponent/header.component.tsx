'use client'

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.png"
import "./header.style.css"
import MenuComponent from "@/components/MenuComponent/MenuComponent";

const HeaderComponent = () => {
    return (
        <header className="flex justify-between items-center px-6 py-2 shadow-[0_25px_30px_-20px_rgba(0,0,0,0.2)] mb-4">
            <div className="flex gap-10 items-center">
                <Link href={'/'}>
                    <Image src={Logo} alt="Logo" width={150} height={150}/>
                </Link>
                <MenuComponent/>
            </div>
            <div className="flex justify-end items-center h-[10%]">
                <div className="flex gap-6 auth-btns">
                    <Link href={'/auth/sign-up'}>Зареєструватись</Link>
                    <Link href={'/auth/sign-in'}>Увійти</Link>
                </div>
            </div>
        </header>
    )
}

export default HeaderComponent