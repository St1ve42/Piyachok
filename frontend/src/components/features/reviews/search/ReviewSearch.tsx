'use client'
import {Button, Header, Label, ListBox, SearchField} from "@heroui/react";
import {FC, JSX} from "react";
import useReviewSearch from "@/src/components/features/reviews/search/useReviewSearch";
import {UserReviewSearchByEnum} from "@/src/enums/review/UserReviewSearchByEnum";
import {IReviewWithCreatorAndFoodAndDrink} from "@/src/interfaces/reviews/IReviewWithCreatorAndFoodAndDrink";

type PropsType = {
    searchBy?: UserReviewSearchByEnum
    isDropdown?: boolean,
    type: 'user' | 'superadmin',
    initialSearchValue?: string
}

const ReviewSearch: FC<PropsType> = ({searchBy = UserReviewSearchByEnum.TEXT, isDropdown = true, type, initialSearchValue}) => {
  const {inputValue, pathname, router, createQueryString, usersReviewsResponse, isOpen, setIsOpen, handleChangeInput, handleOnKeyDownInput, handleClickClearButton, handleActionListBox} = useReviewSearch({searchBy, isDropdown, type, initialSearchValue})
  const mapCallback: (review: IReviewWithCreatorAndFoodAndDrink) => JSX.Element = (review) => {
      let search: string
      switch (searchBy) {
          case UserReviewSearchByEnum.FOOD_AND_DRINK_NAME:
            search = review['foodAndDrink']['name']
            break
          case UserReviewSearchByEnum.USER_NAME:
            search = review['creator']['name']
            break
          default:
            search = review[searchBy]
      }
      return <ListBox.Item className="line-clamp-3" key={review.id} id={search} textValue={search}>{search}</ListBox.Item>
  }
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
                    ? usersReviewsResponse.data.data.data.map(mapCallback)
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