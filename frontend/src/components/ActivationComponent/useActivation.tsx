import {useEffect, useState} from "react";
import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";
import {IUser} from "@/src/interfaces/IUser";
import {useRouter} from "next/navigation";
import {authService} from "@/src/services/auth.service";
import ErrorComponent from "@/src/components/ErrorComponent/ErrorComponent";
import NotFinished from "@/src/public/document-checklist.png";

type PropsType = {
    token: string | undefined
}

const useActivation = ({token}: PropsType) => {
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
    return {userData}
}

export default useActivation