'use client'
import Image from "next/image";
import Logo from "@/src/public/logo.png"
import "./HeaderStyle.css"
import Menu from "@/src/components/ui/menu/Menu";
import type {RequestCookie} from "next/dist/compiled/@edge-runtime/cookies";
import useHeader from "@/src/components/layout/Header/useHeader";
import Link from "next/link";
import {Button} from "@heroui/react";
import User from "../../features/header/user/User";

type PropsType = {
    accessTokenCookie: RequestCookie | undefined
}

const Header = ({accessTokenCookie}: PropsType) => {
    const {user, isLoading} = useHeader({accessTokenCookie})
    return (
        <header className="flex justify-between h-[14.5%] items-center px-6 pb-2 border-b-1 fixed z-10 w-[80%] bg-white">
            <div className="flex gap-10 items-center">
                <Link href={'/'}>
                    <Image src={Logo} alt="Logo" width={150} height={150} priority={true} className="w-[150px] h-auto"/>
                </Link>
                <Menu/>
            </div>
            {!isLoading ? <div className="flex justify-end items-center h-[10%]">
                {user ? <User user={user}/> : <div className="flex gap-8 auth-btns">
                    <Button>
                        <Link href={'/auth/sign-up'}>Зареєструватись</Link>
                    </Button>
                    <Button>
                        <Link href={'/auth/sign-in'}>Увійти</Link>
                    </Button>
                </div>}
            </div> : <div>Завантаження...</div>}
        </header>
    )
}

export default Header