'use client'

import { Heading, Form, Button, toast, Input } from "@heroui/react";
import {PaperPlane} from "@gravity-ui/icons";
import {useForm} from "react-hook-form";
import {IPiyachokReplyUserInput} from "@/src/interfaces/piyachok-reply/IPiyachokReplyCreate";
import { FC, useRef, useState } from "react";
import {piyachokRepliesService} from "@/src/services/piyachok-replies.service";
import {updateTagAction} from "@/src/actions/server.actions";

type PropsType = {
    piyachokId: string
}

const PiyachokReplyForm: FC<PropsType> = ({piyachokId}) => {
    const {register, handleSubmit, reset} = useForm<IPiyachokReplyUserInput>({mode: 'all'})
    const [isLoading, setIsLoading] = useState(false)
    const sendReplyButtonRef = useRef<HTMLButtonElement | null>(null)
    const handleWriteMe = async (formData: IPiyachokReplyUserInput) => {
        setIsLoading(true)
        const piyachokReplyCreateResponse = await piyachokRepliesService.create({...formData, piyachokId})
        if(!piyachokReplyCreateResponse.success){
            toast.danger(piyachokReplyCreateResponse.data.message)
            return
        }
        await updateTagAction(`piyachok-replies-${piyachokId}`)
        reset()
        setIsLoading(false)
    }
    return (
        <section className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
            </div>
            <Form className="flex flex-col gap-3 relative" onSubmit={handleSubmit(handleWriteMe)}>
                <div className="flex justify-between items-center">
                    <Heading level={5}>Написати мені</Heading>
                </div>
                <div className="flex justify-between">
                    <Input disabled={isLoading} placeholder='Введіть повідомлення...' className="resize-none w-[230px]" maxLength={255} {...register('text')}/>
                    <Button type='submit' ref={sendReplyButtonRef} isDisabled={isLoading}><PaperPlane/></Button>
                </div>
            </Form>
        </section>
    )
}

export default PiyachokReplyForm