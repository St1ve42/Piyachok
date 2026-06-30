"use client"

import { Toast } from "@heroui/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactNode, useState} from "react";

export default function Providers({children}: {children: ReactNode}){
    const [queryClient] = useState(() => new QueryClient())
    return (
        <QueryClientProvider client = {queryClient}>
            <Toast.Provider placement={'top'}/>
            {children}
        </QueryClientProvider>
    );
}