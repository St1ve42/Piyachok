import SignUpComponent from "@/components/SignUpComponent/sign-up.component";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Реєстрація'
};

export default function SignUp() {
  return <SignUpComponent/>
}
