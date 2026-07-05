import { useEffect, useState } from "react";
import {useURL} from "@/src/hooks/shared/useURL";
import {Key} from "@heroui/react";

type PropsType = {
    initialSortByValue?: string,
    initialSortValue?: string
}

const useSort = ({initialSortValue, initialSortByValue}: PropsType) => {
    const [sort, setSort] = useState<string | undefined>(initialSortValue)
    const [sortBy, setSortBy] = useState<string | undefined>(initialSortByValue)
    const {pathname, router, createQueryString} = useURL()
    useEffect(() => {
        if(sortBy){
            if(sortBy === 'reset'){
                router.push(pathname + '?' + createQueryString(`sortBy`, null, "delete"), {scroll: false})
            }
            else{
                router.push(pathname + '?' + createQueryString(`sortBy`, sortBy, "set"), {scroll: false})
            }
        }
    }, [sortBy]);

    useEffect(() => {
        if(sort){
            if(sort === 'reset'){
                router.push(pathname + '?' + createQueryString(`sort`, null, "delete"), {scroll: false})
            }
            else{
                router.push(pathname + '?' + createQueryString(`sort`, sort), {scroll: false})
            }
        }
    }, [sort]);
    const handleChangeSortBy = (key: Key | null) => {
        if(key){
            setSortBy(`${key}`)
        }
    }
    const handleChangeSort = (key: Key | null) => {
        if (key) {
            setSort(`${key}`)
        }
    }
    return {sort, sortBy, handleChangeSortBy, handleChangeSort}
}

export default useSort