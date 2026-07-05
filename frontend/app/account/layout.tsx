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
        <div className="flex h-full gap-10">
            <Sidebar user={user}/>
            <section className="w-[75%]">
                {children}
            </section>
        </div>
    );
}

export default AccountLayout;