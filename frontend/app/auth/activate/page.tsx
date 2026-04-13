import type {Metadata} from "next";
import ActivationRequestComponent from "@/src/components/ActivationRequestComponent/ActivationRequestComponent";

export const metadata: Metadata = {
    title: 'Запит на активацію'
};

export default function ActivationRequestPage() {
    return <ActivationRequestComponent/>
}
