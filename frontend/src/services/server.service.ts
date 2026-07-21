import 'server-only'
import {IUser} from "@/src/interfaces/users/IUser";
import { cookies, headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import {newsService} from "@/src/services/news.service";
import {IGeneralNewsById} from "@/src/interfaces/news/IGeneralNewsById";
import {GlobalUserRoleEnum} from "@/src/enums/user/global.user.role.enum";

export const getUserFromHeaders = async (): Promise<IUser> => {
    const allHeaders = await headers()
    const rawUser = allHeaders.get('x-user-data')
    if(!rawUser){
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

export const getNews = async(params: Promise<{id?: string}>): Promise<IGeneralNewsById> => {
    const {id} = await params
    if(!id){
        notFound()
    }
    const { success, data } = await newsService.findById(id);
    if(!success){
        notFound()
    }
    return data
}

export const isSuperadmin = async(): Promise<boolean> => {
    const {role} = await getUserFromHeaders()
    return role === GlobalUserRoleEnum.SUPERADMIN
}

