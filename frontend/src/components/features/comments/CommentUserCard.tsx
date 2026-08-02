import {FC} from "react";
import {Card} from "@heroui/react";
import {ICommentWithFoodAndDrink} from "@/src/interfaces/comments/ICommentWithFoodAndDrink";
import CommentUserCardDropdown from "@/src/components/features/comments/CommentUserCardDropdown";
import {FoodAndDrinkStatusEnum} from "@/src/enums/food-and-drink/food-and-drink-status.enum";

type PropsType = {
    comment: ICommentWithFoodAndDrink,
}

const CommentUserCard: FC<PropsType> = ({comment}) => {
    const {foodAndDrink: {name, id: foodAndDrinkId, status}, text, createdAt, id} = comment
    const localCreatedAt = new Date(createdAt).toLocaleDateString('uk-UA')
    return (
        <Card className="flex-row justify-between" style={{opacity: status === FoodAndDrinkStatusEnum.ACTIVE ? 1 : 0.6}}>
            <div>
                <Card.Title className="flex gap-2">
                    <span>{name} {status !== FoodAndDrinkStatusEnum.ACTIVE && '[Заклад неактивний]'}</span>
                    <span className="text-[#606060] text-[13px]">{localCreatedAt}</span>
                </Card.Title>
                <Card.Content>{text}</Card.Content>
            </div>
            <CommentUserCardDropdown commentId={id} foodAndDrinkId={foodAndDrinkId} status={status} text={text}/>
        </Card>
    )
}

export default CommentUserCard