import type { Metadata } from 'next';
import ActivationComponent from "@/src/components/ActivationComponent/ActivationComponent";
export const metadata: Metadata = {
    title: 'Активація'
}

type PropsType = {
    params: Promise<{token: string | undefined}>
}

const ActivationPage = async ({params}: PropsType) => {
    const {token} = await params
    return (
        <ActivationComponent token={token}/>
    )
}

export default ActivationPage