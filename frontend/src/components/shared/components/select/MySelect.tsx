import { ListBox, Select } from "@heroui/react";
import { ControllerRenderProps, FieldValues, Path} from "react-hook-form";

type PropsType<T extends FieldValues, K extends Path<T>> = {
    enumValues: Record<string, string>,
    field?: ControllerRenderProps<T, K>
}

const MySelect = <T extends FieldValues,K extends Path<T>>({enumValues, field}: PropsType<T, K>) => {
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