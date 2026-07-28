import Image from "next/image";
import {FC, memo} from "react";

type PropsType = {
    photoPreview: File
}

const MyImage: FC<PropsType> = memo(function MyImage({photoPreview}) {
    return (
        <Image alt="preview" src={URL.createObjectURL(photoPreview)} width={192} height={192} className="w-full h-full"/>
    )
})

export default MyImage