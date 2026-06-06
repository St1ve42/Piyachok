import {ChangeEventHandler, useEffect, useState} from "react";
import {useURL} from "@/src/hooks/shared/useURL";
import {useSearchQuery} from "@/src/hooks/tanstack-query/useSearchQuery";
import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";
import {IFullData} from "@/src/interfaces/shared/IFullData";

type PropsType<T> = {
    queryKeys: string[];
    fetchFn: (search: string) => Promise<IApiResponse<IFullData<T>>>;
}

const useSearch = <T>({queryKeys, fetchFn}: PropsType<T>) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState<string>('')
    const [debouncedInputValue, setDebouncedInputValue] = useState<string>('')
    const response = useSearchQuery<T>({search: debouncedInputValue, fetchFn, queryKeys})
    const {pathname, router, createQueryString} = useURL()
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedInputValue(inputValue), 500)
        return () => clearTimeout(timer)
    }, [inputValue]);
    const handleChangeInput: ChangeEventHandler<HTMLInputElement, HTMLInputElement> = (e) => {
        const val = e.target.value
        setInputValue(val)
        setIsOpen(val.length > 0);
    }
    const handleClickClearButton = () => {
        setInputValue('')
        setIsOpen(false);
    }
    return {inputValue, setInputValue, pathname, router, createQueryString, isOpen, setIsOpen, handleChangeInput, handleClickClearButton, response}
}

export default useSearch