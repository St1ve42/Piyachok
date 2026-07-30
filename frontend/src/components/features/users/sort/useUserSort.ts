import {useEffect, useState} from "react";
import {useURL} from "@/src/hooks/shared/useURL";
import {Key} from "@heroui/react";
import {SortEnum} from "@/src/enums/shared/SortEnum";

type PropsType = {
    initialSortBy?: string,
    initialSort?: SortEnum
}


const useUserSort = ({initialSortBy, initialSort}: PropsType) => {
    const [sort, setSort] = useState<string | null>(initialSort ?? null)
    const [sortBy, setSortBy] = useState<string | null>(initialSortBy ?? null)
    const {pathname, router, createQueryString, searchParams} = useURL()
    const {size} = searchParams
    useEffect(() => {
        if(size === 0){
            setSortBy('reset')
            setSort('reset')
        }
    }, [size]);
    useEffect(() => {
        if(sortBy){
            const query = createQueryString('page', '1', 'set')
            if(sortBy === 'reset'){
                router.push(pathname + '?' + createQueryString(`sortBy`, null, "delete", query))
            }
            else{
                router.push(pathname + '?' + createQueryString(`sortBy`, sortBy, "set", query))
            }
        }
    }, [sortBy]);

    useEffect(() => {
        if(sort){
            const query = createQueryString('page', '1', 'set')
            if(sort === 'reset'){
                router.push(pathname + '?' + createQueryString(`sort`, null, "delete", query))
            }
            else{
                router.push(pathname + '?' + createQueryString(`sort`, sort, 'set', query))
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

export default useUserSort