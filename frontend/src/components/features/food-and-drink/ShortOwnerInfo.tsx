import { Avatar, Card, CardContent, Heading} from "@heroui/react";
import Link from "next/link";
import UserAvatar from "@/src/public/default_user_avatar.png";
import {IUserShortInfo} from "@/src/interfaces/users/IUserShortInfo";
import {FC} from "react";
import {utilsService} from "@/src/services/utils.service";
import {Eye} from "@gravity-ui/icons";

type PropsType = {
    owner: IUserShortInfo & {email: string}
}

const ShortOwnerInfo: FC<PropsType> = ({owner}) => {
    const {photo, id, name, surname, email} = owner
    return (
        <Card className="text-[14px] h-fit w-70 max-sm:w-full flex-row items-center gap-3 p-2 shrink-0">
            <div className="flex-shrink-0">
                <Avatar className={'size-12'}>
                    <Avatar.Image alt="фото" src={photo ? utilsService.buildStorageURL(photo ) : UserAvatar.src} width={48} height={48}/>
                </Avatar>
            </div>
            <CardContent className="text-left">
                <Heading level={6} className="text-sm">Власник</Heading>
                <div className="font-medium">{name} {surname}</div>
                <div className="text-sm text-gray-600 truncate max-w-[140px]">{email}</div>
            </CardContent>
            <div className="ml-auto">
                <Link href={`/account/superadmin/users/${id}`} className="inline-flex items-center justify-center p-1 rounded hover:bg-gray-100">
                    <Eye/>
                </Link>
            </div>
        </Card>
    )
}

export default ShortOwnerInfo