'use client'
import {Key, Label, ListBox, Select} from "@heroui/react";
import {FC} from "react";
import {useTypes} from "@/src/tanstack-query-hooks/useTypes";
import {utils} from "@/src/utils/utils";

type PropsType = {
    handleTypeSelect?: (key: Key | null) => void
}

const FoodAndDrinkTypeSelection: FC<PropsType> = ({handleTypeSelect}) => {
    const typesQuery = useTypes()
    if(typesQuery.isLoading){
        return <div>Завантаження...</div>
    }
    return (
        <Select className="w-full" name="type" placeholder="Виберіть тип:" onChange = {handleTypeSelect}>
            <Label className="font-bold">Тип</Label>
            <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
            </Select.Trigger>
            <Select.Popover className="h-[200px]">
                <ListBox>
                    <ListBox.Item id={'reset'} textValue={'reset'}>
                        Не вказано
                        <ListBox.ItemIndicator />
                    </ListBox.Item>
                    {typesQuery.data && typesQuery.data.success && typesQuery.data.data.map(type =>
                        <ListBox.Item key={type} id={type} textValue={type}>
                            {type}
                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                    )}
                </ListBox>
            </Select.Popover>
        </Select>
    )
}

export default FoodAndDrinkTypeSelection