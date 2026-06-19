import 'server-only'
import {IUser} from "@/src/interfaces/users/IUser";
import {cookies, headers} from "next/headers";
import {redirect} from "next/navigation";

export const getUserFromHeaders = async (): Promise<IUser> => {
    const allHeaders = await headers()
    const rawUser = allHeaders.get('x-user-data')
    if(!rawUser){
        console.log('Redirecting works')
        redirect('/auth/sign-in')
    }
    return JSON.parse(decodeURIComponent(rawUser)) as IUser
}

export const getAccessCookie = async (): Promise<string> => {
    const cookieStore = await cookies()
    const accessTokenCookie = cookieStore.get('accessToken')
    if(!accessTokenCookie){
        redirect('/auth/sign-in')
    }
    return `${accessTokenCookie.name}=${accessTokenCookie.value}`
}