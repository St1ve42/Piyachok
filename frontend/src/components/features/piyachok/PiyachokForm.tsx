'use client'
import {
  Button,
  Form,
  Input,
  Label,
  Modal,
  TextArea, toast,
} from "@heroui/react";
import {
  Controller,
  useForm,
} from "react-hook-form";
import {
  IPiyachokCreate,
  IPiyachokUserInput,
} from "@/src/interfaces/piyachok/IPiyachokCreate";
import MyDatePicker from "@/src/components/shared/ui/MyDatePicker";
import MyTimeField from "@/src/components/shared/ui/MyTimeField";
import GenderSelection from "@/src/components/shared/components/gender-selection/GenderSelection";
import MySelect from "@/src/components/shared/components/select/MySelect";
import {PiyachokPaymentTypeTranslation} from "@/src/constants/piyachok-payment-type.translation";
import {joiResolver} from "@hookform/resolvers/joi";
import {piyachokCreateValidator} from "@/src/validators/piyachok/piyachokCreateValidator";
import {JoiOptions} from "@/src/constants/joi.options";
import { FC, useRef } from "react";
import {piyachokService} from "@/src/services/piyachok.service";
import {IPiyachokDetail} from "@/src/interfaces/piyachok/IPiyachokDetail";
import {parseDate, parseTime} from "@internationalized/date";
import {Pencil} from "@gravity-ui/icons";
import {updateTagAction} from "@/src/actions/server.actions";

type PropsType = {
    foodAndDrinkId?: string,
    mode?: 'create' | 'update',
    piyachok?: IPiyachokDetail
}

const PiyachokForm: FC<PropsType> = ({foodAndDrinkId, mode = 'create', piyachok}) => {
    let defaultValues: IPiyachokUserInput | undefined = undefined
    if(piyachok){
        const {creator, updatedAt, createdAt, id, status, foodAndDrink, meetDate, meetTime, ...restPiyachok} = piyachok
        defaultValues = {...restPiyachok, meetDate: parseDate(meetDate), meetTime: parseTime(meetTime)}
    }
    const {register, handleSubmit, control, reset, formState: {errors, isValid, isDirty}} = useForm<IPiyachokUserInput>({
        mode: 'all',
        resolver: joiResolver(piyachokCreateValidator, JoiOptions),
        defaultValues
    })
    const closeButtonRef = useRef<HTMLButtonElement | null>(null)
    const handlePiyachokCreate = async (formData: IPiyachokUserInput) => {
        if(!foodAndDrinkId){
            return
        }
        const {meetTime, meetDate, ...restFormData} = formData
        const body: IPiyachokCreate = {...restFormData, meetDate: '', meetTime: '', foodAndDrinkId}
        body.meetDate = meetDate.toString()
        body.meetTime = meetTime.toString()
        const piyachokCreateResponse = await piyachokService.create(body)
        if(!piyachokCreateResponse.success){
            toast.danger(piyachokCreateResponse.data.message)
            return
        }
        await updateTagAction('piyachoks')
        toast.success('Успішно створено пиячок!')
        reset()
        if(closeButtonRef.current){
            closeButtonRef.current.click()
        }
    }
    const handlePiyachokUpdate = async (formData: IPiyachokUserInput) => {
        if(!piyachok){
            return
        }
        const {meetTime, meetDate, ...restFormData} = formData
        const body: Partial<IPiyachokCreate> = {...restFormData, meetDate: '', meetTime: ''}
        body.meetDate = meetDate.toString()
        body.meetTime = meetTime.toString()
        const piyachokUpdateResponse = await piyachokService.update(piyachok.id, body)

        if(!piyachokUpdateResponse.success){
            toast.danger(piyachokUpdateResponse.data.message)
            return
        }
        await updateTagAction('piyachoks')
        toast.success('Успішно оновлено пиячок!')
        reset()
        if(closeButtonRef.current){
            closeButtonRef.current.click()
        }
    }
    const mainButtonText = mode === 'create' ? <div>Створити пиячок</div> : <div className="flex gap-2 items-center"><Pencil/> Оновити</div>
    const submitButtonText = mode === 'create' ? 'Створити' : 'Оновити'
    const headingText = mode === 'create' ? 'Створити пиячок' : 'Оновити пиячок'
    return (
        <Modal>
            <Button>{mainButtonText}</Button>
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog className="sm:max-w-[500px]">
                        <Modal.CloseTrigger ref={closeButtonRef}/>
                        <Modal.Header>
                            <Modal.Heading>{headingText}</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body>
                            <Form className="flex flex-col gap-5 p-2" onSubmit={handleSubmit(mode === 'create' ? handlePiyachokCreate : handlePiyachokUpdate)}>
                                <div className="flex flex-col gap-1 relative">
                                    <Label isRequired>Мета</Label>
                                    <TextArea className="resize-none h-[15vh]" placeholder={'Введіть мету...'} min={0} required {...register('purpose')}/>
                                    {errors.purpose && <div className="absolute text-red-600 text-[10px] bottom-[-20px] leading-none">{errors.purpose.message}</div>}
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-[65%]">
                                        <Label isRequired>Дата зустрічі</Label>
                                        <Controller render={({field}) => <MyDatePicker field={field}/>} name={'meetDate'} control={control}/>
                                    </div>
                                    <div className="w-[33%]">
                                        <Label isRequired>Час зустрічі</Label>
                                        <Controller render={({field}) => <MyTimeField field={field}/>} name={'meetTime'} control={control}/>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 relative">
                                    <Label htmlFor="gender">Бажана стать гостей</Label>
                                    <GenderSelection name={'targetGender'} control={control}/>
                                </div>
                                <div className="flex flex-col gap-1 relative">
                                    <Label isRequired>Кількість людей (включаючи Вас)</Label>
                                    <Input type="number" placeholder={'Введіть кількість людей...'} min={1} required {...register('peopleCount')}/>
                                    {errors.peopleCount && <div className="absolute text-red-600 text-[10px] bottom-[-20px] leading-none">{errors.peopleCount.message}</div>}
                                </div>
                                <div className="flex flex-col gap-1 relative">
                                    <Label isRequired>Тип оплати</Label>
                                    <Controller render={({field}) => <MySelect<IPiyachokUserInput, "paymentType"> field={field} enumValues={PiyachokPaymentTypeTranslation}/>} name={'paymentType'} control={control}/>
                                </div>
                                <div className="flex flex-col gap-1 relative">
                                    <Label isRequired>Бюджет на особу (грн)</Label>
                                    <Input type="number" placeholder={'Введіть бюджет...'} min={1} required {...register('budget')}/>
                                    {errors.budget && <div className="absolute text-red-600 text-[10px] bottom-[-20px] leading-none">{errors.budget.message}</div>}
                                </div>
                                <Button type='submit' isDisabled={!isValid || !isDirty}>{submitButtonText}</Button>
                            </Form>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
}

export default PiyachokForm