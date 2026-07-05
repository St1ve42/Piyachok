import type { Metadata } from "next";
import ChangePassword from "@/src/components/views/account/ChangePassword";

export const metadata: Metadata = {
  title: "Зміна паролю",
};

const ChangePasswordPage = () => {
    return <ChangePassword/>;
};

export default ChangePasswordPage;
