import {useState} from "react";
import {Key} from "@heroui/react";
import {useURL} from "@/src/hooks/shared/useURL";

export const useFoodAndDrinkFiltration = () => {
    const [formKey, setFormKey] = useState(0);
    const {pathname, router, createQueryString} = useURL()
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
            const query = createQueryString(`averageReceipt[gte]`, value[0].toString())
            router.push(pathname + '?' + createQueryString(`averageReceipt[lte]`, value[1].toString(), "set", query))
        }
    }
    return {formKey, setFormKey, pathname, router, handleTypeSelect, handleRatingSelect, handleAverageReceiptSelect, handleFeatureCheck}
}

export default useFoodAndDrinkFiltration