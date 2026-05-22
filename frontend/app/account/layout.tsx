import type {Metadata} from "next";
import React from "react";
import Sidebar from "@/src/components/features/account/sidebar/Sidebar";
import {headers} from "next/headers";
import {IUser} from "@/src/interfaces/users/IUser";
import {redirect} from "next/navigation";

export const metadata: Metadata = {
    title: 'Мій профіль'
};

type Props = {
    children: React.ReactNode,
}

const AccountLayout = async ({children}: Props) => {
    const allHeaders = await headers()
    const rawUser = allHeaders.get('x-user-data')
    if(!rawUser){
        redirect('/auth/sign-in')
    }
    const user: IUser = JSON.parse(decodeURIComponent(rawUser))
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