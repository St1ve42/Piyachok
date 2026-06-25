'use client'
import DateRangePickerStatistics from "@/src/components/features/account/statistics/components/DateRangePickerStatistics";
import ChartStatistics from "@/src/components/features/account/statistics/components/ChartStatistics";
import {FC} from "react";
import {useFoodAndDrinkViewStatistics} from "@/src/hooks/tanstack-query/useFoodAndDrinkViewStatistics";

type PropsType = Record<'start' | 'end', string | undefined | null> & {id: string}

const Statistics: FC<PropsType> = ({start, end, id}) => {
    const {isLoading, data} = useFoodAndDrinkViewStatistics(id, {start, end})
    if(data && !data.success){
        return <div>{data.data.message}.</div>
    }
    return <section className="flex flex-col gap-3">
      <DateRangePickerStatistics/>
      {!isLoading ? (data && <ChartStatistics start={start} end={end} foodAndDrinkViews={data.data}/>) : <div>Завантаження...</div>}
    </section>;
};

export default Statistics;
