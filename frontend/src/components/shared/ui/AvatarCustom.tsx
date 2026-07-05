import {utils} from "@/src/services/utils.service";
import {FC} from "react";
import {Avatar} from "@heroui/react"

type PropsType = {
    photo: null | string,
    defaultPhoto: string,
    sizeMultiplier?: number
}

const AvatarCustom: FC<PropsType> = ({photo, defaultPhoto, sizeMultiplier}) => {
    return (
        <Avatar className={`size-${sizeMultiplier ?? 12}`}>
            <Avatar.Image alt="фото" src={photo ? utils.buildStorageURL(photo) : defaultPhoto} width={100} height={100}/>
        </Avatar>
    )
}

export default AvatarCustom