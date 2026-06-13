import {useEffect, useState} from "react";
import {useURL} from "@/src/hooks/shared/useURL";
import {Key} from "@heroui/react";

const useUserSort = () => {
    const [sort, setSort] = useState<string | null>(null)
    const [sortBy, setSortBy] = useState<string | null>(null)
    const {pathname, router, createQueryString} = useURL()
    useEffect(() => {
        if(sortBy){
            if(sortBy === 'reset'){
                router.push(pathname + '?' + createQueryString(`sortBy`, null, "delete"))
            }
            else{
                router.push(pathname + '?' + createQueryString(`sortBy`, sortBy, "set"))
            }
        }
    }, [sortBy]);

    useEffect(() => {
        if(sort){
            if(sort === 'reset'){
                router.push(pathname + '?' + createQueryString(`sort`, null, "delete"))
            }
            else{
                router.push(pathname + '?' + createQueryString(`sort`, sort))
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