'use client'
import {
  Avatar,
  Button,
  Card,
  Dropdown,
  Header,
  Input,
  Label,
  Modal,
  PressEvent,
} from "@heroui/react";
import {EllipsisVertical, Pencil, Route, TrashBin} from "@gravity-ui/icons";
import UsersSearch from "@/src/components/features/users/search/UsersSearch";
import {UserSearchByEnum} from "@/src/enums/user/user-search-by.enum";
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

type PropsType = {
    foodAndDrink: IFoodAndDrinkSuperadminInfo,
    users: IUser[],
    topCategories: ITopCategory[]
}

const FoodAndDrinkSuperadminManageButtons: FC<PropsType> = ({foodAndDrink, users, topCategories}) => {
    const {id, name, status} = foodAndDrink
    const [isCorrectInput, setIsCorrectInput] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<null | string>(null)
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

    return (
        <div className="flex items-center gap-4">
            <Dropdown>
                <Button isIconOnly aria-label="Menu" variant="secondary">
                    <EllipsisVertical className="outline-none" />
                </Button>
                <Dropdown.Popover>
                    <Dropdown.Menu>
                        <Dropdown.Section>
                            <Header>Дії</Header>
                            <Dropdown.Item onClick={handleChangeStatus}>
                                <Label>{status === 'active' ? 'Деактивувати' : 'Активувати'}</Label>
                            </Dropdown.Item>
                        </Dropdown.Section>
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown>
            <Modal>
                <Button className="bg-orange-400"><Route/>Додати до топ категорії</Button>
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
                <Button className="bg-orange-400"><Route/>Прив`язка</Button>
                <Modal.Backdrop>
                    <Modal.Container>
                        <Modal.Dialog className="sm:max-w-[450px] h-[60vh]">
                            <Modal.CloseTrigger ref={closeTriggerButtonRef}/>
                            <Modal.Header>
                                <Modal.Heading>Виберіть користувача, якого хочете прив&#39;язати до вибраного закладу, або знайдіть його, скориставшись пошуком за імейлом</Modal.Heading>
                            </Modal.Header>
                            <Modal.Body className="flex gap-3 flex-col">
                                <div className="ml-1">
                                    <UsersSearch searchBy={UserSearchByEnum.EMAIL} isDropdown={false}/>
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
            <Button onPress={() => router.push(`/account/superadmin/food-and-drinks/${id}/update`)}><Pencil/>Редагувати</Button>
            <Modal>
                <Button variant="danger" onPress={handleOnPressDeleteButton}><TrashBin/>Видалити</Button>
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
                                <Input className="my-3 ml-1 w-[90%]" type='email' placeholder='Введіть ім`я закладу для підтвердження' onChange={handleConfirmInputChange}/>
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