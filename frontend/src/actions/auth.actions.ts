'use server'

import {authService} from "@/src/services/auth.service";
import {IResponseMessage} from "@/src/interfaces/shared/IResponseMessage";
import {IError} from "@/src/interfaces/shared/IError";
import {cookies} from "next/headers";
import {IUser} from "@/src/interfaces/IUser";

export const signUpAction = async (currentState: {success: boolean, status: number, data: IResponseMessage | IError | null | IUser, isSocialAuth?: boolean, token?: string}, formData: FormData) => {
    const name = formData.get('name') as string | null
    const surname = formData.get('surname') as string | null
    const age = Number(formData.get('age') as string | null)
    const regionId = Number(formData.get('regionId') as string | null)
    const cityId = Number(formData.get('cityId') as string | null)
    const email = formData.get('email') as string | null
    const password = formData.get('password') as string | null
    if(!name || !surname || !age || !regionId || !cityId){
        return {success: false, status: 400, data: {message: 'Відсутні певні дані'}}
    }
    if(!currentState.isSocialAuth){
        if(!email || !password){
            return {success: false, status: 400, data: {message: 'Відсутні певні дані'}}
        }
        return await authService.singUp({name, surname, age, cityId, regionId, email, password})
    }
    return await authService.signUpWithSocialNetwork({name, surname, age, cityId, regionId}, currentState.token ?? '')

}

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
