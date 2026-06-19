'use client'
import Instagram from "@/src/public/instagram.png";
import Twitter from "@/src/public/twitter.png";
import Facebook from "@/src/public/facebook_logo.svg";
import Telegram from "@/src/public/telegram.png";
import { ChangeEventHandler, useRef, useState } from "react";
import {redirect, useRouter } from "next/navigation";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { foodAndDrinkService } from "@/src/services/food-and-drink.service";
import { updateTagAction } from "@/src/actions/server.actions";
import { PressEvent } from "@heroui/react";
import { superadminFoodAndDrinkService } from "@/src/services/superadmin-food-and-drink.service";
import { IFoodAndDrink } from "@/src/interfaces/food-and-drink/IFoodAndDrink";
import { IFoodAndDrinkOwnerInfo } from "@/src/interfaces/food-and-drink/IFoodAndDrinkOwnerInfo";
import { FoodAndDrinkStatusEnum } from "@/src/enums/food-and-drink/food-and-drink-status.enum";

export default function useFoodAndDrink({foodAndDrink}: {foodAndDrink: IFoodAndDrink | IFoodAndDrinkOwnerInfo}) {
    const {id, name} = foodAndDrink
    const icons: {[key: string]: StaticImport} = {
        "facebook": Facebook,
        "telegram": Telegram,
        "instagram": Instagram,
        "X": Twitter
    }
    const [isCorrectInput, setIsCorrectInput] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<null | string>(null)
    const router = useRouter()
    const closeTriggerButtonRef = useRef<HTMLButtonElement | null>(null)

    const handleConfirm = async () => {
        const response = await foodAndDrinkService.delete(id)
        if(response.success){
            await updateTagAction('food-and-drink-list')
            router.refresh()
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
        if('status' in foodAndDrink){
            const response = await superadminFoodAndDrinkService.setStatus(id, foodAndDrink.status === 'active' ? FoodAndDrinkStatusEnum.INACTIVE : FoodAndDrinkStatusEnum.ACTIVE)
             if(response.success){
                router.refresh()
             }
            else{
                setErrorMessage(response.data.message)
            }
        }
    }

    const handleBindOwnership = (userId: string) => {
        return async () => {
            if('status' in foodAndDrink){
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

    }

    const handleToggleFavourite = async () => {
        const response = await foodAndDrinkService.toggleFavourite(foodAndDrink.id)
        if(!response.success && response.status === 401){
            redirect('/auth/sign-in')
        }
        if(!response.success){
            setErrorMessage(response.data.message)
            return
        }
        await updateTagAction('food-and-drink-by-id')
        await updateTagAction('my-favourite-food-and-drinks')
    }




    return {
        icons,
        handleConfirm,
        handleOnPressDeleteButton,
        isCorrectInput,
        handleConfirmInputChange,
        handleChangeStatus,
        handleBindOwnership,
        errorMessage,
        closeTriggerButtonRef,
        handleToggleFavourite
    }
}

