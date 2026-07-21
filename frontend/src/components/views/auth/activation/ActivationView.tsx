'use client'
import Unauthorized from "@/src/public/unauthorized.png"
import NotFinished from "@/src/public/document-checklist.png"
import Success from "@/src/public/success_mark.png"
import AlreadyChecked from "@/src/public/already_checked.png"
import Link from "next/link";
import Image from "next/image";
import Error from "@/src/components/shared/ui/Error";
import useActivationView from "@/src/components/views/auth/activation/useActivationView";
import {Button, Surface} from "@heroui/react"

type PropsType = {
    token: string | undefined
}

const ActivationView = ({token}: PropsType) => {
    const {userData} = useActivationView({token})
    if(!token){
        return <Error message='Ви не зареєстровані або ще не завершили реєстрацію.' isImage={true} image={NotFinished} alt={'Не завершена реєстрація'} buttonMessage={'Перейти до реєстрації'}/>
    }
    if(userData && !userData.success && userData.status === 401){
        return <Error message={userData.data.message} isImage={true} image={Unauthorized} alt={'Неавторизований'} buttonMessage={'Перейти на головну'} href={'/'}/>
    }
    if(userData && !userData.success && userData.status === 409){
        return <Error message={userData.data.message} isImage={true} image={AlreadyChecked} alt={'Вже активовано'} buttonMessage={'Перейти на головну'} href={'/'}/>
    }
    return (
        <section className="h-full flex justify-center items-center">
            {userData && <Surface className="w-[600px] mb-5 flex justify-center items-center flex-col gap-5"><Image src={Success} alt={'Успіх'} width={100} height={100}/>
            <div className="w-full text-[2.5rem] text-center">
                Акаунт успішно активований!
            </div>
            <Button>
                <Link href={'/'}>Перейти на головну</Link>
            </Button></Surface>}
        </section>
    )
}

export default ActivationView