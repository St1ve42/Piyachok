'use client'

import Link from "next/link";
import Image from "next/image";
import Logo from "@/src/public/logo.png"
import Exit from "@/src/public/exit.png"
import UserAvatar from "@/src/public/default_user_avatar.png"
import "./HeaderStyle.css"
import MenuComponent from "@/src/components/MenuComponent/MenuComponent";
import type {RequestCookie} from "next/dist/compiled/@edge-runtime/cookies";
import useHeader from "@/src/components/HeaderComponent/useHeader";

type PropsType = {
    accessTokenCookie: RequestCookie | undefined
}

const HeaderComponent = ({accessTokenCookie}: PropsType) => {
    const {user, isLoading, handleExit} = useHeader({accessTokenCookie})
    return (
        <header className="flex justify-between h-[15%] items-center px-6 py-2 shadow-[0_25px_30px_-20px_rgba(0,0,0,0.2)] mb-4">
            <div className="flex gap-10 items-center">
                <Link href={'/'}>
                    <Image src={Logo} alt="Logo" width={150} height={150}/>
                </Link>
                <MenuComponent/>
            </div>
            {!isLoading ? <div className="flex justify-end items-center h-[10%]">
                {user ? <div className="flex items-center gap-10">
                    <div className="flex items-center gap-5">
                        <Image src={user.photo ?? UserAvatar} alt={'Аватар'} width={55} height={55} className="rounded-[30px]"/>
                        <div>{user.name} {user.surname}</div>
                    </div>
                    <Image src={Exit} alt={'Вихід'} width={40} height={40} className="cursor-pointer" onClick={handleExit}/>
                </div> : <div className="flex gap-6 auth-btns">
                    <Link href={'/auth/sign-up'}>Зареєструватись</Link>
                    <Link href={'/auth/sign-in'}>Увійти</Link>
                </div>}
            </div> : <div>Завантаження...</div>}
        </header>
    )
}

export default HeaderComponent