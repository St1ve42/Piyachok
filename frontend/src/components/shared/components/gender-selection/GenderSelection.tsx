import { ListBox, Select } from "@heroui/react";
import {
  Control,
  Controller,
  FieldValues,
} from "react-hook-form";
import {FC} from "react";

type PropsType = {
    name: string,
    isOpenEdit: boolean,
    control: Control<FieldValues, any, FieldValues> | undefined
}

const GenderSelection: FC<PropsType> = ({name, control}) => {
    return (
        <Controller render={({field}) => (
            <Select {...field} className="flex flex-col gap-1" placeholder={'Не вказано'} aria-label='Вибір гендеру'>
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