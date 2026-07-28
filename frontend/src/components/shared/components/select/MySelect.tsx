import { ListBox, Select } from "@heroui/react";
import {FC} from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type PropsType = {
    enumValues: Record<string, string>,
    field?: ControllerRenderProps<FieldValues, string>
}

const MySelect: FC<PropsType> = ({enumValues, field}) => {
    const handledField = field ?? {}
    const entries = Object.entries(enumValues)
    return (
        <Select {...handledField} defaultValue={entries[0][0]} className="flex flex-col gap-1" placeholder={'Не вказано'} arial-label={'Вибір'}>
            <Select.Trigger>
                <Select.Value/>
                <Select.Indicator/>
            </Select.Trigger>
            <Select.Popover>
                <ListBox>
                    {entries.map(([key, value]) =>
                        <ListBox.Item key={key} id={key} textValue={value}>
                            {value}
                        </ListBox.Item>
                    )}
                </ListBox>
            </Select.Popover>
        </Select>
    )
}

export default MySelect