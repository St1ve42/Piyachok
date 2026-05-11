import type { Metadata } from 'next';
import Activation from "@/src/components/features/auth/activation/Activation";
export const metadata: Metadata = {
    title: 'Активація'
}

type PropsType = {
    params: Promise<{token: string | undefined}>
}

const ActivationPage = async ({params}: PropsType) => {
    const {token} = await params
    return (
        <Activation token={token}/>
    )
}

export default ActivationPage