'use client'
import { EllipsisVertical, Pencil, TrashBin } from "@gravity-ui/icons";
import {Button, Dropdown} from "@heroui/react";
import {topCategoryService} from "@/src/services/top-category.service";
import { FC, useState } from "react";
import CreateOrUpdateTopCategory from "@/src/components/features/top-category/CreateOrUpdateTopCategory";
import {ITopCategory} from "@/src/interfaces/top-category/ITopCategory";
import {updateTagAction} from "@/src/actions/server.actions";
import DeleteModalWindow from "@/src/components/shared/components/delete-modal-window/DeleteModalWindow";

type PropsType = {
    topCategory: ITopCategory
}

const TopCategoryDropdown: FC<PropsType> = ({topCategory}) => {
    const {id, name} = topCategory
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenDelete, setIsOpenDelete] = useState(false)
    const handleDelete = async () => {
        await topCategoryService.delete(id)
        await updateTagAction('all-top-categories')
        await updateTagAction(`food-and-drink-list`)
    }
    const handleOnClickUpdate = async () => {
        setIsOpen(true)
    }
    return (
        <div>
            <Dropdown>
                <Button isIconOnly aria-label="Menu" variant="secondary">
                    <EllipsisVertical className="outline-none" />
                </Button>
                <Dropdown.Popover>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleOnClickUpdate} className="text-blue-600"><Pencil/> Редагування</Dropdown.Item>
                        <Dropdown.Item onClick={() => setIsOpenDelete(true)} className="text-red-600"><TrashBin/> Видалити</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown>
            <DeleteModalWindow handleDelete={handleDelete} resourceDescription={`топ категорії "${name}"`} isButton={false} isOpen={isOpenDelete} setIsOpen={setIsOpenDelete}/>
            <CreateOrUpdateTopCategory mode={'update'} topCategory={topCategory} isOpen={isOpen} setIsOpen={setIsOpen}/>
        </div>
    )
}

export default TopCategoryDropdown