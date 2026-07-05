import {FC} from "react";
import {Card } from "@heroui/react";
import ReadOnlyStarRating from "@/src/components/shared/ui/ReadOnlyStarRating";
import {IReviewWithCreatorAndFoodAndDrink} from "@/src/interfaces/reviews/IReviewWithCreatorAndFoodAndDrink";
import AvatarCustom from "@/src/components/shared/ui/AvatarCustom";
import UserAvatar from "@/src/public/default_user_avatar.png";
import SuperadminReviewCardDropdown from "@/src/components/features/reviews/SuperadminReviewCardDropdown";

type PropsType = {
    review: IReviewWithCreatorAndFoodAndDrink
}

const SuperadminReviewCard: FC<PropsType> = ({review}) => {
    const {foodAndDrink: {name: foodAndDrinkName, id: foodAndDrinkId}, createdAt, text, averageReceipt, rating, id, creator: {photo, name: userName, surname, id: userId}} = review
    const localCreatedAt = new Date(createdAt).toLocaleDateString('uk-UA')
    return (
        <Card className="flex flex-col gap-1 shrink-0 w-full">
            <Card.Header>
                <div className="flex justify-between">
                    <p className="font-bold">{foodAndDrinkName}</p>
                    <SuperadminReviewCardDropdown reviewId={id} foodAndDrinkId={foodAndDrinkId} userId={userId}/>
                </div>
                <div className="flex gap-3 items-center">
                    <AvatarCustom photo={photo} defaultPhoto={UserAvatar.src} sizeMultiplier={10}/>
                    <p>{userName} {surname}</p>
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

export default SuperadminReviewCard
