'use client'
import {Button, Dropdown} from "@heroui/react";
import { EllipsisVertical, TrashBin, House, Person} from "@gravity-ui/icons";
import {FC} from "react";
import {reviewService} from "@/src/services/review.service";
import Link from "next/link";
import {updateTagAction} from "@/src/actions/server.actions";

type PropsType = {
    reviewId: string,
    foodAndDrinkId: string,
    userId: string
}

const SuperadminReviewCardDropdown: FC<PropsType> = ({reviewId, foodAndDrinkId, userId}) => {
    const handleDelete = async () => {
        const response = await reviewService.delete(reviewId)
        if(response.success){
            await updateTagAction('my-reviews')
            await updateTagAction(`food-and-drink-reviews-${foodAndDrinkId}`)
            await updateTagAction(`all-reviews`)
        }
    }
    return (
        <Dropdown>
            <Button isIconOnly aria-label="Menu" variant="secondary">
                <EllipsisVertical className="outline-none" />
            </Button>
            <Dropdown.Popover>
                <Dropdown.Menu>
                    <Dropdown.Item>
                        <Link href={`/account/superadmin/food-and-drinks/${foodAndDrinkId}`} className="flex items-center gap-2">
                            <House/> Подивитись заклад
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link href={`/account/superadmin/users/${userId}`} className="flex items-center gap-2">
                            <Person/> Подивитись користувача
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleDelete} className="text-red-600"><TrashBin/> Видалити</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    )
}

export default SuperadminReviewCardDropdown