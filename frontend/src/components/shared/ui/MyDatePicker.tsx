import {
  Calendar,
  DateField,
  DatePickerPopover,
  DatePickerTrigger,
  DatePickerTriggerIndicator,
  DatePicker, I18nProvider
} from "@heroui/react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { getLocalTimeZone, today } from "@internationalized/date";

type PropsType<T extends FieldValues, K extends Path<T>> = {
    field?: ControllerRenderProps<T, K>,
    handleFocusInput?: () => void
}

const MyDatePicker = <T extends FieldValues, K extends Path<T>>({field, handleFocusInput}: PropsType<T, K>) => {
    const handledField = field ?? {}
    const now = today(getLocalTimeZone());
    return (
        <I18nProvider locale="uk-UA">
            <DatePicker {...handledField} onFocus={handleFocusInput} className="w-full" name="date" aria-label='Вибір дати'>
                <DateField.Group fullWidth>
                    <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
                    <DateField.Suffix>
                        <DatePickerTrigger>
                            <DatePickerTriggerIndicator />
                        </DatePickerTrigger>
                    </DateField.Suffix>
                </DateField.Group>
                <DatePickerPopover>
                    <Calendar aria-label="Event date" minValue={now}>
                        <Calendar.Header>
                            <Calendar.YearPickerTrigger>
                                <Calendar.YearPickerTriggerHeading />
                                <Calendar.YearPickerTriggerIndicator />
                            </Calendar.YearPickerTrigger>
                            <Calendar.NavButton slot="previous" />
                            <Calendar.NavButton slot="next" />
                        </Calendar.Header>
                        <Calendar.Grid>
                            <Calendar.GridHeader>
                                {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                            </Calendar.GridHeader>
                            <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
                        </Calendar.Grid>
                        <Calendar.YearPickerGrid>
                            <Calendar.YearPickerGridBody>
                                {({year}) => <Calendar.YearPickerCell year={year} />}
                            </Calendar.YearPickerGridBody>
                        </Calendar.YearPickerGrid>
                    </Calendar>
                </DatePickerPopover>
            </DatePicker>
        </I18nProvider>
    )
}

export default MyDatePicker