'use client'
import {
  Button,
  Input,
  Modal,
  PressEvent,
} from "@heroui/react";
import {Pencil, TrashBin} from "@gravity-ui/icons";
import Link from "next/link";
import { ChangeEventHandler, FC, useState } from "react";
import {foodAndDrinkService} from "@/src/services/food-and-drink.service";
import {updateTagAction} from "@/src/actions/server.actions";
import {IFoodAndDrinkOwnerInfo} from "@/src/interfaces/food-and-drink/IFoodAndDrinkOwnerInfo";

type PropsType = {
    foodAndDrink: IFoodAndDrinkOwnerInfo
}

const FoodAndDrinkOwnerManageButtons: FC<PropsType> = ({foodAndDrink}) => {
    const {id, name} = foodAndDrink
    const [isCorrectInput, setIsCorrectInput] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<null | string>(null)

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

    return (
        <div className="flex items-center gap-4">
            <Link href={`/account/food-and-drink/update`}>
                <Button className="self-end"><Pencil/>Редагувати</Button>
            </Link>
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

export default FoodAndDrinkOwnerManageButtons