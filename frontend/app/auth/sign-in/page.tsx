import type {Metadata} from "next";
import SignInComponent from "@/src/components/SignInComponent/SignInComponent";

export const metadata: Metadata = {
    title: 'Логін'
};

export default function SignIn() {
    return <SignInComponent/>
}
