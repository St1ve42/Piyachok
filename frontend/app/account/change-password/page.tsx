import type { Metadata } from "next";
import ChangePassword from "@/src/components/features/account/change-password/ChangePassword";

export const metadata: Metadata = {
  title: "Зміна паролю",
};

const ChangePasswordPage = () => {
    return <ChangePassword/>;
};

export default ChangePasswordPage;
