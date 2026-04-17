export interface IUserFromSocialNetwork{
    name: string,
    email: string,
    phone: string,
    photo: string,
    isActive: boolean,
    provider: string,
    firebaseUid: string,
}

export type IUserFromSocialNetworkWithToken = IUserFromSocialNetwork & {token: string}