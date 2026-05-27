import {useEffect, useState} from "react";
import {IUser} from "@/src/interfaces/users/IUser";
import {userService} from "@/src/services/users.service";
import type {RequestCookie} from "next/dist/compiled/@edge-runtime/cookies";

type PropsType = {
    accessTokenCookie: RequestCookie | undefined
}

const useHeader = ({accessTokenCookie} : PropsType) => {
    const [user, setUser] = useState<null | IUser>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
        if (!accessTokenCookie) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUser(null)
            setIsLoading(false);
            return;
        }

        userService.me()
            .then(async (data) => {
                if (data.success) {
                    setUser(data.data);
                } else {
                    setUser(null)
                }
            }).finally(() => {
                setIsLoading(false)
        })
    }, [accessTokenCookie]);

    return {user, isLoading}
}

export default useHeader