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
        <section className="h-full flex justify-center items-center px-4 max-sm:px-2">
            <Surface variant={'default'} className="w-[600px] max-md:w-full max-md:max-w-[600px] flex flex-col gap-10 max-sm:gap-6 items-center rounded-2xl p-8 max-sm:p-4 shadow-lg">
                <Heading level={3} className="max-sm:text-lg">Активація</Heading>
                <div className="w-full flex flex-col md:flex-row justify-between gap-4 max-sm:gap-3">
                    <p className="w-full md:w-[400px] text-sm max-sm:text-xs">{previousApiResponse && previousApiResponse.message}</p>
                    <Image src={Activation} width={80} height={80} alt={'Активація'} className="max-sm:w-16 max-sm:h-16"/>
                </div>
                <Button onClick={handleActivationAgain} isDisabled={isLoading} className="w-full max-sm:w-full" style={{opacity: !isLoading ? 1 : 0.8, cursor: !isLoading ? 'pointer' : 'default'}}>Надіслати повторно лист</Button>
                {activationAgainResponse && (activationAgainResponse.success ? <div className="w-full self-start text-sm max-sm:text-xs">Лист було повторно надіслано на вказану поштову скриньку. Вам необхідно зачекати {seconds} секунд, щоб знову надіслати.</div> : <div className="text-sm max-sm:text-xs">{activationAgainResponse.data.message}</div>)}
            </Surface>
        </section>
    )
}

export default ActivationRequestView