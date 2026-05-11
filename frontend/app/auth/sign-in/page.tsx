import type {Metadata} from "next";
import SignIn from "@/src/components/features/auth/sign-in/SignIn";

export const metadata: Metadata = {
    title: 'Логін'
};

export default function SignInPage() {
    return <SignIn/>
}
