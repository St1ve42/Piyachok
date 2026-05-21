import 'server-only'
import {IUser} from "@/src/interfaces/users/IUser";
import {headers} from "next/headers";
import {redirect} from "next/navigation";

export const getUserFromHeaders = async (): Promise<IUser> => {
    const allHeaders = await headers()
    const rawUser = allHeaders.get('x-user-data')
    if(!rawUser){
        redirect('/auth/sign-in')
    }
    return JSON.parse(decodeURIComponent(rawUser)) as IUser
}