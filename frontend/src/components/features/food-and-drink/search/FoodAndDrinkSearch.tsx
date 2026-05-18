'use client'
import {Button, Label, ListBox, SearchField, Header} from "@heroui/react";
import useFoodAndDrinkSearch from "@/src/components/features/food-and-drink/search/useFoodAndDrinkSearch";

const FoodAndDrinkSearch = () => {
    const {inputValue, pathname, router, createQueryString, foodAndDrinkResponse, isOpen, setIsOpen, handleChangeInput, handleOnKeyDownInput, handleClickClearButton, handleActionListBox} = useFoodAndDrinkSearch()
    return (
        <div className="flex gap-3">
            <div className="relative w-[280px]">
                <SearchField name="search">
                    <Label/>
                    <SearchField.Group>
                        <SearchField.SearchIcon />
                        <SearchField.Input className="w-[280px]" autoComplete="off" spellCheck="false" autoCorrect="off" placeholder="Пошук" value={inputValue} onChange={handleChangeInput} onKeyDown={handleOnKeyDownInput} onFocus={() => setIsOpen(true)}/>
                        <SearchField.ClearButton onClick={handleClickClearButton}/>
                    </SearchField.Group>
                </SearchField>
                {isOpen && foodAndDrinkResponse.data && (
                    <div className="absolute top-full left-0 w-full mt-2 z-1 max-h-[210px] bg-white border-small border-default-200 rounded-2xl shadow-lg p-2 overflow-y-scroll">
                        <ListBox aria-label={'Пошук закладів'} className="z-[9998]" onAction={handleActionListBox}>
                            {foodAndDrinkResponse.isLoading
                                    ? <ListBox.Item>Завантаження...</ListBox.Item>
                                : (foodAndDrinkResponse.data.success ?
                                    (foodAndDrinkResponse.data.data.data.length !==0
                                    ? foodAndDrinkResponse.data.data.data.map(({name, id}) => <ListBox.Item key={id} id={name} textValue={name}>{name}</ListBox.Item>)
                                    : <Header className="text-[16px]">Закладів не знайдено</Header>)
                                : <Header className="text-[16px]">Сталась помилка при пошуку</Header>)
                            }
                        </ListBox>
                    </div>
                )}
            </div>
            <Button onClick={() => {
                if(!inputValue){
                    router.push(pathname + '?' + createQueryString('name', null, "delete"))
                }
                else{
                    router.push(pathname + '?' + createQueryString('name', inputValue))
                }
            }}>Знайти</Button>
        </div>
    )
}

export default FoodAndDrinkSearch