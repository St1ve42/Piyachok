'use client'
import {Form, Heading, TextArea, Label, Input, Button, toast} from "@heroui/react";
import InteractiveStartRating from "@/src/components/shared/ui/InteractiveStartRating";
import { useForm } from "react-hook-form";
import { FC, useState } from "react";
import {ICreateUserInputReview} from "@/src/interfaces/reviews/ICreateUserInputReview";
import {joiResolver} from "@hookform/resolvers/joi";
import {createReviewValidator} from "@/src/validators/review/create-review.validator";
import {JoiOptions} from "@/src/constants/joi.options";
import ReadOnlyStarRating from "@/src/components/shared/ui/ReadOnlyStarRating";
import {reviewService} from "@/src/services/review.service";
import {redirect} from "next/navigation";
import {Xmark} from "@gravity-ui/icons"
import {updateTagAction} from "@/src/actions/server.actions";

type PropsType = {
    isLogged: boolean
    foodAndDrinkId: string
    isOwner: boolean | null
}

const ReviewForm: FC<PropsType> = ({isLogged, foodAndDrinkId, isOwner}) => {
    const [reviewTextLength, setReviewTextLength] = useState<number>(0)
    const [rating, setRating] = useState<number>(0)
    const {register, handleSubmit, reset, formState: {errors, isValid}} = useForm<ICreateUserInputReview>({mode: 'all', resolver: joiResolver(createReviewValidator, JoiOptions)})
    const handleReviewSubmit = async (formData: ICreateUserInputReview) => {
        const {success, data} = await reviewService.create({...formData, rating, foodAndDrinkId})
        if(!success){
            toast.danger(`${data.message}`, {
                indicator: <Xmark/>
            })
        }
        else{
            reset()
            setRating(0)
            await updateTagAction(`food-and-drink-reviews-${foodAndDrinkId}`)
            await updateTagAction('my-reviews')
            await updateTagAction('all-reviews')
            toast.success('Ваш відгук успішно надіслано!')
        }
    }
    const handleStarClick = (value: number) => {
        setRating(value)
    }
    const onFocusInput = () => {
        if(!isLogged){
            redirect('/auth/sign-in')
        }
    }
    return (
        <Form onSubmit={handleSubmit(handleReviewSubmit)} className="flex h-full flex-col rounded-3xl px-6 py-2 border-1">
            <div className="flex justify-between">
                <Heading level={6}>Залишити відгук</Heading>
                {(isLogged && !isOwner) ? <InteractiveStartRating handleStarClick={handleStarClick} value={rating}/> : <ReadOnlyStarRating initialValue={0}/>}
            </div>
            <div className="flex flex-col gap-3">
                <div className="w-full">
                    <Label>Сума чеку (грн)</Label>
                    <div className="relative">
                        <Input onFocus={onFocusInput} disabled={!!isOwner} type="number" className="w-full" placeholder={'Введіть суму чеку...'} {...register('averageReceipt')}/>
                        {errors.averageReceipt && <div className="absolute text-red-600 text-[9.5px] bottom-[-15px] leading-none">{errors.averageReceipt.message}</div>}
                    </div>
                </div>
                <div className="w-full">
                    <Label>Текст відгуку</Label>
                    <div className="relative">
                        <TextArea onFocus={onFocusInput} maxLength={500} disabled={!!isOwner} className="w-full h-[14vh] resize-none" placeholder={'Введіть текст відгуку...'} {...register('text', {onChange: (e) => setReviewTextLength(e.target.value.length)
                        })}/>
                        {errors.text && <div className=" text-red-600 text-[9.5px] bottom-0 leading-none">{errors.text.message}</div>}
                        <div className="text-[9.5px] text-right">{reviewTextLength}/500</div>
                    </div>
                </div>
            </div>
            {isOwner && <div className="text-sm">Ви не можете надсилати відгук, оскільки Ви є власником цього закладу.</div>}
            {!isOwner && <div className="flex justify-between items-start gap-2">
                <Button type={'submit'} isDisabled={!rating || !isValid}>Надіслати</Button>
            </div>}
        </Form>
    )
}

export default ReviewForm