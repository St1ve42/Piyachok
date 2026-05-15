import {ChangeEventHandler, KeyboardEventHandler, useCallback, useEffect, useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useSearch} from "@/src/useQuery/useSearch";
import {Key} from "@heroui/react";

export const useFoodAndDrinkSearch = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState<string>('')
    const [debouncedInputValue, setDebouncedInputValue] = useState<string>('')
    const pathname = usePathname()
    const router = useRouter()
    const foodAndDrinkResponse = useSearch(debouncedInputValue)
    const searchParams = useSearchParams()
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            if(value === ''){
                params.delete(name)
            }
            else{
                params.set(name, value)
            }

            return params.toString()
        },
        [searchParams]
    )
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedInputValue(inputValue), 500)
        return () => clearTimeout(timer)
    }, [inputValue]);
    const handleChangeInput: ChangeEventHandler<HTMLInputElement, HTMLInputElement> = (e) => {
        const val = e.target.value
        setInputValue(val)
        setIsOpen(val.length > 0);
    }
    const handleOnKeyDownInput: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if(e.key === 'Enter'){
            router.push(pathname + '?' + createQueryString('name', inputValue))
            setIsOpen(false);
        }
        else if(e.key === 'Escape'){
            setInputValue('')
            setIsOpen(false);
        }
    }
    const handleClickClearButton = () => {
        setInputValue('')
        setIsOpen(false);
    }
    const handleActionListBox = (key: Key) => {
        router.push(pathname + '?' + createQueryString('name', key.toString()))
        setInputValue(key.toString())
        setIsOpen(false)
    }
    return {inputValue, setInputValue, pathname, router, createQueryString, foodAndDrinkResponse, isOpen, setIsOpen, handleChangeInput, handleOnKeyDownInput, handleClickClearButton, handleActionListBox}
}

export default useFoodAndDrinkSearch