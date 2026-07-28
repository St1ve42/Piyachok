'use client'
import {IPiyachokReplyList} from "@/src/interfaces/piyachok-reply/IPiyachokReplyList";
import { FC, useState } from "react";
import { Button, Card, Form, Input, toast } from "@heroui/react";
import AvatarCustom from "@/src/components/shared/ui/AvatarCustom";
import UserAvatar from "@/src/public/default_user_avatar.png";
import {utilsService} from "@/src/services/utils.service";
import {IUser} from "@/src/interfaces/users/IUser";
import ManageDropdown from "@/src/components/shared/components/dropdown/ManageDropdown";
import {GlobalUserRoleEnum} from "@/src/enums/user/global.user.role.enum";
import {useForm} from "react-hook-form";
import {IPiyachokReplyUserInput} from "@/src/interfaces/piyachok-reply/IPiyachokReplyCreate";
import {piyachokRepliesService} from "@/src/services/piyachok-replies.service";
import {updateTagAction} from "@/src/actions/server.actions";

type PropsType = {
    piyachokReply: IPiyachokReplyList,
    piyachokId: string,
    loggedUser: IUser | null
}

const PiyachokReplyCard: FC<PropsType> = ({piyachokReply, loggedUser, piyachokId}) => {
    const {id, text, responder: {id: responserId, name, surname, photo}, createdAt} = piyachokReply
    const createdAtLocalDateString = utilsService.getLocalDate(createdAt)
    const createdAtLocalTimeString = utilsService.getLocalTime(createdAt)
    const [isOpenInput, setIsOpenInput] = useState(false)
    const {register, handleSubmit} = useForm<IPiyachokReplyUserInput>({mode: 'all'})
    const hasPermission: boolean = loggedUser?.id === responserId || loggedUser?.role === GlobalUserRoleEnum.SUPERADMIN
    const handleEdit = async (formData: IPiyachokReplyUserInput) => {
        const piyachokReplyResponse = await piyachokRepliesService.update(id, formData)
        if(!piyachokReplyResponse.success){
            toast.danger(piyachokReplyResponse.data.message)
            return
        }
        await updateTagAction(`piyachok-replies-${piyachokId}`)
        setIsOpenInput(false)
    }
    return (
        <Card className="shrink-0">
            <div className="flex justify-between">
                <div className="flex items-center gap-2">
                    <AvatarCustom
                        photo={photo}
                        defaultPhoto={UserAvatar?.src}
                        width={40}
                        height={40}
                    />
                    <div className="text-xs">
                        <p className="font-medium text-neutral-900">
                            {name} {surname}
                        </p>
                        <p>{createdAtLocalDateString}, {createdAtLocalTimeString}</p>
                    </div>
                </div>
                {hasPermission && <ManageDropdown piyachokReplyId={id} piyachokId={piyachokId} setIsOpenInput={setIsOpenInput}/>}
            </div>
            {isOpenInput ? <div>
                <Form onSubmit={handleSubmit(handleEdit)} className="flex flex-col gap-2">
                    <Input type='text' defaultValue={text} {...register('text')} className="w-full"/>
                    <div className="flex gap-2">
                        <Button onClick={() => setIsOpenInput(false)}>Скасувати</Button>
                        <Button type={'submit'}>Зберегти</Button>
                    </div>
                </Form>
            </div>: <p className="text-sm">{text}</p>}
        </Card>
    )
}

export default PiyachokReplyCard