'use client'
import Image from "next/image";
import Logo from "@/src/public/logo.png"
import Exit from "@/src/public/exit.png"
import UserAvatar from "@/src/public/default_user_avatar.png"
import "./HeaderStyle.css"
import Menu from "@/src/components/ui/menu/Menu";
import type {RequestCookie} from "next/dist/compiled/@edge-runtime/cookies";
import useHeader from "@/src/components/layout/Header/useHeader";
import Link from "next/link";
import {Button} from "@heroui/react";

type PropsType = {
    accessTokenCookie: RequestCookie | undefined
}

const Header = ({accessTokenCookie}: PropsType) => {
    const {user, isLoading, handleExit} = useHeader({accessTokenCookie})
    return (
        <header className="flex justify-between h-[14.5%] items-center px-6 pb-2 border-b-1 fixed z-10 w-[80%] bg-white">
            <div className="flex gap-10 items-center">
                <Link href={'/'}>
                    <Image src={Logo} alt="Logo" width={150} height={150} priority={true} className="w-[150px] h-auto"/>
                </Link>
                <Menu/>
            </div>
            {!isLoading ? <div className="flex justify-end items-center h-[10%]">
                {user ? <div className="flex items-center gap-10">
                    <div className="flex items-center gap-5">
                        <Image src={user.photo ?? UserAvatar} alt={'Аватар'} width={55} height={55} className="rounded-[30px]"/>
                        <div>{user.name} {user.surname}</div>
                    </div>
                    <Image src={Exit} alt={'Вихід'} width={40} height={40} className="cursor-pointer" onClick={handleExit}/>
                </div> : <div className="flex gap-8 auth-btns">
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