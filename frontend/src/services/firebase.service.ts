import {AuthProvider, signInWithPopup, User} from "@firebase/auth";
import {auth} from "@/src/firebase/firebase.init"
import {fetchApi} from "@/src/lib/fetch.api";
import {IUser} from "@/src/interfaces/users/IUser";
import {getErrorResponse} from "@/src/errors/get.error.response";
import {IUserFromSocialNetwork, IUserFromSocialNetworkWithToken} from "@/src/interfaces/users/IUserFromSocialNetwork";
import {FirebaseError} from "@firebase/app";
import {IError} from "@/src/interfaces/shared/IError";



class FirebaseService{
    async serviceSignIn(provider: AuthProvider): Promise<{success: true, status: number, data: IUser | IUserFromSocialNetworkWithToken} | {success: false, status: number, data: IError}>{
        try{
            const result = await signInWithPopup(auth, provider)
            const user = result.user
            return await this.sendTokenToBackend(user)
        }
    catch (e) {
            if(e instanceof FirebaseError && e.code === 'auth/account-exists-with-different-credential'){
                return {success: false, status: 409, data: {timestamp: new Date().toISOString(), path: '', error: e.code, message: 'Акаунт уже існує. Увійдіть тим способом, яким входили раніше та прив`яжіть поточну соціальну мережу в профілі.'}}
            }
            return getErrorResponse(e)
        }
    }

    private async sendTokenToBackend(user: User): Promise<{success: true, status: number, data: IUser | IUserFromSocialNetworkWithToken}>{
        const token = await user.getIdToken()
        const response = await fetchApi<IUser | IUserFromSocialNetwork>(`/auth/social-network/sign-in/${token}`, {method: 'POST'})
        let response202: IUserFromSocialNetworkWithToken | null = null;
        if(response.status === 202){
            response202 = {...(response.data as IUserFromSocialNetwork), token}
        }
        return {success: true, status: response.status, data: response202 ?? (response.data as IUser)}
    }

}

export const firebaseService = new FirebaseService()