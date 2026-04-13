import ForgotPasswordComponent from "@/src/components/ForgotPasswordComponent/ForgotPasswordComponent";
import RecoveryPasswordComponent from "@/src/components/RecoveryComponent/RecoveryPasswordComponent";

type PropsType = {
    searchParams: Promise<{token: string | undefined}>
}

const ForgotPasswordPage = async ({searchParams}: PropsType) => {
    const {token} = await searchParams
    if(token){
        return <RecoveryPasswordComponent token={token}/>
    }
    return (
        <ForgotPasswordComponent/>
    )
}

export default ForgotPasswordPage