'use client'
import {FC} from "react";
import { Label, ListBox, Select } from "@heroui/react";
import useSort from "@/src/components/shared/components/sort/useSort";

type PropsType = {
    listBoxItemsPropsAndValues: Array<{id: string, textValue: string, text: string}>,
    initialSortByValue?: string,
    initialSortValue?: string
}

const Sort: FC<PropsType> = ({listBoxItemsPropsAndValues, ...restProps}) => {
    const {sort, sortBy, handleChangeSortBy, handleChangeSort} = useSort(restProps)
    return (
        <div className="flex gap-3 items-center">
            <Select className="w-[160px]" placeholder="Сортувати за:" value={sortBy} onChange = {handleChangeSortBy}>
                <Label/>
                <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                    <ListBox>
                        <ListBox.Item id="reset" textValue="скинути">
                            Сортувати за:
                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                        {listBoxItemsPropsAndValues.map(({id, textValue, text}) => <ListBox.Item key={id} id={id} textValue={textValue}>
                            {text}
                            <ListBox.ItemIndicator />
                        </ListBox.Item>)}
                    </ListBox>
                </Select.Popover>
            </Select>
            <Select className="w-[180px]" placeholder="В порядку:" value={sort} onChange = {handleChangeSort}>
                <Label/>
                <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                    <ListBox>
                        <ListBox.Item id="reset" textValue="скинути">
                            В порядку:
                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item id="asc" textValue="Зростання">
                            Зростання
                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item id="desc" textValue="Спадання">
                            Спадання
                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                    </ListBox>
                </Select.Popover>
            </Select>
        </div>
    )
}

export default Sort