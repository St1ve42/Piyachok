import { TimeField } from "@heroui/react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

type PropsType<T extends FieldValues, K extends Path<T>> = {
    field?: ControllerRenderProps<T, K>
}

const MyTimeField = <T extends FieldValues,K extends Path<T>>({field}: PropsType<T,K>) => {
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