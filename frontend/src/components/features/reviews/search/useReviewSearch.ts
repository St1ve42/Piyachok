import {ChangeEventHandler, KeyboardEventHandler, useEffect, useState} from "react";
import {Key} from "@heroui/react";
import {useURL} from "@/src/hooks/shared/useURL";
import {useReviewQuery} from "@/src/hooks/tanstack-query/useUserReviewsQuery";

export const useReviewSearch = ({searchBy, isDropdown, type, initialSearchValue}: {searchBy: string, isDropdown: boolean, type: 'user' | 'superadmin', initialSearchValue?: string}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState<string>(initialSearchValue ?? '')
    const [debouncedInputValue, setDebouncedInputValue] = useState<string>('')
    const usersReviewsResponse = useReviewQuery({ searchBy, inputValue: debouncedInputValue, isDropdown, type });
    const {pathname, router, createQueryString} = useURL()
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedInputValue(inputValue), 500)
        return () => clearTimeout(timer)
    }, [inputValue]);
      useEffect(() => {
          const query = createQueryString('page', '1', 'set')
          router.push(pathname + '?' + createQueryString('search', debouncedInputValue, 'set', query))
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
    return {inputValue, setInputValue, pathname, router, createQueryString, usersReviewsResponse, isOpen, setIsOpen, handleChangeInput, handleOnKeyDownInput, handleClickClearButton, handleActionListBox}
}

export default useReviewSearch