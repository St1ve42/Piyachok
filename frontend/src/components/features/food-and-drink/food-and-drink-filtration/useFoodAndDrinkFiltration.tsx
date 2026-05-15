import {useCallback, useState} from "react";
import {useTypes} from "@/src/useQuery/useTypes";
import {useFeatures} from "@/src/useQuery/useFeatures";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Key} from "@heroui/react";

export const useFoodAndDrinkFiltration = () => {
    const [formKey, setFormKey] = useState(0);
    const typesQuery = useTypes()
    const featuresQuery = useFeatures()
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
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
    const handleTypeSelect = (key: Key | null) => {
        if(key){
            if(key !== 'reset'){
                router.push(pathname + '?' + createQueryString('type', `${key}`))
            }
            else{
                router.push(pathname + '?' + createQueryString('type', null, "delete"))
            }
        }
    }
    const handleFeatureCheck = (feature: string) => {
        return (isSelected: boolean) => {
            if(isSelected){
                router.push(pathname + '?' + createQueryString('features[]', feature, "append"))
            }
            else{
                router.push(pathname + '?' + createQueryString('features[]', feature, "delete"))
            }
        }
    }
    const handleRatingSelect = (value: number | number[]) => {
        if(Array.isArray(value)) {
            const [rating] = value
            if (rating !== 0) {
                router.push(pathname + '?' + createQueryString('rating', value.toString()))
            } else {
                router.push(pathname + '?' + createQueryString('rating', null, "delete"))
            }
        }
    }
    const handleAverageReceiptSelect = (value: number | number[]) => {
        if(Array.isArray(value) && value.length == 2){
            const query = createQueryString(`range[averageReceipt][gte]`, value[0].toString())
            router.push(pathname + '?' + createQueryString(`range[averageReceipt][lte]`, value[1].toString(), "set", query))
        }
    }
    return {formKey, setFormKey, typesQuery, featuresQuery, pathname, router, handleTypeSelect, handleRatingSelect, handleAverageReceiptSelect, handleFeatureCheck}
}

export default useFoodAndDrinkFiltration