import { TimeField } from "@heroui/react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import {FC} from "react";

type PropsType = {
    field?: ControllerRenderProps<FieldValues, string>
}

const MyTimeField: FC<PropsType> = ({field}) => {
    const handledField = field ?? {}
    return (
        <TimeField {...handledField} name="time" hourCycle={24} aria-label='Поле для введеня часу'>
            <TimeField.Group>
                <TimeField.Input>{(segment) => <TimeField.Segment segment={segment} />}</TimeField.Input>
            </TimeField.Group>
        </TimeField>
    )
}

export default MyTimeField