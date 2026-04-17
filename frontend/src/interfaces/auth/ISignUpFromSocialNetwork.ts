import {ISignUp} from "@/src/interfaces/auth/ISignUp";

export type ISignUpFromSocialNetwork = Omit<ISignUp, "email" | "password">