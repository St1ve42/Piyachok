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
    initialValue?: string
    controlledValue?: string
    handleTypeSelect?: (key: Key | null) => void
} & LabelRootProps

const FoodAndDrinkTypeSelection: FC<PropsType> = ({initialValue, controlledValue, handleTypeSelect, ...restLabelProps}) => {
    const typesQuery = useTypesQuery()
    if(typesQuery.isLoading){
        return <div>Завантаження...</div>
    }
    return (
        <Select value={controlledValue} defaultValue={initialValue} className="w-full" name="type" placeholder="Виберіть тип:" onChange = {handleTypeSelect}>
            <Label {...restLabelProps}>Тип</Label>
            <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
            </Select.Trigger>
            <Select.Popover className="h-[200px]">
                <ListBox>
                    {typesQuery.data && typesQuery.data.success && Object.entries(typesQuery.data.data).map(([typeInEnglish, typeInUkrainian]) =>
                        <ListBox.Item key={typeInEnglish} id={typeInEnglish} textValue={typeInEnglish}>
                            {typeInUkrainian}
                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                    )}
                </ListBox>
            </Select.Popover>
        </Select>
    )
}

export default FoodAndDrinkTypeSelection