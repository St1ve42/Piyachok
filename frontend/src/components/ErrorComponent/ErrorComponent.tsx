import {StaticImport} from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";

type PropsType = {
    message?: string,
    isImage: boolean,
    image?: StaticImport,
    alt?: string,
    buttonMessage: string
}

const ErrorComponent = ({message, isImage, image, alt, buttonMessage}: PropsType) => {
    return (
        <section className="h-[80%] flex justify-center items-center flex-col gap-5">
            {isImage && alt && image && <Image src={image} alt={alt} width={100} height={100}/>}
            <div className="w-[50%] text-[2.5rem] text-center">
                {message}
            </div>
            <Link href={'/auth/sign-up'} className="border-2 border-black border-solid p-[10px] rounded-[20px] font-semibold">{buttonMessage}</Link>
        </section>
    )
}

export default ErrorComponent