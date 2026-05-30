'use client'
import {Key, Label, ListBox, Select} from "@heroui/react";
import {FC} from "react";
import {useTypes} from "@/src/tanstack-query-hooks/useTypes";

type PropsType = {
    handleTypeSelect?: (key: Key | null) => void
    isRequired?: boolean
}

const FoodAndDrinkTypeSelection: FC<PropsType> = ({handleTypeSelect, isRequired = false}) => {
    const typesQuery = useTypes()
    if(typesQuery.isLoading){
        return <div>Завантаження...</div>
    }
    return (
        <Select className="w-full" name="type" placeholder="Виберіть тип:" onChange = {handleTypeSelect}>
            <Label isRequired={isRequired}>Тип</Label>
            <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
            </Select.Trigger>
            <Select.Popover className="h-[200px]">
                <ListBox>
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