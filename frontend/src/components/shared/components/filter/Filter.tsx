'use client'
import { Button, Dropdown, Header} from "@heroui/react";
import {Funnel} from "@gravity-ui/icons";
import useFilter from "./useFilter";

type PropsType<T extends Record<string, string>> = {
    searchByEnum: T,
    searchByTranslation: Record<T[keyof T], string>
}

const Filter = <T extends Record<string, string>,>({searchByEnum, searchByTranslation}: PropsType<T>) => {
    const {handleFilterChange, searchByValues} = useFilter({searchByEnum})
    return (
        <Dropdown>
            <Button isIconOnly aria-label="Menu" variant="secondary">
                <Funnel/>
            </Button>
            <Dropdown.Popover>
                <Dropdown.Menu onAction={handleFilterChange}>
                    <Header>Пошук за: </Header>
                    {searchByValues.map(searchByValue => <Dropdown.Item key={searchByValue} id={searchByValue} textValue={searchByTranslation[searchByValue]}>
                        {searchByTranslation[searchByValue]}
                    </Dropdown.Item>)}
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    )
}

export default Filter