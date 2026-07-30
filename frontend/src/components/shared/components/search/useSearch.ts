import {ChangeEventHandler, KeyboardEventHandler, useEffect, useState} from "react";
import {Key} from "@heroui/react";
import {useURL} from "@/src/hooks/shared/useURL";

type PropsType = {
    initialValue?: string,
}

export const useSearch = ({initialValue}: PropsType) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState<string>(initialValue ?? '')
    const [debouncedInputValue, setDebouncedInputValue] = useState<string>(initialValue ?? '')
    const {pathname, router, createQueryString} = useURL()
    useEffect(() => {
        if(inputValue){
            const timer = setTimeout(() => setDebouncedInputValue(inputValue), 500)
            return () => clearTimeout(timer)
        }
    }, [inputValue]);
    useEffect(() => {
        const query = createQueryString('page', '1', 'set')
        if(!debouncedInputValue){
          router.push(pathname + '?' + createQueryString('search', null, "delete", query))
        }
        else{
          router.push(pathname + '?' + createQueryString('search', debouncedInputValue, 'set', query))
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
                router.push(pathname + '?' + createQueryString('search', null, "delete"))
            }
            else{
                router.push(pathname + '?' + createQueryString('search', inputValue))
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
        router.push(pathname + '?' + createQueryString('search', key.toString()))
        setInputValue(key.toString())
        setIsOpen(false)
    }
    return {inputValue, setInputValue, pathname, router, createQueryString, isOpen, setIsOpen, handleChangeInput, handleOnKeyDownInput, handleClickClearButton, handleActionListBox, debouncedInputValue}
}

export default useSearch