import ForgotPassword from "@/src/components/features/auth/forgot-password/ForgotPassword";
import RecoveryPassword from "@/src/components/features/auth/recovery/RecoveryPassword";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Забув пароль'
};
type PropsType = {
    searchParams: Promise<{token: string | undefined}>
}

const ForgotPasswordPage = async ({searchParams}: PropsType) => {
    const {token} = await searchParams
    if(token){
        return <RecoveryPassword token={token}/>
    }
    return (
        <ForgotPassword/>
    )
}

export default ForgotPasswordPage