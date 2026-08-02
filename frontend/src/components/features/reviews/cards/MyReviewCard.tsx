import {IReviewWithFoodAndDrink} from "@/src/interfaces/reviews/IReviewWithFoodAndDrink";
import {FC} from "react";
import {Card} from "@heroui/react";
import ReadOnlyStarRating from "@/src/components/shared/ui/ReadOnlyStarRating";
import UserReviewCardDropdown from "@/src/components/features/reviews/UserReviewCardDropdown";
import {FoodAndDrinkStatusEnum} from "@/src/enums/food-and-drink/food-and-drink-status.enum";

type PropsType = {
    review: IReviewWithFoodAndDrink
}

const MyReviewCard: FC<PropsType> = ({review}) => {
    const {foodAndDrink: {name, id: foodAndDrinkId, status}, createdAt, text, averageReceipt, rating, id} = review
    const localCreatedAt = new Date(createdAt).toLocaleDateString('uk-UA')
    return (
        <Card className="flex flex-col gap-1 shrink-0 w-full" style={{opacity: status === FoodAndDrinkStatusEnum.ACTIVE ? 1 : 0.6}}>
            <Card.Header>
                <div className="flex justify-between">
                    <p className="font-bold">{name} {status !== FoodAndDrinkStatusEnum.ACTIVE && '[Заклад неактивний]'}</p>
                    <UserReviewCardDropdown reviewId={id} foodAndDrinkId={foodAndDrinkId} status={status} text={text}/>
                </div>
                <p>{localCreatedAt}</p>
                <ReadOnlyStarRating initialValue={rating}/>
                <Card.Description>
                    {averageReceipt} грн
                </Card.Description>
            </Card.Header>
            <Card.Content className="text-sm w-full break-words">
                <p>{text}</p>
            </Card.Content>
        </Card>
    )
}

export default MyReviewCard
