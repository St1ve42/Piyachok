'use client'
import {Button, Dropdown} from "@heroui/react";
import { EllipsisVertical, TrashBin, Eye } from "@gravity-ui/icons";
import {FC} from "react";
import {reviewService} from "@/src/services/review.service";
import {useRouter} from "next/navigation";
import Link from "next/link";

type PropsType = {
    reviewId: string,
    foodAndDrinkId: string,
    userId: string
}

const SuperadminReviewCardDropdown: FC<PropsType> = ({reviewId, foodAndDrinkId, userId}) => {
    const router = useRouter()
    const handleDelete = async () => {
        const response = await reviewService.delete(reviewId)
        if(response.success){
            router.refresh()
        }
    }
    return (
        <Dropdown>
            <Button isIconOnly aria-label="Menu" variant="secondary">
                <EllipsisVertical className="outline-none" />
            </Button>
            <Dropdown.Popover>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={handleDelete}><TrashBin/> Видалити</Dropdown.Item>
                    <Dropdown.Item>
                        <Link href={`/food-and-drink/${foodAndDrinkId}`} className="flex items-center gap-2">
                            <Eye/> Подивитись заклад
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link href={`/account/superadmin/users/${userId}`} className="flex items-center gap-2">
                            <Eye/> Подивитись користувача
                        </Link>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    )
}

export default SuperadminReviewCardDropdown