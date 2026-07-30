import NewsDetailsView from "@/src/components/views/NewsDetailsView";
import {FC} from "react";
import NewsOwnerManageButtons from "@/src/components/features/news/NewsOwnerManageButtons";
import {IGeneralNewsById} from "@/src/interfaces/news/IGeneralNewsById";

type PropsType = {
    news: IGeneralNewsById,
}

const FoodAndDrinkNewsDetailsView: FC<PropsType> = ({news}) => {
    const {id, foodAndDrink: {id: foodAndDrinkId}} = news
    return (
        <section className="w-full flex flex-col gap-3">
            <div className="self-end">
                <NewsOwnerManageButtons newsId={id} foodAndDrinkId={foodAndDrinkId}/>
            </div>
            <NewsDetailsView news={news}/>
        </section>
    )
}

export default FoodAndDrinkNewsDetailsView