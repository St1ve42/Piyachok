import {useState} from "react";
import {Key} from "@heroui/react";
import {useURL} from "@/src/hooks/shared/useURL";

export const useFoodAndDrinkFiltration = () => {
    const [formKey, setFormKey] = useState(0);
    const {pathname, router, createQueryString} = useURL()
    const handleTypeSelect = (key: Key | null) => {
        if(key){
            if(key !== 'reset'){
                router.push(pathname + '?' + createQueryString('type', `${key}`), {scroll: false})
            }
            else{
                router.push(pathname + '?' + createQueryString('type', null, "delete"), {scroll: false})
            }
        }
    }
    const handleFeatureCheck = (feature: string) => {
        return (isSelected: boolean) => {
            if(isSelected){
                router.push(pathname + '?' + createQueryString('features[]', feature, "append"), {scroll: false})
            }
            else{
                router.push(pathname + '?' + createQueryString('features[]', feature, "delete"), {scroll: false})
            }
        }
    }
    const handleRatingSelect = (value: number | number[]) => {
        let rating;
        if(Array.isArray(value)) {
            rating = value[0]
        }
        else{
            rating = value
        }
        if (rating !== 0) {
            router.push(pathname + '?' + createQueryString('rating', value.toString()), {scroll: false})
        } else {
            router.push(pathname + '?' + createQueryString('rating', null, "delete"), {scroll: false})
        }
    }

    const clearFilters = () => {
        router.push(pathname, { scroll: false });
        setTimeout(() => setFormKey(prev => prev + 1), 200);
    };

    const handleAverageReceiptSelect = (value: number | number[]) => {
        if(Array.isArray(value) && value.length == 2){
            const query = createQueryString(`averageReceipt[gte]`, value[0].toString())
            router.push(pathname + '?' + createQueryString(`averageReceipt[lte]`, value[1].toString(), "set", query), {scroll: false})
        }
    }
    return {formKey, handleTypeSelect, handleRatingSelect, handleAverageReceiptSelect, handleFeatureCheck, clearFilters}
}

export default useFoodAndDrinkFiltration