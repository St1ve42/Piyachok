import type {Metadata} from "next";
import SignInView from "@/src/components/views/auth/sign-in/SignInView";

export const metadata: Metadata = {
    title: 'Логін'
};

export default function SignInPage() {
    return <SignInView/>
}
