import type {Metadata} from "next";
import ActivationRequest from "@/src/components/views/auth/activation-request/ActivationRequest";

export const metadata: Metadata = {
    title: 'Запит на активацію'
};

export default function ActivationRequestPage() {
    return <ActivationRequest/>
}
