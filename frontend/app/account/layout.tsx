import type {Metadata} from "next";
import React from "react";
import Sidebar from "@/src/components/layouts/sidebar/Sidebar";
import {getUserFromHeaders} from "@/src/services/server.service";

export const metadata: Metadata = {
    title: 'Мій профіль'
};

type Props = {
    children: React.ReactNode,
}

const AccountLayout = async ({children}: Props) => {
    const user = await getUserFromHeaders()
    return (
        <section className="w-full flex justify-between max-lg:justify-center pb-2">
            <Sidebar user={user}/>
            <div className="w-[77%] max-lg:w-full mt-2">
                {children}
            </div>
        </section>
    );
}

export default AccountLayout;