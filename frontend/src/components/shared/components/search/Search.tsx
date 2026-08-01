'use client'
import {Label, SearchField} from "@heroui/react";
import useSearch from "@/src/components/shared/components/search/useSearch";

type PropsType = {
    initialValue?: string,
}

const Search = ({initialValue}: PropsType) => {
    const {inputValue, handleChangeInput, handleOnKeyDownInput, handleClickClearButton} = useSearch({initialValue})
    return (
        <div className="flex gap-3 items-center">
            <div className="relative w-[250px]">
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

export default Search