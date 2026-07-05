import type {Metadata} from "next";
import SignIn from "@/src/components/views/auth/sign-in/SignIn";

export const metadata: Metadata = {
    title: 'Логін'
};

export default function SignInPage() {
    return <SignIn/>
}
