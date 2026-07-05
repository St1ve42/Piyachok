'use client'
import {Button, Header, Label, ListBox, SearchField} from "@heroui/react";
import {FC} from "react";
import useReviewSearch from "@/src/components/features/reviews/search/useReviewSearch";
import {UserReviewSearchByEnum} from "@/src/enums/review/UserReviewSearchByEnum";

type PropsType = {
    searchBy?: UserReviewSearchByEnum
    isDropdown?: boolean,
    type: 'user' | 'superadmin'
}

const ReviewSearch: FC<PropsType> = ({searchBy = UserReviewSearchByEnum.TEXT, isDropdown = true, type}) => {
  const {inputValue, pathname, router, createQueryString, usersReviewsResponse, isOpen, setIsOpen, handleChangeInput, handleOnKeyDownInput, handleClickClearButton, handleActionListBox} = useReviewSearch({searchBy, isDropdown, type})
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
        {isDropdown && isOpen && usersReviewsResponse.data && (
          <div className="absolute top-full left-0 w-full mt-2 z-1 max-h-[210px] bg-white border-small border-default-200 rounded-2xl shadow-lg p-2 overflow-y-scroll">
            <ListBox aria-label={'Пошук закладів'} className="z-[9998]" onAction={handleActionListBox}>
              {usersReviewsResponse.isLoading
                ? <ListBox.Item>Завантаження...</ListBox.Item>
                : (usersReviewsResponse.data.success ?
                  (usersReviewsResponse.data.data.data.length !==0
                    ? usersReviewsResponse.data.data.data.map((review) => <ListBox.Item className="line-clamp-3" key={review.id} id={searchBy === UserReviewSearchByEnum.NAME ? review['foodAndDrink']['name']: review[searchBy]} textValue={searchBy === UserReviewSearchByEnum.NAME ? review['foodAndDrink']['name']: review[searchBy]}>{searchBy === UserReviewSearchByEnum.NAME ? review['foodAndDrink']['name']: review[searchBy]}</ListBox.Item>)
                    : <Header className="text-[16px]">Відгуків не знайдено</Header>)
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

export default ReviewSearch