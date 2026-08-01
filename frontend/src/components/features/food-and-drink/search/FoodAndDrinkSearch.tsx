'use client'
import {Label, SearchField} from "@heroui/react";
import useFoodAndDrinkSearch from "@/src/components/features/food-and-drink/search/useFoodAndDrinkSearch";
import {FC} from "react";

type PropsType = {
    initialValue?: string
    type: 'public' | 'moderate' | 'all'
    accessCookie?: string
}

const FoodAndDrinkSearch: FC<PropsType> = (props) => {
    const {inputValue, handleChangeInput, handleOnKeyDownInput, handleClickClearButton} = useFoodAndDrinkSearch(props)
    return (
        <div className="flex gap-3 items-center">
            <div className="relative w-[250px] max-lg:w-[210px]">
                <SearchField name="search">
                    <Label/>
                    <SearchField.Group>
                        <SearchField.SearchIcon />
                        <SearchField.Input autoComplete="off" spellCheck="false" autoCorrect="off" placeholder="Пошук" value={inputValue} onChange={handleChangeInput} onKeyDown={handleOnKeyDownInput}/>
                        <SearchField.ClearButton onClick={handleClickClearButton}/>
                    </SearchField.Group>
                </SearchField>
            </div>
        </div>
    )
}

export default FoodAndDrinkSearch