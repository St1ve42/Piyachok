'use client'
import useActivationRequestView from "@/src/components/views/auth/activation-request/useActivationRequestView";
import Activation from '@/src/public/activation-icon.png'
import Image from "next/image";
import NotFinished from "@/src/public/document-checklist.png";
import Error from "@/src/components/shared/ui/Error";
import { Button, Heading, Surface } from "@heroui/react";

const ActivationRequestView = () => {
    const {seconds, previousApiResponse, activationAgainResponse, handleActivationAgain, isLoading} = useActivationRequestView()
    if(!previousApiResponse){
        return <Error message='Ви не зареєстровані або ще не завершили реєстрацію.' isImage={true} image={NotFinished} alt={'Не завершена реєстрація'} buttonMessage={'Перейти до реєстрації'}/>
    }
    return (
        <section className="h-full flex justify-center items-center">
            <Surface variant={'default'} className="w-[600px] flex flex-col gap-10 items-center rounded-2xl p-8 shadow-lg">
                <Heading level={3}>Активація</Heading>
                <div className="w-full flex justify-between">
                    <p className="w-[400px]">{previousApiResponse && previousApiResponse.message}</p>
                    <Image src={Activation} width={80} alt={'Активація'}/>
                </div>
                <Button onClick={handleActivationAgain} isDisabled={isLoading} style={{opacity: !isLoading ? 1 : 0.8, cursor: !isLoading ? 'pointer' : 'default'}}>Надіслати повторно лист</Button>
                {activationAgainResponse && (activationAgainResponse.success ? <div className="w-full self-start">Лист було повторно надіслано на вказану поштову скриньку. Вам необхідно зачекати {seconds} секунд, щоб знову надіслати.</div> : <div>{activationAgainResponse.data.message}</div>)}
            </Surface>
        </section>
    )
}

export default ActivationRequestView