'use client'

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.png"
import "./HeaderStyle.css"

const HeaderComponent = () => {
    return (
        <div className="flex justify-between items-center px-6 py-2 shadow-[0_27px_30px_-20px_rgba(0,0,0,0.4)] mb-4">
            <div className="flex gap-10 items-center">
                <Image src={Logo} alt="Logo" width={150} height={150}/>
                <ul className="flex gap-10">
                    <li>
                        <Link href="#">Головна</Link>
                    </li>
                    <li>
                        <Link href="#">Топ закладів</Link>
                    </li>
                    <li>
                        <Link href="#">Пиячок</Link>
                    </li>
                </ul>
            </div>
            <div className="flex justify-end items-center h-[10%]">
                <div className="flex gap-6 auth-btns">
                    <button>Зареєструватись</button>
                    <button>Увійти</button>
                </div>
            </div>
        </div>
    )
}

export default HeaderComponent