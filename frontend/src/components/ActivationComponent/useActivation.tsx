import {useEffect, useState} from "react";
import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";
import {IUser} from "@/src/interfaces/users/IUser";
import {useRouter} from "next/navigation";
import {authService} from "@/src/services/auth.service";

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
    return {userData}
}

export default useActivation