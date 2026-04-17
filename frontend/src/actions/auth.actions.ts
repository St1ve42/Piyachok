'use server'

import {authService} from "@/src/services/auth.service";
import {IResponseMessage} from "@/src/interfaces/shared/IResponseMessage";
import {IError} from "@/src/interfaces/shared/IError";
import {cookies} from "next/headers";

export const recoveryRequest = async (currentState: {success: boolean, status: number, data: IResponseMessage | IError | null}, formData: FormData) => {
    const email = formData.get('email') as string | null
    if(!email){
        return {success: false, status: 400, data: {
            timestamp: new Date().toISOString(),
            path: '',
            error: 'BAD_REQUEST',
            message: 'Відсутні певні дані'
        }}
    }
    return await authService.recoveryRequest({email})
}

export const removeTokens = async() => {
    const cookieStore = await cookies()
    cookieStore.delete('accessToken')
    cookieStore.delete('refreshToken')
}
