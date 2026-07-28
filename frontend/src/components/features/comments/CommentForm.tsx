'use client'
import { Button, Form, TextArea } from "@heroui/react";
import {useForm} from "react-hook-form";
import {FC, useState} from "react";
import {redirect} from "next/navigation";
import {joiResolver} from "@hookform/resolvers/joi";
import {CommentsValidator} from "@/src/validators/comments/comments.validator";
import {IUserCommentInput} from "@/src/interfaces/comments/IUserCommentInput";
import {commentsService} from "@/src/services/comments.service";
import {useQueryClient} from "@tanstack/react-query";
import {updateTagAction} from "@/src/actions/server.actions";

type PropsType = {
    isLogged: boolean,
    foodAndDrinkId: string
}

const CommentForm: FC<PropsType> = ({isLogged, foodAndDrinkId}) => {
    const {register, reset, handleSubmit, formState: {isValid}} = useForm<IUserCommentInput>({mode: 'all', resolver: joiResolver(CommentsValidator)})
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false)
    const handleCommentSend = async (data: IUserCommentInput) => {
        setIsLoading(true)
        const {success} = await commentsService.create({ ...data, foodAndDrinkId });
        if(success){
            reset()
            await queryClient.invalidateQueries({queryKey: ['food-and-drink-comments', foodAndDrinkId]})
            await updateTagAction('my-comments')
            await updateTagAction('all-comments')
        }
        setIsLoading(false)
    }
    return (
        <Form onSubmit={handleSubmit(handleCommentSend)} className="flex gap-3 items-center w-full">
            <TextArea onFocus={() => {
                if(!isLogged){
                    redirect('/auth/sign-in')
                }
            }} className="resize-none w-full max-h-[5vh]" maxLength={250} placeholder={'Додайте коментар...'} {...register('text')}/>
            <Button type={'submit'} isDisabled={!isValid || isLoading}>Коментувати</Button>
        </Form>
    )
}

export default CommentForm