'use client'
import DeleteModalWindow from "@/src/components/shared/components/delete-modal-window/DeleteModalWindow";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { Button, Dropdown, Label, toast} from "@heroui/react";
import { Pencil, TrashBin, EllipsisVertical } from "@gravity-ui/icons";
import {piyachokRepliesService} from "@/src/services/piyachok-replies.service";
import {updateTagAction} from "@/src/actions/server.actions";

type PropsType = {
    piyachokReplyId: string,
    piyachokId: string,
    setIsOpenInput: Dispatch<SetStateAction<boolean>>
}

const ManageDropdown: FC<PropsType> = ({piyachokReplyId, piyachokId, setIsOpenInput}) => {
    const [isOpen, setIsOpen] = useState(false)
    const handleDelete = async () => {
        const piyachokReplyDeleteResponse = await piyachokRepliesService.delete(piyachokReplyId)
        if(!piyachokReplyDeleteResponse.success){
            toast.danger(piyachokReplyDeleteResponse.data.message)
            return
        }
        setIsOpen(false)
        await updateTagAction(`piyachok-replies-${piyachokId}`)
    }
    return (
        <div>
            <Dropdown>
                <Button aria-label="Додатково" variant="secondary">
                    <EllipsisVertical/>
                </Button>
                <Dropdown.Popover>
                    <Dropdown.Menu>
                        <Dropdown.Item id="new-file" textValue="New file" onClick={() => setIsOpen(true)}>
                            <Label className="text-red-600 flex gap-2 items-center"><TrashBin/> Видалити</Label>
                        </Dropdown.Item>
                        <Dropdown.Item id="copy-link" textValue="Copy link" onClick={() => setIsOpenInput(true)}>
                            <Label className="flex gap-2 items-center"><Pencil/> Редагувати</Label>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown>
            <DeleteModalWindow handleDelete={handleDelete} resourceDescription={'Вашу відповідь'} isButton={false} isOpen={isOpen} setIsOpen={setIsOpen}/>
        </div>
    )
}

export default ManageDropdown