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
        <section className="w-full flex justify-between">
            <Sidebar user={user}/>
            <div className="w-[77%] mt-7">
                {children}
            </div>
        </section>
    );
}

export default AccountLayout;