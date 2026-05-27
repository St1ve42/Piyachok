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
        <div className="flex h-full justify-evenly">
            <Sidebar user={user}/>
            <section className="w-[65%]">
                {children}
            </section>
        </div>
    );
}

export default AccountLayout;