import SignUp from "@/src/components/views/auth/sign-up/SignUp";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Реєстрація'
};

export default function SignUpPage() {
  return <SignUp/>
}
