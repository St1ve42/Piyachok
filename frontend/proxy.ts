import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {userService} from "@/src/services/users.service";
import {cookies} from "next/headers";
import {removeTokens} from "@/src/actions/auth.actions";
import {customFetch} from "@/src/lib/fetch.api";

export async function proxy(request: NextRequest) {
    const cookieStore = await cookies()
    const accessTokenCookie = cookieStore.get('accessToken')
    if(!accessTokenCookie){
        return NextResponse.redirect(new URL('/auth/sign-in', request.url))
    }
    let user = await userService.me({
        headers: {
            'cookie': `${accessTokenCookie.name}=${accessTokenCookie.value}`
        }
    })
    if (!user.success && user.status === 401) {
        const refreshTokenCookie = cookieStore.get('refreshToken')
        if(!refreshTokenCookie){
            return NextResponse.redirect(new URL('/auth/sign-in', request.url))
        }
        const refreshResponse = await customFetch('/auth/refresh', {method: 'POST', headers: {'cookie': `${refreshTokenCookie.name}=${refreshTokenCookie.value}`}})
        if(!refreshResponse.ok){
            await removeTokens()
            return NextResponse.redirect(new URL('/auth/sign-in', request.url))
        }

        const setCookieHeaders = refreshResponse.headers.getSetCookie()
        //removes parameters HTTP only, expires and etc
        const cleanedCookies = setCookieHeaders
            .map(cookieStr => cookieStr.split(';')[0])
            .join('; ')
        user = await userService.me({
            headers: {
                'cookie': cleanedCookies
            }
        })
        const response = NextResponse.json(user)

        setCookieHeaders.forEach(cookieStr => {
            response.headers.append('set-cookie', cookieStr)
        })

        return response
    }
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-data', encodeURIComponent(JSON.stringify(user)));
    return NextResponse.next({
        request: {
            headers: requestHeaders
        }
    })
}

export const config = {
    matcher: '/account/:path*',
}