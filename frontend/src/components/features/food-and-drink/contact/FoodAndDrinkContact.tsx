'use client'
import {
  Button,
  Form,
  Input,
  Label,
  Modal,
  TextArea,
  toast,
} from "@heroui/react";
import {Envelope} from "@gravity-ui/icons";
import {FC, useState} from "react";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {JoiOptions} from "@/src/constants/joi.options";
import {IContactFoodAndDrink} from "@/src/interfaces/food-and-drink/IContactFoodAndDrink";
import {foodAndDrinkService} from "@/src/services/food-and-drink.service";
import {contactFoodAndDrinkValidator} from "@/src/validators/food-and-drink/contactFoodAndDrinkValidator";
import {IUser} from "@/src/interfaces/users/IUser";

type PropsType = {
    foodAndDrinkId: string,
    user: IUser | null
}

const FoodAndDrinkContact: FC<PropsType> = ({foodAndDrinkId, user}) => {
    const {register, handleSubmit, formState: {errors, isValid}} = useForm<IContactFoodAndDrink>({mode: 'all', resolver: joiResolver(contactFoodAndDrinkValidator, JoiOptions)})
    const [messageLength, setMessageLength] = useState<number>(0)
    const handleContactFoodAndDrink = async (formData: IContactFoodAndDrink) => {
        console.log(formData)
        const response = await foodAndDrinkService.contact(formData, foodAndDrinkId)
        if(response.success){
            toast.success('Ви успішно надіслали повідомлення!', {
                timeout: 10 * 1000
            });
        }
    }
    return <Modal>
        <Button><Envelope/>Зв`язатись з закладом</Button>
        <Modal.Backdrop>
            <Modal.Container>
                <Modal.Dialog className="sm:max-w-[360px]">
                    <Modal.CloseTrigger />
                    <Modal.Header>
                        <Modal.Heading>Зв&#39;язатись із закладом</Modal.Heading>
                    </Modal.Header>
                    <Modal.Body className="p-1">
                        <Form onSubmit={handleSubmit(handleContactFoodAndDrink)} className="flex flex-col gap-2">
                            <Label>Email</Label>
                            <Input type={'email'} placeholder={'Введіть пошту...'} defaultValue={user?.email} {...register('email')}/>
                            {errors.email && <div className=" text-red-600 text-[9.5px] bottom-0 leading-none">{errors.email.message}</div>}
                            <Label>Тема повідомлення</Label>
                            <Input maxLength={100} type={'text'} placeholder={'Введіть тему повідомлення...'} {...register('subject')}/>
                            {errors.subject && <div className=" text-red-600 text-[9.5px] bottom-0 leading-none">{errors.subject.message}</div>}
                            <Label>Повідомлення</Label>
                            <TextArea maxLength={800} className="h-[20vh] w-full resize-none" placeholder={'Введіть повідомлення...'} {...register('message', {onChange: (e) => setMessageLength(e.target.value.length)})}/>
                            {errors.message && <div className=" text-red-600 text-[9.5px] bottom-0 leading-none">{errors.message.message}</div>}
                            <div className="text-[9.5px] text-right">{messageLength}/800</div>
                            <Button isDisabled={!isValid} type={'submit'} className="w-full mt-3" slot="close">
                                Надіслати
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal.Dialog>
            </Modal.Container>
        </Modal.Backdrop>
    </Modal>
}

export default FoodAndDrinkContact