import SignUpComponent from "@/src/components/SignUpComponent/SignUpComponent";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Реєстрація'
};

export default function SignUp() {
  return <SignUpComponent/>
}
