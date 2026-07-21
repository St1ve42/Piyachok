import type { Metadata } from "next";
import ChangePasswordView from "@/src/components/views/account/ChangePasswordView";

export const metadata: Metadata = {
  title: "Зміна паролю",
};

const ChangePasswordPage = () => {
    return <ChangePasswordView/>;
};

export default ChangePasswordPage;
