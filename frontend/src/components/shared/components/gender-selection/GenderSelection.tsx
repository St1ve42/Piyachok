import { ListBox, Select } from "@heroui/react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type PropsType<T extends FieldValues> = {
    name: Path<T>,
    control: Control<T, any, T> | undefined,
    handleFocusInput: () => void
}

const GenderSelection = <T extends FieldValues>({name, control, handleFocusInput}: PropsType<T>) => {
    return (
        <Controller render={({field}) => (
            <Select onFocus={handleFocusInput} {...field} className="flex flex-col gap-1" placeholder={'Не вказано'} aria-label='Вибір гендеру'>
                <Select.Trigger>
                    <Select.Value/>
                    <Select.Indicator/>
                </Select.Trigger>
                <Select.Popover>
                    <ListBox>
                        <ListBox.Item id={'male'} textValue={'Чоловіча'}>
                            Чоловіча
                        </ListBox.Item>
                        <ListBox.Item id={'female'} textValue={'Жіноча'}>
                            Жіноча
                        </ListBox.Item>
                    </ListBox>
                </Select.Popover>
            </Select>
        )} name={name} control={control}/>
    )
}

export default GenderSelection