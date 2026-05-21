import UserAvatar from "@/src/public/default_user_avatar.png";
import Link from "next/link";
import {IUser} from "@/src/interfaces/users/IUser";
import {FC} from "react";
import {Avatar} from "@heroui/react";
import {Gear} from "@gravity-ui/icons";

type PropsType = {
    user: IUser
}

const User: FC<PropsType> = ({user}) => {
    const {name, surname, photo} = user
    return (
        <div className="flex items-center gap-10">
            <div className="flex items-center gap-5">
                {/*<Image src={user.photo ?? UserAvatar} alt={'Аватар'} width={55} height={55} className="rounded-[30px]"/>*/}
                <Avatar className={'size-14'}>
                    <Avatar.Image alt="фото" src={photo ?? UserAvatar.src}/>
                </Avatar>
                <div>{name} {surname}</div>
                <Link href={'/account'} className="flex gap-2">
                    <Gear width={25} height={25}/>
                    <div className="underline">Мій акаунт</div>
                </Link>
            </div>
        </div>
    )
}

export default User