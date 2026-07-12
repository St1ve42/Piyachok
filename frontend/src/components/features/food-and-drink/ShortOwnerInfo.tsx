import { Avatar, Card, CardContent, Heading} from "@heroui/react";
import Link from "next/link";
import UserAvatar from "@/src/public/default_user_avatar.png";
import {IUserShortInfo} from "@/src/interfaces/users/IUserShortInfo";
import {FC} from "react";
import {utils} from "@/src/services/utils.service";
import {Eye} from "@gravity-ui/icons";

type PropsType = {
    owner: IUserShortInfo & {email: string}
}

const ShortOwnerInfo: FC<PropsType> = ({owner}) => {
    const {photo, id, name, surname, email} = owner
    return (
        <Card className="text-[14px] h-fit w-[20vw] self-end flex-row items-center">
            <Avatar className={'size-14'}>
                <Avatar.Image alt="фото" src={photo ? utils.buildStorageURL(photo ) : UserAvatar.src} width={100} height={100}/>
            </Avatar>
            <CardContent>
                <Heading level={6}>Власник</Heading>
                <div>{name} {surname}</div>
                <div>{email}</div>
            </CardContent>
            <Link href={`/account/superadmin/users/${id}`}>
                <Eye/>
            </Link>
    </Card>
    )
}

export default ShortOwnerInfo