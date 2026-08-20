'use client'
import {
  Avatar,
  Button,
  Card,
  Dropdown, Form,
  Header,
  Input,
  Label,
  Modal,
  PressEvent, toast,
} from "@heroui/react";
import {EllipsisVertical, Pencil, Route, TrashBin} from "@gravity-ui/icons";
import UsersSearch from "@/src/components/features/users/search/UsersSearch";
import {utilsService} from "@/src/services/utils.service";
import UserAvatar from "@/src/public/default_user_avatar.png";
import {foodAndDrinkService} from "@/src/services/food-and-drink.service";
import {updateTagAction} from "@/src/actions/server.actions";
import { ChangeEventHandler, FC, useRef, useState } from "react";
import {superadminFoodAndDrinkService} from "@/src/services/superadmin-food-and-drink.service";
import { FoodAndDrinkStatusEnum } from "@/src/enums/food-and-drink/food-and-drink-status.enum";
import { useRouter } from "next/navigation";
import {IFoodAndDrinkSuperadminInfo} from "@/src/interfaces/food-and-drink/IFoodAndDrinkSuperadminInfo";
import {IUser} from "@/src/interfaces/users/IUser";
import {ITopCategory} from "@/src/interfaces/top-category/ITopCategory";
import TopCategoryCard from "@/src/components/features/top-category/TopCategoryCard";
import NoResults from "@/src/components/shared/ui/NoResults";
import {useForm} from "react-hook-form";
import {ISuperadminFoodAndDrinkUpdate} from "@/src/interfaces/food-and-drink/ISuperadminFoodAndDrinkUpdate";
import {joiResolver} from "@hookform/resolvers/joi";
import {SuperadminFoodAndDrinkUpdateValidator} from "@/src/validators/food-and-drink/superadmin-food-and-drink-update.validator";
import {JoiOptions} from "@/src/constants/joi.options";

type PropsType = {
    foodAndDrink: IFoodAndDrinkSuperadminInfo,
    users: IUser[],
    topCategories: ITopCategory[]
}

const FoodAndDrinkSuperadminManageButtons: FC<PropsType> = ({foodAndDrink, users, topCategories}) => {
    const {id, name, status} = foodAndDrink
    const [isCorrectInput, setIsCorrectInput] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<null | string>(null)
    const [isOpenRatingModal, setIsOpenRatingModal] = useState<boolean>(false)
    const router = useRouter()
    const closeTriggerButtonRef = useRef<HTMLButtonElement | null>(null)

    const handleConfirm = async () => {
        const response = await foodAndDrinkService.delete(id)
        if(response.success){
            await updateTagAction('food-and-drink-list')
        }
        else{
            setErrorMessage(errorMessage)
        }
    }

    const handleOnPressDeleteButton: (e: PressEvent) => void = () => {
        setIsCorrectInput(false)
    }

    const handleConfirmInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.target.value
        if(name === value){
            setIsCorrectInput(true)
        }
        else{
            if(isCorrectInput){
                setIsCorrectInput(false)
            }
        }
    }

    const handleChangeStatus = async () => {
        const statusToSet = foodAndDrink.status === 'active' ? FoodAndDrinkStatusEnum.INACTIVE : FoodAndDrinkStatusEnum.ACTIVE
        const response = await superadminFoodAndDrinkService.setStatus(id, statusToSet)
        if(response.success){
            router.refresh()
        }
        else{
            setErrorMessage(response.data.message)
        }
    }

    const handleBindOwnership = (userId: string) => {
        return async () => {
            const response = await superadminFoodAndDrinkService.bindOwnership(id, {userId})
            if(response.success){
                if(closeTriggerButtonRef.current){
                    closeTriggerButtonRef.current.click()
                }
                router.refresh()
            }
            else{
                setErrorMessage(response.data.message)
            }
        }

    }

    const {register, handleSubmit, formState: {errors, isValid}} = useForm<ISuperadminFoodAndDrinkUpdate>(({mode: 'all', resolver: joiResolver(SuperadminFoodAndDrinkUpdateValidator, JoiOptions)}))
    const handleChangeRating = async (data: ISuperadminFoodAndDrinkUpdate) => {
        const response = await superadminFoodAndDrinkService.update(id, data)
        if(!response.success){
            toast.danger(response.data.message)
            return
        }
        toast.success('Успішно змінено рейтинг закладу!')
        setIsOpenRatingModal(false)
        await updateTagAction(`food-and-drink-by-id-${id}`)
        await updateTagAction(`food-and-drink-list`)
    }

    const handleResetToSystemRating = async () => {
        const response = await superadminFoodAndDrinkService.update(id, {customRating: null})
        if(!response.success){
            toast.danger(response.data.message)
            return
        }
        toast.success('Успішно встановлено системне значення рейтингу!')
        setIsOpenRatingModal(false)
        await updateTagAction(`food-and-drink-by-id-${id}`)
        await updateTagAction(`food-and-drink-list`)
    }

    return (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:justify-end">
            <Dropdown>
                <Button isIconOnly aria-label="Menu" variant="secondary" className="w-[40px] max-sm:w-auto flex justify-center">
                    <EllipsisVertical className="outline-none" />
                </Button>
                <Dropdown.Popover>
                    <Dropdown.Menu>
                        <Dropdown.Section>
                            <Header>Дії</Header>
                            <Dropdown.Item onClick={handleChangeStatus}>
                                <Label>{status === 'active' ? 'Деактивувати' : 'Активувати'}</Label>
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setIsOpenRatingModal(true)}>
                                <Label>Змінити рейтинг</Label>
                            </Dropdown.Item>
                        </Dropdown.Section>
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown>
            <Modal isOpen={isOpenRatingModal}>
                <Modal.Backdrop>
                    <Modal.Container>
                        <Modal.Dialog className="sm:max-w-[300px] flex gap-3 flex-col">
                            <Modal.CloseTrigger onClick={() => setIsOpenRatingModal(false)}/>
                            <Modal.Header>
                                <Modal.Heading>Новий рейтинг</Modal.Heading>
                            </Modal.Header>
                            <Modal.Body>
                                <Form className="flex gap-3 flex-col" onSubmit={handleSubmit(handleChangeRating)}>
                                    <div className="relative p-1 w-full">
                                        <Input type="number" min={0} max={5} step={0.1} {...register('customRating')} className="w-full"/>
                                        {errors.customRating && <div className="absolute text-red-600 text-[10px] max-sm:text-[9px] bottom-[-20px] leading-none">{errors.customRating.message}</div>}
                                    </div>
                                    <div className="flex flex-col justify-between mt-4 gap-2">
                                        <Button type="submit" isDisabled={!isValid} className="w-full">Змінити</Button>
                                        <Button onClick={handleResetToSystemRating}>Скинути до системного рейтингу</Button>
                                    </div>
                                </Form>
                            </Modal.Body>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
            <Modal>
                <Button className="w-full sm:w-auto bg-green-400">🏆 Додати до топ категорії</Button>
                <Modal.Backdrop>
                    <Modal.Container>
                        <Modal.Dialog className="sm:max-w-[450px] h-[60vh]">
                            <Modal.CloseTrigger ref={closeTriggerButtonRef}/>
                            <Modal.Header>
                                <Modal.Heading>Виберіть топ категорію, до якого хочете прив&#39;язати вибраний заклад</Modal.Heading>
                            </Modal.Header>
                            <Modal.Body className="flex gap-3 flex-col">
                                {topCategories.length > 0 ? topCategories.map(topCategory => <TopCategoryCard key={topCategory.id} topCategory={topCategory} mode={'add-food-and-drink'} foodAndDrinkId={id} closeTriggerButton={closeTriggerButtonRef}/>) : <NoResults/>}
                            </Modal.Body>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
            <Modal>
                <Button className="w-full sm:w-auto bg-orange-400"><Route/>Прив`язка</Button>
                <Modal.Backdrop>
                    <Modal.Container>
                        <Modal.Dialog className="sm:max-w-[450px] h-[60vh]">
                            <Modal.CloseTrigger ref={closeTriggerButtonRef}/>
                            <Modal.Header>
                                <Modal.Heading>Виберіть користувача, якого хочете прив&#39;язати до вибраного закладу, або знайдіть його, скориставшись пошуком за імейлом</Modal.Heading>
                            </Modal.Header>
                            <Modal.Body className="flex gap-3 flex-col">
                                <div className="ml-1">
                                    <UsersSearch/>
                                </div>
                                <div className="mb-3">
                                    {users.length !== 0 ? users.map(user => <Card key={user.id} className="text-[14px] h-fit mt-3">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-4">
                                                <Avatar className={'size-14'}>
                                                    <Avatar.Image alt="фото" src={user.photo ? utilsService.buildStorageURL(user.photo ) : UserAvatar.src} width={100} height={100}/>
                                                </Avatar>
                                                <div>
                                                    <div>{user.name} {user.surname}</div>
                                                    <div>{user.email}</div>
                                                </div>
                                            </div>
                                            <Button className="bg-orange-400" onClick={handleBindOwnership(user.id)}><Route/></Button>
                                        </div>
                                    </Card>) : <div className="mt-2 italic">Користувачів не знайдено</div>}
                                </div>
                            </Modal.Body>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
            <Button onPress={() => router.push(`/account/superadmin/food-and-drinks/${id}/update`)} className="w-full sm:w-auto"><Pencil/>Редагувати</Button>
            <Modal>
                <Button variant="danger" onPress={handleOnPressDeleteButton} className="w-full sm:w-auto"><TrashBin/>Видалити</Button>
                <Modal.Backdrop>
                    <Modal.Container>
                        <Modal.Dialog className="sm:max-w-[450px]">
                            <Modal.CloseTrigger />
                            <Modal.Header>
                                <Modal.Heading className="text-red-600">Видалити заклад?</Modal.Heading>
                            </Modal.Header>
                            <Modal.Body>
                                <div>
                                    <p>Ви збираєтесь назавжди видалити заклад &#34;{name}&#34;.</p>
                                    <p>Ви впевнені, що хочете видалити заклад? Це безповоротна дія, яка спричинить видалення закладу, включаючи усі пов`язані коментарі, відгуки і новини.:</p>
                                </div>
                                <div>Щоб підтвердити видалення, введіть <span className="font-bold">{name}</span> у поле нижче:</div>
                                <Input className="my-3 w-full sm:w-[90%] ml-0 sm:ml-1" type='email' placeholder='Введіть ім`я закладу для підтвердження' onChange={handleConfirmInputChange}/>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={handleConfirm} isDisabled={!isCorrectInput} variant="danger" className="w-full" slot="close">
                                    Видалити
                                </Button>
                                <Button className="w-full" slot="close">
                                    Скасувати
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </div>
    )
}

export default FoodAndDrinkSuperadminManageButtons