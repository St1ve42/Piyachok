import {foodAndDrinkService} from "@/src/services/food-and-drink.service";
import {FC} from "react";
import {Label, Surface} from "@heroui/react";
import ReadOnlyStarRating from "@/src/components/shared/ui/ReadOnlyStarRating";
import BaseProgressBar from "@/src/components/shared/ui/ProgressBar";

type PropsType = {
    foodAndDrinkId: string;
    rating: number | null;
}

const RatingStatistics: FC<PropsType> = async ({foodAndDrinkId, rating}) => {
    const foodAndDrinkReviewStatisticsListData = await foodAndDrinkService.findReviewStatistics(foodAndDrinkId)
    if(!foodAndDrinkReviewStatisticsListData.success){
        return <div>Відсутній рейтинг</div>
    }
    const { total, data } = foodAndDrinkReviewStatisticsListData.data;
    return <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl px-6 py-2 border-1" variant="default">
        <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col text-sm">
                <h3 className="text-base font-semibold text-foreground">Рейтинг</h3>
                <p className="flex gap-2 items-center">
                    <span>{rating ?? 0}</span>
                    <ReadOnlyStarRating initialValue={rating ?? 0}/>
                </p>
                <p>Кількість оцінок: {total}</p>
            </div>
            <div className="flex flex-col">
                {data.map(({rating, count}) =>
                    <div key={rating} className="flex gap-2 items-center">
                        <Label className="flex items-center gap-1">{rating} <ReadOnlyStarRating initialValue={1} iconsCount={1}/> </Label>
                        <BaseProgressBar value={count*100/total} displayedValue={count}/>
                        <Label>{count}</Label>
                    </div>
                )
                }
            </div>
        </div>
    </Surface>
};

export default RatingStatistics;
