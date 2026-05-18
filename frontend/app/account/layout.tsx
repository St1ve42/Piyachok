import type {Metadata} from "next";
import React from "react";
import Sidebar from "@/src/components/features/account/sidebar/Sidebar";
import {headers} from "next/headers";
import {IUser} from "@/src/interfaces/users/IUser";

export const metadata: Metadata = {
    title: 'Мій акаунт'
};

type Props = { children: React.ReactNode }

const AccountLayout = async ({children}: Props) => {
    const allHeaders = await headers()
    const user: IUser = JSON.parse(decodeURIComponent(await allHeaders.get('x-user-data')))
    return (
        <div className="flex h-full justify-center">
            <div className="w-[80%] flex justify-between">
                <Sidebar/>
                <section className="w-[68%]">
                    {children}
                </section>
            </div>
        </div>
    );
}

export default AccountLayout;