'use client'
import { FC } from "react";
import { Chart, Title, XAxis, YAxis} from "@highcharts/react";
import {AreaSeries} from "@highcharts/react/series/Area";
import {IFoodAndDrinkViewStatistics} from "@/src/interfaces/food-and-drink/IFoodAndDrinkViewStatistics";

type PropsType = {
    foodAndDrinkViews: IFoodAndDrinkViewStatistics
} & Record<'start' | 'end', string | undefined>

const ChartStatistics: FC<PropsType> = ({start, end, foodAndDrinkViews: {views, dates}}) => {
    const defaultEndDate = new Date()
    const defaultStartDate = structuredClone(defaultEndDate)
    defaultStartDate.setDate(defaultEndDate.getDate() - 7)
    return <Chart options={{ chart: { type: "line" }}}>
        <Title>Статистика переглядів за проміжок {start ?? defaultStartDate.toLocaleDateString()}-{end ?? defaultEndDate.toLocaleDateString()}</Title>
        <XAxis categories={dates}>Дата перегляду</XAxis>
        <YAxis>Перегляди</YAxis>
        <AreaSeries
            name={'Графік перегляду'}
            data={views}
            color="#007bff"
            options={{fillColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                [0, '#2b908f'],
                [1, 'rgba(43, 144, 143, 0)']
                ]
            }}}
        />
    </Chart>
};

export default ChartStatistics;
