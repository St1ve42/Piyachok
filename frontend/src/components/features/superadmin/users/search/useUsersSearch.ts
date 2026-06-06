import {ChangeEventHandler, KeyboardEventHandler, useEffect, useState} from "react";
import {Key} from "@heroui/react";
import {useURL} from "@/src/hooks/shared/useURL";
import { useUsersQuery } from "@/src/hooks/tanstack-query/useUsersQuery";

export const useUsersSearch = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState<string>('')
    const [debouncedInputValue, setDebouncedInputValue] = useState<string>('')
    const [name, surname] = debouncedInputValue.split(' ')
    const usersResponse = useUsersQuery({ name, surname });
    const {pathname, router, createQueryString} = useURL()
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedInputValue(inputValue), 500)
        return () => clearTimeout(timer)
    }, [inputValue]);
  useEffect(() => {
      router.push(pathname + '?' + createQueryString('nameAndSurname', debouncedInputValue))
  }, [debouncedInputValue]);
    const handleChangeInput: ChangeEventHandler<HTMLInputElement, HTMLInputElement> = (e) => {
        const val = e.target.value
        setInputValue(val)
        setIsOpen(val.length > 0);
    }
    const handleOnKeyDownInput: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if(e.key === 'Enter'){
            if(!inputValue){
                router.push(pathname + '?' + createQueryString('nameAndSurname', null, "delete"))
            }
            else{
                router.push(pathname + '?' + createQueryString('nameAndSurname', inputValue))
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
        router.push(pathname + '?' + createQueryString('nameAndSurname', key.toString()))
        setInputValue(key.toString())
        setIsOpen(false)
    }
    return {inputValue, setInputValue, pathname, router, createQueryString, usersResponse, isOpen, setIsOpen, handleChangeInput, handleOnKeyDownInput, handleClickClearButton, handleActionListBox}
}

export default useUsersSearch