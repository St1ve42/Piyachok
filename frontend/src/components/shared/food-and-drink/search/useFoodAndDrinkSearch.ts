import {ChangeEventHandler, KeyboardEventHandler, useEffect, useState} from "react";
import {useFoodAndDrinkSearchQuery} from "@/src/hooks/tanstack-query/useFoodAndDrinkSearchQuery";
import {Key} from "@heroui/react";
import {useURL} from "@/src/hooks/shared/useURL";

type PropsType = {
    type: 'public' | 'moderate' | 'all'
    accessCookie?: string
}

export const useFoodAndDrinkSearch = ({type, accessCookie}: PropsType) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState<string>('')
    const [debouncedInputValue, setDebouncedInputValue] = useState<string>('')
    const foodAndDrinkResponse = useFoodAndDrinkSearchQuery(debouncedInputValue, type, accessCookie)
    const {pathname, router, createQueryString} = useURL()
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedInputValue(inputValue), 500)
        return () => clearTimeout(timer)
    }, [inputValue]);
    useEffect(() => {
        if(!debouncedInputValue){
          router.push(pathname + '?' + createQueryString('name', null, "delete"))
        }
        else{
          router.push(pathname + '?' + createQueryString('name', debouncedInputValue))
        }
  }, [debouncedInputValue]);
    const handleChangeInput: ChangeEventHandler<HTMLInputElement, HTMLInputElement> = (e) => {
        const val = e.target.value
        setInputValue(val)
        setIsOpen(val.length > 0);
    }
    const handleOnKeyDownInput: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if(e.key === 'Enter'){
            if(!inputValue){
                router.push(pathname + '?' + createQueryString('name', null, "delete"))
            }
            else{
                router.push(pathname + '?' + createQueryString('name', inputValue))
            }
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