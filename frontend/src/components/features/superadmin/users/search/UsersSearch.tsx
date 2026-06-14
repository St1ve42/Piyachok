'use client'
import { Button, Header, ListBox, SearchField, Label } from "@heroui/react";
import useUsersSearch from "@/src/components/features/superadmin/users/search/useUsersSearch";
import {FC} from "react";
import {UserSearchByEnum} from "@/src/enums/user/user.search.by";

type PropsType = {
    searchBy: UserSearchByEnum
    isDropdown?: boolean
}

const UsersSearch: FC<PropsType> = ({searchBy, isDropdown = true}) => {
  const {inputValue, pathname, router, createQueryString, usersResponse, isOpen, setIsOpen, handleChangeInput, handleOnKeyDownInput, handleClickClearButton, handleActionListBox} = useUsersSearch({searchBy, isDropdown})
  return (
    <div className="flex gap-3 items-center">
      <div className="relative w-[250px]">
        <SearchField name="search">
          <Label/>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input autoComplete="off" spellCheck="false" autoCorrect="off" placeholder="Пошук" value={inputValue} onChange={handleChangeInput} onKeyDown={handleOnKeyDownInput} onFocus={() => setIsOpen(true)}/>
            <SearchField.ClearButton onClick={handleClickClearButton}/>
          </SearchField.Group>
        </SearchField>
        {isDropdown && isOpen && usersResponse.data && (
          <div className="absolute top-full left-0 w-full mt-2 z-1 max-h-[210px] bg-white border-small border-default-200 rounded-2xl shadow-lg p-2 overflow-y-scroll">
            <ListBox aria-label={'Пошук закладів'} className="z-[9998]" onAction={handleActionListBox}>
              {usersResponse.isLoading
                ? <ListBox.Item>Завантаження...</ListBox.Item>
                : (usersResponse.data.success ?
                  (usersResponse.data.data.data.length !==0
                    ? usersResponse.data.data.data.map((user) => <ListBox.Item key={user.id} id={user[searchBy]} textValue={user[searchBy]}>{user[searchBy]}</ListBox.Item>)
                    : <Header className="text-[16px]">Користувачів не знайдено</Header>)
                  : <Header className="text-[16px]">Сталась помилка при пошуку</Header>)
              }
            </ListBox>
          </div>
        )}
      </div>
      <Button onClick={() => {
        if(!inputValue){
          router.push(pathname + '?' + createQueryString('search', null, "delete"))
        }
        else{
          router.push(pathname + '?' + createQueryString('search', inputValue))
        }
      }}>Знайти</Button>
    </div>
  )
}

export default UsersSearch