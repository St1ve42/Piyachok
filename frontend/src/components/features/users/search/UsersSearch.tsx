'use client'
import { SearchField, Label } from "@heroui/react";
import useUsersSearch from "@/src/components/features/users/search/useUsersSearch";
import {FC} from "react";

type PropsType = {
    initialSearch?: string
}

const UsersSearch: FC<PropsType> = ({initialSearch}) => {
  const {inputValue, handleChangeInput, handleOnKeyDownInput, handleClickClearButton} = useUsersSearch({initialSearch})
  return (
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
  )
}

export default UsersSearch