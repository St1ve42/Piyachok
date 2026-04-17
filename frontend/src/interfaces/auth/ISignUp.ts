export type ISignUp = {
    name: string,
    surname: string,
    age: number,
    regionId: number,
    cityId: number,
    email: string,
    password: string,
}

export type IBaseSignUp = Omit<ISignUp, "email" | "password">
export type ISignUpWithRepeatedPassword = ISignUp & {repeatedPassword?: string}