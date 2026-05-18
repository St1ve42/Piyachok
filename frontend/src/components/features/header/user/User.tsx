import Image from "next/image";
import UserAvatar from "@/src/public/default_user_avatar.png";
import Link from "next/link";
import Settings from "@/src/public/settings.png";
import Exit from "@/src/public/exit.png";
import {IUser} from "@/src/interfaces/users/IUser";
import {FC} from "react";

type PropsType = {
    user: IUser
}

const User: FC<PropsType> = ({user}) => {
    return (
        <div className="flex items-center gap-10">
            <div className="flex items-center gap-5">
                <Image src={user.photo ?? UserAvatar} alt={'Аватар'} width={55} height={55} className="rounded-[30px]"/>
                <div>{user.name} {user.surname}</div>
                <Link href={'/account'} className="flex gap-2">
                    <Image src={Settings} alt={'Налаштування'} width={25} height={25}/>
                    <div className="underline">Мій акаунт</div>
                </Link>
            </div>
        </div>
    )
}

export default User