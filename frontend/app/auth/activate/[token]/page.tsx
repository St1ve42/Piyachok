import type { Metadata } from 'next';
import ActivationView from "@/src/components/views/auth/activation/ActivationView";
export const metadata: Metadata = {
    title: 'Активація'
}

type PropsType = {
    params: Promise<{token: string | undefined}>
}

const ActivationPage = async ({params}: PropsType) => {
    const {token} = await params
    return (
        <ActivationView token={token}/>
    )
}

export default ActivationPage