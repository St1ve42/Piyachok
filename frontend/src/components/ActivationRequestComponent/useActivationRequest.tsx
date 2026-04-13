import {useResponseMessageStore} from "@/src/zustand/useSharedStore";
import {IResponseMessage} from "@/src/interfaces/shared/IResponseMessage";
import {useEffect, useState} from "react";
import {authService} from "@/src/services/auth.service";
import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";

const useActivationRequest = () => {
    const {previousApiResponse} = useResponseMessageStore()
    const [activationAgainResponse, setActivationAgainResponse] = useState<null | IApiResponse<IResponseMessage>>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        if (seconds <= 0) return;

        const timer = setInterval(() => {
            setSeconds((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [seconds]);

    const handleActivationAgain = async () => {
        if(previousApiResponse){
            const splitResponse = previousApiResponse.message.split(' ')
            const email = (splitResponse.find(value => value.includes('@')) as string).replace(/\.$/, '')
            setIsLoading(true)
            authService.resendActivation({email}).then((data) => {
                setActivationAgainResponse(data)
            })
            setSeconds(60)
            await new Promise(resolve => setTimeout(resolve, 60*1000))
            setIsLoading(false)
        }
    }
    return {seconds, previousApiResponse, activationAgainResponse, handleActivationAgain, isLoading}
}

export default useActivationRequest