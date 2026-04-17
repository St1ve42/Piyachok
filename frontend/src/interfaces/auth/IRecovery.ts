export interface IRecovery {
    password: string,
}

export type IRecoveryWithRepeatedPassword = IRecovery & {repeatedPassword: string}