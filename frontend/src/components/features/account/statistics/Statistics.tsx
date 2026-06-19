import DateRangePickerStatistics from "@/src/components/features/account/statistics/components/DateRangePickerStatistics";
import ChartStatistics from "@/src/components/features/account/statistics/components/ChartStatistics";
import {FC} from "react";
import {IFoodAndDrinkViewStatistics} from "@/src/interfaces/food-and-drink/IFoodAndDrinkViewStatistics";

type PropsType = Record<'start' | 'end', string | undefined> & {foodAndDrinkViews: IFoodAndDrinkViewStatistics}

const Statistics: FC<PropsType> = ({start, end, foodAndDrinkViews}) => {
  return <section className="flex flex-col gap-3">
      <DateRangePickerStatistics/>
      <ChartStatistics start={start} end={end} foodAndDrinkViews={foodAndDrinkViews}/>
  </section>;
};

export default Statistics;
