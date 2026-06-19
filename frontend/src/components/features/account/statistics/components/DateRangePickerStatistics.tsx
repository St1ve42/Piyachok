'use client'
import {
  DateField,
  DateRangePicker,
  DateValue,
  Label,
  RangeCalendar,
  RangeValue
} from "@heroui/react";
import {useURL} from "@/src/hooks/shared/useURL";
import { getLocalTimeZone, today } from "@internationalized/date";

const DateRangePickerStatistics = () => {
    const {createQueryString, router, pathname} = useURL()
    const now = today(getLocalTimeZone());
    const handleDataRangePickerChange = (value: RangeValue<DateValue> | null) => {
        if(value){
            const {start, end} = value
            const startDate = start.toDate('+03').toLocaleDateString()
            const endDate = end.toDate('+03').toLocaleDateString()
            let queryString = createQueryString('start', startDate)
            queryString = createQueryString('end', endDate, "set", queryString)
            router.push(pathname + '?' + queryString)
        }
    }
  return <DateRangePicker className="w-80 self-end" endName="endDate" startName="startDate" onChange={handleDataRangePickerChange}>
      <Label>Період статистики</Label>
      <DateField.Group fullWidth>
          <DateField.Input slot="start">
              {(segment) => <DateField.Segment segment={segment} />}
          </DateField.Input>
          <DateRangePicker.RangeSeparator />
          <DateField.Input slot="end">
              {(segment) => <DateField.Segment segment={segment} />}
          </DateField.Input>
          <DateField.Suffix>
              <DateRangePicker.Trigger>
                  <DateRangePicker.TriggerIndicator />
              </DateRangePicker.Trigger>
          </DateField.Suffix>
      </DateField.Group>
      <DateRangePicker.Popover>
          <RangeCalendar aria-label="Період статистики" maxValue={now}>
              <RangeCalendar.Header>
                  <RangeCalendar.YearPickerTrigger>
                      <RangeCalendar.YearPickerTriggerHeading />
                      <RangeCalendar.YearPickerTriggerIndicator />
                  </RangeCalendar.YearPickerTrigger>
                  <RangeCalendar.NavButton slot="previous" />
                  <RangeCalendar.NavButton slot="next" />
              </RangeCalendar.Header>
              <RangeCalendar.Grid>
                  <RangeCalendar.GridHeader>
                      {(day) => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
                  </RangeCalendar.GridHeader>
                  <RangeCalendar.GridBody>
                      {(date) => <RangeCalendar.Cell date={date} />}
                  </RangeCalendar.GridBody>
              </RangeCalendar.Grid>
              <RangeCalendar.YearPickerGrid>
                  <RangeCalendar.YearPickerGridBody>
                      {({year}) => <RangeCalendar.YearPickerCell year={year} />}
                  </RangeCalendar.YearPickerGridBody>
              </RangeCalendar.YearPickerGrid>
          </RangeCalendar>
      </DateRangePicker.Popover>
  </DateRangePicker>;
};

export default DateRangePickerStatistics;
