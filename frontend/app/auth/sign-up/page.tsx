import SignUpView from "@/src/components/views/auth/sign-up/SignUpView";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Реєстрація'
};

export default function SignUpPage() {
  return <SignUpView/>
}
