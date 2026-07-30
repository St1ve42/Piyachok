import { useState } from "react";
import {Key} from "@heroui/react";
import {useURL} from "@/src/hooks/shared/useURL";

export const useFoodAndDrinkFiltration = () => {
    const [formKey, setFormKey] = useState(0);
    const {pathname, router, createQueryString} = useURL()
    const handleTypeSelect = (key: Key | null) => {
        if(key){
            const query = createQueryString('page', '1')
            if(key !== 'reset'){
                router.push(pathname + '?' + createQueryString('type', `${key}`, 'set', query), {scroll: false})
            }
            else{
                router.push(pathname + '?' + createQueryString('type', null, "delete", query), {scroll: false})
            }
        }
    }
    const handleFeatureCheck = (feature: string) => {
        return (isSelected: boolean) => {
            const query = createQueryString('page', '1')
            if(isSelected){
                router.push(pathname + '?' + createQueryString('features[]', feature, "append", query), {scroll: false})
            }
            else{
                router.push(pathname + '?' + createQueryString('features[]', feature, "delete", query), {scroll: false})
            }
        }
    }
    const handleRatingSelect = (value: number | number[]) => {
        const query = createQueryString('page', '1')
        let rating;
        if(Array.isArray(value)) {
            rating = value[0]
        }
        else{
            rating = value
        }
        if (rating !== 0) {
            router.push(pathname + '?' + createQueryString('rating', value.toString(), "set", query), {scroll: false})
        } else {
            router.push(pathname + '?' + createQueryString('rating', null, "delete", query), {scroll: false})
        }
    }

    const clearFilters = () => {
        let query = createQueryString('type', undefined, "delete")
        query = createQueryString('rating', undefined, "delete", query)
        query = createQueryString('features[]', undefined, "delete", query)
        query = createQueryString('averageReceipt[gte]', undefined, "delete", query)
        query = createQueryString('averageReceipt[lte]', undefined, "delete", query)
        router.push(pathname + '?' + query, { scroll: false });
        setTimeout(() => setFormKey(prev => prev + 1), 200);
    };

    const handleAverageReceiptSelect = (value: number | number[]) => {
        if(Array.isArray(value) && value.length == 2){
            let query = createQueryString(`averageReceipt[gte]`, value[0].toString())
            query = createQueryString('page', '1', 'set', query)
            router.push(pathname + '?' + createQueryString(`averageReceipt[lte]`, value[1].toString(), "set", query), {scroll: false})
        }
    }
    return {formKey, handleTypeSelect, handleRatingSelect, handleAverageReceiptSelect, handleFeatureCheck, clearFilters}
}

export default useFoodAndDrinkFiltration