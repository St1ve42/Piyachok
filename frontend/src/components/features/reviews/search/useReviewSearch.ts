import {ChangeEventHandler, KeyboardEventHandler, useEffect, useState} from "react";
import {useURL} from "@/src/hooks/shared/useURL";

export const useReviewSearch = ({initialSearchValue}: {initialSearchValue?: string}) => {
    const [inputValue, setInputValue] = useState<string>(initialSearchValue ?? '')
    const [debouncedInputValue, setDebouncedInputValue] = useState<string>('')
    const {pathname, router, createQueryString} = useURL()
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedInputValue(inputValue), 500)
        return () => clearTimeout(timer)
    }, [inputValue]);
      useEffect(() => {
          const query = createQueryString('page', '1', 'set')
          if(!debouncedInputValue){
              router.push(pathname + '?' + createQueryString('search', null, 'delete', query))
          }
          else{
              router.push(pathname + '?' + createQueryString('search', debouncedInputValue, 'set', query))
          }
      }, [debouncedInputValue]);
    const handleChangeInput: ChangeEventHandler<HTMLInputElement, HTMLInputElement> = (e) => {
        const val = e.target.value
        setInputValue(val)
    }
    const handleOnKeyDownInput: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if(e.key === 'Enter'){
            if(!inputValue){
                router.push(pathname + '?' + createQueryString('search', null, "delete"))
            }
            else{
                router.push(pathname + '?' + createQueryString('search', inputValue))
            }
        }
        else if(e.key === 'Escape'){
            setInputValue('')
        }
    }
    const handleClickClearButton = () => {
        setInputValue('')
    }
    return {inputValue, setInputValue, handleChangeInput, handleOnKeyDownInput, handleClickClearButton}
}

export default useReviewSearch