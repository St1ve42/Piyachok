'use client'
import {Avatar, Button, Card, Dropdown, Label} from "@heroui/react";
import {useDisclosure} from "@heroui/use-disclosure"
import { IReviewWithCreator } from "@/src/interfaces/reviews/IReviewWithCreator";
import { FC, useState } from "react";
import {utilsService} from "@/src/services/utils.service";
import UserAvatar from "@/src/public/default_user_avatar.png";
import ReadOnlyStarRating from "@/src/components/shared/ui/ReadOnlyStarRating";
import {IUser} from "@/src/interfaces/users/IUser";
import {GlobalUserRoleEnum} from "@/src/enums/user/global.user.role.enum";
import {EllipsisVertical, TrashBin, Flag} from "@gravity-ui/icons";
import {reviewService} from "@/src/services/review.service";
import {redirect} from "next/navigation";
import ReviewComplaintModal from "@/src/components/features/reviews/ReviewComplaintModal";
import {updateTagAction} from "@/src/actions/server.actions";
import DeleteModalWindow from "@/src/components/shared/components/delete-modal-window/DeleteModalWindow";

type PropsType = {
    review: IReviewWithCreator
    user: IUser | null,
    isOwner: boolean | null,
    foodAndDrinkId: string
}

const ReviewCard: FC<PropsType> = ({review, user, isOwner, foodAndDrinkId}) => {
    const {rating, id, averageReceipt, text, createdAt, creator: {name, surname, id: creatorId, photo}} = review
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)
    const localCreatedAt = new Date(createdAt).toLocaleDateString('uk-UA')
    const handleDeleteReview = async () => {
        const response = await reviewService.delete(id)
        if(response.success){
            await updateTagAction(`food-and-drink-reviews-${foodAndDrinkId}`)
            await updateTagAction('my-reviews')
            await updateTagAction('all-reviews')
        }
    }
    const deleteMessage = (user?.role === GlobalUserRoleEnum.SUPERADMIN || isOwner) ? `відгук користувача ${name} ${surname}` : `свій відгук`
    return <Card className="flex flex-col gap-2 mb-1 shrink-0">
        <Card.Header>
            <Card.Title className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <Avatar>
                        <Avatar.Image src={photo ? utilsService.buildStorageURL(photo) : UserAvatar.src} alt={'Фотографія користувача'}/>
                    </Avatar>
                    <div>
                        <p>{name} {surname}</p>
                        <p>{localCreatedAt}</p>
                    </div>
                </div>
                <Dropdown>
                    <Button isIconOnly aria-label="Menu" variant="secondary">
                        <EllipsisVertical className="outline-none" />
                    </Button>
                    <Dropdown.Popover>
                        <Dropdown.Menu>
                            {(!user || (user && user.id !== creatorId && user.role !== GlobalUserRoleEnum.SUPERADMIN && !isOwner)) && <Dropdown.Item onClick={() => {
                                if(!user){
                                    redirect('/auth/sign-in')
                                }
                                onOpen()
                            }}>
                                <Label className="flex gap-2 items-center"><Flag/> Поскаржитись</Label>
                            </Dropdown.Item>}
                            {user && (user.id === creatorId || user.role === GlobalUserRoleEnum.SUPERADMIN || isOwner) && <Dropdown.Item onClick={() => setIsOpenDeleteModal(true)}>
                                <Label className="flex gap-2 items-center text-red-600"><TrashBin/> Видалити</Label>
                            </Dropdown.Item>}
                        </Dropdown.Menu>
                    </Dropdown.Popover>
                </Dropdown>
                <DeleteModalWindow handleDelete={handleDeleteReview} isButton={false} isOpen={isOpenDeleteModal} setIsOpen={setIsOpenDeleteModal} resourceDescription={deleteMessage}/>
            </Card.Title>
            <ReviewComplaintModal isOpen={isOpen} onOpenChange={onOpenChange} id={id}/>
            <ReadOnlyStarRating initialValue={rating}/>
            <Card.Description>
                {averageReceipt} грн
            </Card.Description>
        </Card.Header>
        <Card.Content className="text-sm break-words">
            {text}
        </Card.Content>
    </Card>;
};

export default ReviewCard;
