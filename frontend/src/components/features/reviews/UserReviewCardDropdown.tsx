'use client'
import {Button, Dropdown} from "@heroui/react";
import {EllipsisVertical, House, TrashBin} from "@gravity-ui/icons";
import {FC, useState} from "react";
import {reviewService} from "@/src/services/review.service";
import Link from "next/link";
import {updateTagAction} from "@/src/actions/server.actions";
import {FoodAndDrinkStatusEnum} from "@/src/enums/food-and-drink/food-and-drink-status.enum";
import DeleteModalWindow from "@/src/components/shared/components/delete-modal-window/DeleteModalWindow";

type PropsType = {
    reviewId: string,
    foodAndDrinkId: string,
    status: FoodAndDrinkStatusEnum,
    text: string
}

const UserReviewCardDropdown: FC<PropsType> = ({reviewId, foodAndDrinkId, status, text}) => {
    const handleDelete = async () => {
        const response = await reviewService.delete(reviewId)
        if(response.success){
            await updateTagAction('my-reviews')
            await updateTagAction(`food-and-drink-reviews-${foodAndDrinkId}`)
            await updateTagAction(`all-reviews`)
        }
    }
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)
    return (
        <div>
            <Dropdown>
                <Button isIconOnly aria-label="Menu" variant="secondary">
                    <EllipsisVertical className="outline-none" />
                </Button>
                <Dropdown.Popover>
                    <Dropdown.Menu>
                        {status === FoodAndDrinkStatusEnum.ACTIVE && <Dropdown.Item>
                            <Link href={`/food-and-drink/${foodAndDrinkId}`} className="flex items-center gap-2">
                                <House/> Подивитись заклад
                            </Link>
                        </Dropdown.Item>}
                        <Dropdown.Item onClick={() => setIsOpenDeleteModal(true)} className="text-red-600"><TrashBin/> Видалити</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown>
            <DeleteModalWindow handleDelete={handleDelete} resourceDescription={`відгук "${text}"`} isButton={false} isOpen={isOpenDeleteModal} setIsOpen={setIsOpenDeleteModal}/>
        </div>
    )
}

export default UserReviewCardDropdown