import {ISignUp} from "@/src/interfaces/auth/ISignUp";
import {IResponseMessage} from "@/src/interfaces/shared/IResponseMessage";
import {fetchApi} from "@/src/lib/fetch.api";
import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";
import {getErrorResponse} from "@/src/errors/get.error.response";
import {IResendActivation} from "@/src/interfaces/auth/IResendActivation";
import {IActivate} from "@/src/interfaces/auth/IActivate";
import {IUser} from "@/src/interfaces/IUser";
import {ISignIn} from "@/src/interfaces/auth/ISignIn";
import {IRecoveryRequest} from "@/src/interfaces/auth/IRecoveryRequest";
import {IRecovery} from "@/src/interfaces/auth/IRecovery";

export class AuthService{
    async singUp(dto: ISignUp): Promise<IApiResponse<IResponseMessage>>{
        try{
            const response = await fetchApi<IResponseMessage>('/auth/sign-up', {method: 'POST', body: JSON.stringify(dto)})
            return {success: true, ...response}
        }
        catch (e){
            return getErrorResponse(e)
        }
    }

    async resendActivation(dto: IResendActivation): Promise<IApiResponse<IResponseMessage>> {
        try{
            const response = await fetchApi<IResponseMessage>('/auth/activation/resend', {method: 'POST', body: JSON.stringify(dto)})
            return {success: true, ...response}
        }
        catch (e){
            return getErrorResponse(e)
        }
    }

    async activate(dto: IActivate): Promise<IApiResponse<IUser>> {
        const {token} = dto
        try{
            const response = await fetchApi<IUser>(`/auth/activate/${token}`, {method: 'POST'})
            return {success: true, ...response}
        }
        catch (e){
            return getErrorResponse<IUser>(e)
        }
    }

    async signIn(dto: ISignIn): Promise<IApiResponse<IUser>>{
        try{
            const response = await fetchApi<IUser>('/auth/sign-in', {method: 'POST', body: JSON.stringify(dto)})
            return {success: true, ...response}
        }
        catch (e){
            return getErrorResponse(e)
        }
    }

    async logOut(): Promise<IApiResponse<null>>{
        try{
            const response = await fetchApi<null>('/auth/log-out', {method: 'POST'})
            return {success: true, ...response}
        }
        catch (e){
            return getErrorResponse(e)
        }
    }

    async recoveryRequest(dto: IRecoveryRequest): Promise<IApiResponse<IResponseMessage>>{
        try{
            const response = await fetchApi<IResponseMessage>('/auth/password/recovery', {method: 'POST', body: JSON.stringify(dto)})
            return {success: true, ...response}
        }
        catch (e){
            return getErrorResponse(e)
        }
    }

    async recovery(dto: IRecovery, token: string): Promise<IApiResponse<IUser>>{
        try{
            const response = await fetchApi<IUser>(`/auth/password/recovery/${token}`, {method: 'POST', body: JSON.stringify(dto)})
            return {success: true, ...response}
        }
        catch (e){
            return getErrorResponse(e)
        }
    }

    async refresh(): Promise<IApiResponse<IUser>>{
        try{
            const response = await fetchApi<IUser>(`/auth/refresh`, {method: 'POST'})
            return {success: true, ...response}
        }
        catch (e){
            return getErrorResponse(e)
        }
    }

    async signUpWithSocialNetwork(dto: Omit<ISignUp, 'password' | 'email'>, token: string): Promise<IApiResponse<IUser | IResponseMessage>>{
        try{
            const response = await fetchApi<IUser>(`/auth/social-network/sign-up/${token}`, {method: 'POST', body: JSON.stringify(dto)})
            return {success: true, ...response}
        }
        catch(e){
            return getErrorResponse(e)
        }
    }

}

export const authService = new AuthService()