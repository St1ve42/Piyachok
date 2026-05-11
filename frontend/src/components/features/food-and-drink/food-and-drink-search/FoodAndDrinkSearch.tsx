'use client'
import {Button, Label, SearchField} from "@heroui/react";
import {useCallback, useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

const FoodAndDrinkSearch = () => {
    const [inputValue, setInputValue] = useState<string>('')
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            if(value === ''){
                params.delete(name)
            }
            else{
                params.set(name, value)
            }

            return params.toString()
        },
        [searchParams]
    )
    return (
        <div className="flex gap-3">
            <SearchField name="search">
                <Label/>
                <SearchField.Group>
                    <SearchField.SearchIcon />
                    <SearchField.Input className="w-[280px]" placeholder="Пошук" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => {
                        if(e.key === 'Enter'){
                            router.push(pathname + '?' + createQueryString('search', inputValue))
                        }
                    }}/>
                    <SearchField.ClearButton onClick={() => setInputValue('')}/>
                </SearchField.Group>
            </SearchField>
            <Button onClick={() => router.push(pathname + '?' + createQueryString('search', inputValue))}>Знайти</Button>
        </div>
    )
}

export default FoodAndDrinkSearch