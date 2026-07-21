import ForgotPasswordView from "@/src/components/views/auth/forgot-password/ForgotPasswordView";
import RecoveryPasswordView from "@/src/components/views/auth/recovery/RecoveryPasswordView";
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
        return <RecoveryPasswordView token={token}/>
    }
    return (
        <ForgotPasswordView/>
    )
}

export default ForgotPasswordPage