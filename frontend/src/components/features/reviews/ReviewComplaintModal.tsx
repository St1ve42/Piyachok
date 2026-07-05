'use client'
import {Modal, Button, Form, TextArea, toast} from "@heroui/react";
import { FC, useState } from "react";
import {reviewService} from "@/src/services/review.service";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {JoiOptions} from "@/src/constants/joi.options";
import {IReviewComplaint} from "@/src/interfaces/reviews/IReviewComplaint";
import {ReviewComplaintValidator} from "@/src/validators/review/review-complaint.validator";

type PropsType = {
    id: string,
    isOpen: boolean,
    onOpenChange: () => void
}

const ReviewComplaintModal: FC<PropsType> = ({id, isOpen, onOpenChange}) => {
    const {register, handleSubmit, formState: {errors, isValid}} = useForm<IReviewComplaint>({mode: 'all', resolver: joiResolver(ReviewComplaintValidator, JoiOptions)})
    const [reviewTextLength, setReviewTextLength] = useState<number>(0)
    const handleSendComplaintSubmit = async (formData: IReviewComplaint) => {
        const response = await reviewService.sendComplaint(id, formData)
        console.log(response)
        if(response.success){
            toast('Ви успішно надіслали скаргу! Дякую, що дбаєте за порядком в системі', {
                timeout: 10 * 1000,
            });
        }
    }
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog className="sm:max-w-[360px]">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading>Причина</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="p-1">
                            <Form onSubmit={handleSubmit(handleSendComplaintSubmit)}>
                                <TextArea maxLength={200} className="h-[20vh] w-full resize-none" placeholder={'Введіть причину скарги...'} {...register('reason', {onChange: (e) => setReviewTextLength(e.target.value.length)})}/>
                                {errors.reason && <div className=" text-red-600 text-[9.5px] bottom-0 leading-none">{errors.reason.message}</div>}
                                <div className="text-[9.5px] text-right">{reviewTextLength}/200</div>
                                <Button isDisabled={!isValid} type={'submit'} className="w-full mt-3" slot="close">
                                    Поскаржитись
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
}

export default ReviewComplaintModal