import type {Metadata} from "next";
import PiyachokFeedView from "@/src/components/views/PiyachokFeedView";

export const metadata: Metadata = {
    title: 'Пиячок'
};

export default function PiyachokPage() {
    return <PiyachokFeedView/>
}
