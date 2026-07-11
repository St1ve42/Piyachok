import {FC} from "react";
import {Card} from "@heroui/react";
import {ICommentWithFoodAndDrink} from "@/src/interfaces/comments/ICommentWithFoodAndDrink";
import CommentUserCardDropdown from "@/src/components/features/comments/CommentUserCardDropdown";

type PropsType = {
    comment: ICommentWithFoodAndDrink,
}

const CommentUserCard: FC<PropsType> = ({comment}) => {
    const {foodAndDrink: {name, id: foodAndDrinkId}, text, createdAt, id} = comment
    const localCreatedAt = new Date(createdAt).toLocaleDateString('uk-UA')
    return (
        <Card className="flex-row justify-between">
            <div>
                <Card.Title className="flex gap-2">
                    <span>{name}</span>
                    <span className="text-[#606060] text-[13px]">{localCreatedAt}</span>
                </Card.Title>
                <Card.Content>{text}</Card.Content>
            </div>
            <CommentUserCardDropdown commentId={id} foodAndDrinkId={foodAndDrinkId}/>
        </Card>
    )
}

export default CommentUserCard