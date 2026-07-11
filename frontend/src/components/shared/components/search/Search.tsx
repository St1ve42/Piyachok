'use client'
import {Button, Label, ListBox, SearchField, Header} from "@heroui/react";
import {useQuery} from "@tanstack/react-query";
import useSearch from "@/src/components/shared/components/search/useSearch";
import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";
import {IFullData} from "@/src/interfaces/shared/IFullData";
import {ReactNode} from "react";

type PropsType<T> = {
    initialValue?: string,
    searchBy: string,
    queryKey: string
    queryFn: (query?: any) => Promise<IApiResponse<IFullData<T>>>,
    mapCallback: (value: T, index: number, array: T[]) => ReactNode,
    notFoundMessage: string,
}

const Search = <T,>({queryFn, initialValue, mapCallback, searchBy, notFoundMessage}: PropsType<T>) => {
    const {inputValue, pathname, router, createQueryString, isOpen, setIsOpen, handleChangeInput, handleOnKeyDownInput, handleClickClearButton, handleActionListBox, debouncedInputValue} = useSearch({initialValue})
    const searchQuery = useQuery({
        queryKey: [debouncedInputValue, searchBy],
        queryFn: async () => queryFn({[searchBy]: debouncedInputValue}),
        enabled: !!debouncedInputValue
    })
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
                {isOpen && searchQuery.data && (
                    <div className="absolute top-full left-0 w-full mt-2 z-1 max-h-[210px] bg-white border-small border-default-200 rounded-2xl shadow-lg p-2 overflow-y-scroll">
                        <ListBox aria-label={'Пошук закладів'} className="z-[9998]" onAction={handleActionListBox}>
                            {searchQuery.isLoading
                                    ? <ListBox.Item>Завантаження...</ListBox.Item>
                                : (searchQuery.data.success ?
                                    (searchQuery.data.data.data.length !==0
                                    ? searchQuery.data.data.data.map(mapCallback)
                                    : <Header className="text-[16px]">{notFoundMessage}</Header>)
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

export default Search