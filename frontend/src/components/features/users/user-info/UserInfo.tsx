import UserAvatar from "@/src/public/default_user_avatar.png";
import {IUser} from "@/src/interfaces/users/IUser";
import {FC} from "react";
import { Avatar } from "@heroui/react";
import { utils } from "@/src/services/utils.service";
import {Gear} from "@gravity-ui/icons";
import Link from "next/link";

type PropsType = {
    user: IUser
}

const UserInfo: FC<PropsType> = ({user}) => {
    const {name, surname, photo} = user
    return (
        <div className="flex items-center gap-10 mr-10">
            <div className="flex items-center gap-5">
                <Avatar className={'size-14'}>
                    <Avatar.Image alt="фото" src={photo ? utils.buildStorageURL(photo) : UserAvatar.src} width={100} height={100}/>
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

export default UserInfo