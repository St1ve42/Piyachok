import {AuthProvider, signInWithPopup, User} from "@firebase/auth";
import {auth} from "@/src/firebase/firebase.init"
import {fetchApi} from "@/src/lib/fetch.api";
import {IUser} from "@/src/interfaces/IUser";
import {getErrorResponse} from "@/src/errors/get.error.response";
import {IUserFromSocialNetwork, IUserFromSocialNetworkWithToken} from "@/src/interfaces/IUserFromSocialNetwork";
import {FirebaseError} from "@firebase/app";
import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";

class FirebaseService{
    async serviceSignIn(provider: AuthProvider): Promise<IApiResponse<IUser | IUserFromSocialNetworkWithToken>>{
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

    private async sendTokenToBackend(user: User): Promise<{success: boolean, status: number, data: IUser | IUserFromSocialNetworkWithToken}>{
        const token = await user.getIdToken()
        const response = await fetchApi<IUser | IUserFromSocialNetwork>(`/auth/social-network/sign-in/${token}`, {method: 'POST'})
        return {success: true, status: response.status, data: response.status === 202 ? {...(response.data as IUserFromSocialNetwork), token} : response.data}
    }

}

export const firebaseService = new FirebaseService()