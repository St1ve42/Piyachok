import {IFullUser} from "@/src/interfaces/users/IFullUser";
import {FC} from "react";
import { Avatar, Card, CardContent, CardFooter, Chip } from "@heroui/react";
import { Eye, TrashBin } from "@gravity-ui/icons";
import ActiveUser from "@/src/public/active-user.png"
import UserAvatar from "@/src/public/default_user_avatar.png";
import Image from "next/image";
import Verified from "@/src/public/verified.png";
import Link from "next/link";
import { utils } from "@/src/services/utils.service";

type PropsType = {
    user: IFullUser
}

const UserCard: FC<PropsType> = ({user}) => {
    const {name, surname, photo, isActive, isVerified, isDeleted, createdAt, updatedAt, id, email, role} = user
    const dateOptions: {[key: string]: string} = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const createdAtDate = new Date(createdAt).toLocaleDateString('uk-UA', dateOptions)
    const updatedAtDate = new Date(updatedAt).toLocaleDateString('uk-UA', dateOptions)
    return (
        <Card className="text-[14px]">
            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <Avatar className={'size-14'}>
                        <Avatar.Image alt="фото" src={photo ? utils.buildStorageURL(photo) : UserAvatar.src} width={100} height={100}/>
                    </Avatar>
                    <div className="flex gap-2 items-center">
                        {isActive && <Image src={ActiveUser} alt={'Активований'} width={30} height={30} priority={true}/>}
                        {isVerified && <Image src={Verified} alt={'Верифікований'} width={30} height={30} priority={true}/>}
                        {isDeleted && <TrashBin color={'red'} width={22} height={25}/>}
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <Link href={`/account/superadmin/users/${id}`}>
                        <Eye/>
                    </Link>
                </div>
            </div>
            <CardContent>
                <div>
                  <Chip color="warning" variant="primary" className="font-bold">{utils.capitalizeFirstLetter(role)}</Chip>
                </div>
                <div>{name} {surname}</div>
                <p>{email}</p>
            </CardContent>
            <CardFooter className="flex-col text-[12px] items-start">
                <p>Створено: {createdAtDate}</p>
                <p>Оновлено: {updatedAtDate}</p>
            </CardFooter>
        </Card>
    )
}

export default UserCard