import {Button, Header, Key, Label, ListBox, SearchField} from "@heroui/react";
import useSearch from "@/src/components/shared/search/useSearch";
import {KeyboardEventHandler} from "react";
import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";
import {IFullData} from "@/src/interfaces/shared/IFullData";

type PropsType<T extends {name: string; id: string}> = {
    handleOnKeyDownInput: KeyboardEventHandler<HTMLInputElement>
    handleActionListBox: (key: Key) => void
    handleClickFindButton: () => void
    queryKeys: string[];
    fetchFn: (search: string) => Promise<IApiResponse<IFullData<T>>>;
}

const Search = <T extends {name: string; id: string},>({handleClickFindButton, handleOnKeyDownInput, handleActionListBox, queryKeys, fetchFn}: PropsType<T>) => {
    const {inputValue, isOpen, setIsOpen, handleChangeInput, handleClickClearButton, response} = useSearch<T>({queryKeys, fetchFn})
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
                {isOpen && response.data && (
                    <div className="absolute top-full left-0 w-full mt-2 z-1 max-h-[210px] bg-white border-small border-default-200 rounded-2xl shadow-lg p-2 overflow-y-scroll">
                        <ListBox aria-label={'Пошук елементів'} className="z-[9998]" onAction={handleActionListBox}>
                            {response.isLoading
                                ? <ListBox.Item>Завантаження...</ListBox.Item>
                                : (response.data.success ?
                                    (response.data.data.data.length !==0
                                        ? response.data.data.data.map(({name, id}) => <ListBox.Item key={id} id={name} textValue={name}>{name}</ListBox.Item>)
                                        : <Header className="text-[16px]">Закладів не знайдено</Header>)
                                    : <Header className="text-[16px]">Сталась помилка при пошуку</Header>)
                            }
                        </ListBox>
                    </div>
                )}
            </div>
            <Button onClick={handleClickFindButton}>Знайти</Button>
        </div>
    )
}

export default Search