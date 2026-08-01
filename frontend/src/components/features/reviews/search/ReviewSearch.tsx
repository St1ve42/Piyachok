'use client'
import {Label, SearchField} from "@heroui/react";
import {FC} from "react";
import useReviewSearch from "@/src/components/features/reviews/search/useReviewSearch";

type PropsType = {
    initialSearchValue?: string
}

const ReviewSearch: FC<PropsType> = ({initialSearchValue}) => {
  const {inputValue, handleChangeInput, handleOnKeyDownInput, handleClickClearButton} = useReviewSearch({initialSearchValue})
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

export default ReviewSearch