'use client'
import {
  Key,
  Label,
  LabelRootProps,
  ListBox,
  Select,
} from "@heroui/react";
import {FC} from "react";
import {useTypesQuery} from "@/src/hooks/tanstack-query/useTypesQuery";

type PropsType = {
    controlledValue?: string
    handleTypeSelect?: (key: Key | null) => void
} & LabelRootProps

const FoodAndDrinkTypeSelection: FC<PropsType> = ({controlledValue, handleTypeSelect, ...restLabelProps}) => {
    const typesQuery = useTypesQuery()
    if(typesQuery.isLoading){
        return <div>Завантаження...</div>
    }
    return (
        <Select value={controlledValue} className="w-full" name="type" placeholder="Виберіть тип:" onChange = {handleTypeSelect}>
            <Label {...restLabelProps}>Тип</Label>
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