'use client'
import Unauthorized from "@/src/public/unauthorized.png"
import NotFinished from "@/src/public/document-checklist.png"
import Success from "@/src/public/success_mark.png"
import AlreadyChecked from "@/src/public/already_checked.png"
import Link from "next/link";
import Image from "next/image";
import ErrorComponent from "@/src/components/ErrorComponent/ErrorComponent";
import useActivation from "@/src/components/ActivationComponent/useActivation";

type PropsType = {
    token: string | undefined
}

const ActivationComponent = ({token}: PropsType) => {
    const {userData} = useActivation({token})
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