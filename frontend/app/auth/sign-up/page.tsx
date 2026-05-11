import SignUp from "@/src/components/features/auth/sign-up/SignUp";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Реєстрація'
};

export default function SignUpPage() {
  return <SignUp/>
}
