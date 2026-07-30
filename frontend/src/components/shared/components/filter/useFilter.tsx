import {useURL} from "@/src/hooks/shared/useURL";
import {Key} from "@heroui/react";
import { useMemo } from "react";

type PropsType<T extends Record<string, string>> = {
    searchByEnum: T,
}

const useFilter = <T extends Record<string, string>,>({searchByEnum}: PropsType<T>) => {
    const searchByValues = useMemo(() => Object.values(searchByEnum) as (T[keyof T])[], [searchByEnum])
    const {createQueryString, pathname, router} = useURL()
    const handleFilterChange = (key: Key) => {
        router.push(pathname + '?' + createQueryString('searchBy', key.toString()), {scroll: false})
    }
    return {handleFilterChange, searchByValues}
}

export default useFilter