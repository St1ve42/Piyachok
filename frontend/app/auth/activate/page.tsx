import type {Metadata} from "next";
import ActivationRequestView from "@/src/components/views/auth/activation-request/ActivationRequestView";

export const metadata: Metadata = {
    title: 'Запит на активацію'
};

export default function ActivationRequestPage() {
    return <ActivationRequestView/>
}
