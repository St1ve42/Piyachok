'use client'
import DateRangePickerStatistics from "@/src/components/features/statistics/DateRangePickerStatistics";
import ChartStatistics from "@/src/components/features/statistics/ChartStatistics";
import {FC} from "react";
import {useFoodAndDrinkViewStatistics} from "@/src/hooks/tanstack-query/useFoodAndDrinkViewStatistics";
import {useSearchParams} from "next/navigation";

type PropsType = {id: string}

const StatisticsView: FC<PropsType> = ({id}) => {
    const searchParams = useSearchParams()
    const start = searchParams.get('start') ?? undefined
    const end = searchParams.get('end') ?? undefined
    const {isLoading, data} = useFoodAndDrinkViewStatistics(id, {start, end})
    if(data && !data.success){
        return <div>{data.data.message}.</div>
    }
    return <section className="flex flex-col gap-3 max-sm:gap-2">
      <DateRangePickerStatistics start={start} end={end}/>
      {!isLoading ? (data && <ChartStatistics start={start} end={end} foodAndDrinkViews={data.data}/>) : <div className="max-sm:text-sm">Завантаження...</div>}
    </section>;
};

export default StatisticsView;
