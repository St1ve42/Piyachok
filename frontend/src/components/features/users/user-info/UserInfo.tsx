import UserAvatar from "@/src/public/default_user_avatar.png";
import {IUser} from "@/src/interfaces/users/IUser";
import React, {FC} from "react";
import { Avatar } from "@heroui/react";
import { utilsService } from "@/src/services/utils.service";
import {Gear} from "@gravity-ui/icons";
import Link from "next/link";
import MobileNavigation from "@/src/components/layouts/header/MobileNavigation";

type PropsType = {
    user: IUser
}

const UserInfo: FC<PropsType> = ({user}) => {
    const {name, surname, photo} = user
    return (
        <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
                <Avatar className={'size-14'}>
                    <Avatar.Image alt="фото" src={photo ? utilsService.buildStorageURL(photo) : UserAvatar.src} width={100} height={100}/>
                </Avatar>
                <p>{name} {surname}</p>
                {user && <MobileNavigation user={user}/>}
                <Link href={'/account'} className="flex gap-2 max-lg:hidden">
                    <Gear width={25} height={25}/>
                    <div className="underline">Мій акаунт</div>
                </Link>
            </div>
        </div>
    )
}

export default UserInfo