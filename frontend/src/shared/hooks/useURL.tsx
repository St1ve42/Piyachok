import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useCallback} from "react";

export function useURL(){
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    // const createQueryString2 = useCallback((params: Array<{ name: string, value: string | null, action: "set" | "append" | "delete"}> | { name: string, value: string | null, action: "set" | "append" | "delete"}, initialSearchParams: string = searchParams.toString()) =>{
    //     const query = new URLSearchParams(initialSearchParams)
    //     params.forEach((param) => {
    //         const {name, value, action} = param
    //         if(value){
    //             switch(action){
    //                 case "set":
    //                     query.set(name, value)
    //                     break
    //                 case "delete":
    //                     query.delete(name, value)
    //                     break
    //                 case "append":
    //                     query.append(name, value)
    //                     break
    //             }
    //         }
    //         else{
    //             switch(action){
    //                 case "delete":
    //                     query.delete(name)
    //                     break
    //             }
    //         }
    //     })
    //     return query.toString()
    // }, [searchParams])
    const createQueryString = useCallback((name: string, value: string | null, action: "set" | "append" | "delete" = "set", initialSearchParams: string = searchParams.toString()) =>{
        const query = new URLSearchParams(initialSearchParams)
        if(value){
            switch(action){
                case "set":
                    query.set(name, value)
                    break
                case "delete":
                    query.delete(name, value)
                    break
                case "append":
                    query.append(name, value)
                    break
            }
        }
        else{
            switch(action){
                case "delete":
                    query.delete(name)
                    break
            }
        }
        return query.toString()
    }, [searchParams])
    return {pathname, router, createQueryString}
}