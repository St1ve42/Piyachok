'use client'
import './ActivationRequestStyle.css'
import useActivationRequest from "@/src/components/ActivationRequestComponent/useActivationRequest";
import Activation from '@/src/public/activation-icon.png'
import Image from "next/image";
import NotFinished from "@/src/public/document-checklist.png";
import ErrorComponent from "@/src/components/ErrorComponent/ErrorComponent";

const ActivationRequestComponent = () => {
    const {seconds, previousApiResponse, activationAgainResponse, handleActivationAgain, isLoading} = useActivationRequest()
    if(!previousApiResponse){
        return <ErrorComponent message='Ви не зареєстровані або ще не завершили реєстрацію.' isImage={true} image={NotFinished} alt={'Не завершена реєстрація'} buttonMessage={'Перейти до реєстрації'}/>
    }
    return (
        <section className="h-full flex justify-center items-center">
            <div className="activation flex flex-col gap-10 items-center">
                <h1>Активація</h1>
                <div className="w-full flex justify-between">
                    <p className="w-[400px]">{previousApiResponse && previousApiResponse.message}</p>
                    <Image src={Activation} width={80} alt={'Активація'}/>
                </div>
                <button className="activation-link bg-black text-white" onClick={handleActivationAgain} disabled={isLoading} style={{opacity: !isLoading ? 1 : 0.8, cursor: !isLoading ? 'pointer' : 'default'}}>Надіслати повторно лист</button>
                {activationAgainResponse && (activationAgainResponse.success ? <div>{activationAgainResponse.data.message}. Вам необхідно зачекати {seconds} секунд, щоб знову надіслати.</div> : <div>{activationAgainResponse.data.message}</div>)}
            </div>
        </section>
    )
}

export default ActivationRequestComponent