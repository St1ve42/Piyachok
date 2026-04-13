'use client'
import {authService} from "@/src/services/auth.service";
import Unauthorized from "@/src/public/unauthorized.png"
import NotFinished from "@/src/public/document-checklist.png"
import Success from "@/src/public/success_mark.png"
import AlreadyChecked from "@/src/public/already_checked.png"
import {useEffect, useState} from "react";
import {IUser} from "@/src/interfaces/IUser";
import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";
import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/navigation";
import ErrorComponent from "@/src/components/ErrorComponent/ErrorComponent";

type PropsType = {
    token: string | undefined
}

const ActivationComponent = ({token}: PropsType) => {
    const [userData, setUserData] = useState<null | IApiResponse<IUser>>(null)
    const router = useRouter()
    useEffect(() => {
        if(userData){
            router.refresh()
        }
    }, [router, userData]);
    useEffect(() => {
        if(token){
            authService.activate({token}).then(data => {
                setUserData(data)
            })
        }
    }, [token]);
    if(!token){
        return <ErrorComponent message='Ви не зареєстровані або ще не завершили реєстрацію.' isImage={true} image={NotFinished} alt={'Не завершена реєстрація'} buttonMessage={'Перейти до реєстрації'}/>
    }
    if(userData && !userData.success && userData.status === 401){
        return <ErrorComponent message={'error' in userData.data ? userData.data.message : undefined} isImage={true} image={Unauthorized} alt={'Неавторизований'} buttonMessage={'Перейти до реєстрації'}/>
    }
    if(userData && !userData.success && userData.status === 409){
        return <ErrorComponent message={'error' in userData.data ? userData.data.message : undefined} isImage={true} image={AlreadyChecked} alt={'Вже активовано'} buttonMessage={'Перейти на головну'}/>
    }
    return (
        <section className="h-[80%] flex justify-center items-center flex-col gap-5">
            {userData && <><Image src={Success} alt={'Успіх'} width={100} height={100}/>
            <div className="w-[50%] text-[2.5rem] text-center">
                Акаунт успішно активований!
            </div>
            <Link href={'/'} className="border-2 border-black border-solid p-[10px] rounded-[20px] font-semibold">Перейти на головну</Link></>}
        </section>
    )
}

export default ActivationComponent