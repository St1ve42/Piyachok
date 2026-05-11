import {useEffect, useState} from "react";
import {IUser} from "@/src/interfaces/users/IUser";
import {useRouter} from "next/navigation";
import {userService} from "@/src/services/users.service";
import {authService} from "@/src/services/auth.service";
import {removeTokens} from "@/src/actions/auth.actions";
import type {RequestCookie} from "next/dist/compiled/@edge-runtime/cookies";

type PropsType = {
    accessTokenCookie: RequestCookie | undefined
}

const useHeader = ({accessTokenCookie} : PropsType) => {
    const [user, setUser] = useState<null | IUser>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const router = useRouter()
    useEffect(() => {
        if (!accessTokenCookie) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsLoading(false);
            return;
        }

        userService.me()
            .then(async (data) => {
                if (data.success) {
                    setUser(data.data);
                }
            })
            .catch(err => {
                console.error("Помилка профілю:", err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [accessTokenCookie]);

    const handleExit = async() => {
        const response = await authService.logOut()
        if(response.success){
            await removeTokens()
            setUser(null)
            router.refresh()
        }
    }
    return {user, isLoading, handleExit}
}

export default useHeader