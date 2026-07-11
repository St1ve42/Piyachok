import {StaticImport} from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import {Button} from "@heroui/react"

type PropsType = {
    message?: string,
    isImage: boolean,
    image?: StaticImport,
    alt?: string,
    buttonMessage: string,
    href?: string
}

const Error = ({message, isImage, image, alt, buttonMessage, href}: PropsType) => {
    return (
        <section className="h-[80%] flex justify-center items-center flex-col gap-5">
            {isImage && alt && image && <Image src={image} alt={alt} width={100} height={100}/>}
            <div className="w-[50%] text-[2.5rem] text-center">
                {message}
            </div>
            <Button>
                <Link href={href ?? '/auth/sign-up'}>{buttonMessage}</Link>
            </Button>
        </section>
    )
}

export default Error