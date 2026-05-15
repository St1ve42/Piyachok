'use client'
import {Label, ListBox, Select} from "@heroui/react";
import {useCallback, useEffect, useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

const FoodAndDrinkSort = () => {
    const [sort, setSort] = useState<string | null>(null)
    const [sortBy, setSortBy] = useState<string | null>(null)
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const createQueryString = useCallback((name: string, value: string | null, action: "set" | "append" | "delete" = "set", initialSearchParams: string = searchParams.toString()) =>{
        const query = new URLSearchParams(initialSearchParams)
        if(value){
            switch(action){
                case "set":
                    query.set(name, value)
                    break
                case "delete":
                    query.delete(name, value)
                    break
                case "append":
                    query.append(name, value)
                    break
            }
        }
        else{
            switch(action){
                case "delete":
                    query.delete(name)
                    break
            }
        }
        return query.toString()
    }, [searchParams])
    useEffect(() => {
        if(sortBy){
            if(!sort){
                router.push(pathname + '?' + createQueryString(`sort[${sortBy}]`, 'asc'))
            }
            else{
                router.push(pathname + '?' + createQueryString(`sort[${sortBy}]`, sort))
            }
        }
    }, [sort, sortBy]);
    return (
        <div className="flex gap-3">
            <Select className="w-[180px]" placeholder="Сортувати за" value={sortBy} onChange = {(key) => {
                if(key){
                    setSortBy(`${key}`)
                }
            }}>
                <Label/>
                <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                    <ListBox>
                        <ListBox.Item id="rating" textValue="рейтинг">
                            Рейтингом
                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item id="averageReceipt" textValue="Середній чек">
                            Середнім чеком
                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item id="createdAt" textValue="Дата створення">
                            Датою створення
                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item id="name" textValue="Назва">
                            Назвою
                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item id="distance" textValue="Відстань">
                            Відстанню
                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                    </ListBox>
                </Select.Popover>
            </Select>
            <Select className="w-[180px]" placeholder="Сортувати в порядку" value={sort} onChange = {(key) => {
                if(key){
                    setSort(`${key}`)
                }
            }}>
                <Label/>
                <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                    <ListBox>
                        <ListBox.Item id="asc" textValue="Зростання">
                            Зростанням
                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item id="desc" textValue="Спадання">
                            Спаданням
                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                    </ListBox>
                </Select.Popover>
            </Select>
        </div>
    )
}

export default FoodAndDrinkSort





