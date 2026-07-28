import {ChangeEventHandler, MouseEventHandler, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {IUpdateMe} from "@/src/interfaces/users/IUpdateMe";
import {joiResolver} from "@hookform/resolvers/joi";
import {updateMeValidator} from "@/src/validators/user/update-me.validator";
import {JoiOptions} from "@/src/constants/joi.options";
import {useRouter} from "next/navigation";
import { userService } from "@/src/services/users.service";
import { Key, PressEvent } from "@heroui/react";
import {IUser} from "@/src/interfaces/users/IUser";
import { IApiResponse } from '@/src/interfaces/shared/IApiResponse';
import { superadminUsersService } from '@/src/services/superadmin-users.service';

const useProfileView = ({user, type, id}: {user: IUser, type: 'user' | 'superadmin', id?: string}) => {
    const {city, region, isActive, isVerified, email, name, surname, age, gender, phone} = user
    const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false)
    const [isCorrectInput, setIsCorrectInput] = useState<boolean>(false)
    const [regionInputValue, setRegionInputValue] = useState<string>(region)
    const [regionId, setRegionId] = useState<number | undefined>(undefined)
    const [cityId, setCityId] = useState<number | undefined>(undefined)
    const [cityInputValue, setCityInputValue] = useState<string>(city)
    const [errorResponseMessage, setErrorResponseMessage] = useState<string | null>(null)
    const [uploadPhotoResponseMessage, setUploadPhotoResponseMessage] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    const {register, handleSubmit, control, formState: {errors, isValid, isDirty}, reset} = useForm<IUpdateMe>({
        resolver: joiResolver(updateMeValidator, JoiOptions),
        mode: 'all',
        defaultValues: {
            name, surname, age, phone, gender
        }
    })

    const onSubmit = async (formData: Omit<IUpdateMe, 'regionId' | 'cityId'>) => {
        const updatedData: Partial<IUpdateMe> = {}
        Object.entries(formData).map(([key, value]) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if(formData[key] !== user[key]){
                if(formData.gender && formData.gender === 'reset'){
                    updatedData['gender'] = null
                }
                else{
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                    updatedData[key] = value
                }
            }
        })
        if(regionInputValue !== region) updatedData.regionId = regionId
        if(cityId && cityInputValue !== city) {
            updatedData.cityId = cityId
            updatedData.regionId = regionId
        }
        if(Object.keys(updatedData).length === 0) {
            setErrorResponseMessage('Будь ласка, змініть дані')
            return
        }


        let response: IApiResponse
        if(type === 'user'){
            response = await userService.updateMe(updatedData)
        }
        else if(type === 'superadmin' && id){
            response = await superadminUsersService.update(id, updatedData)
        }
        else{
            return
        }

        if(response.success){
            setIsOpenEdit(false)
            router.refresh()
        }
        else{
            setErrorResponseMessage(`${response.data.message}`)
        }
    }

    const handleUploadFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
        if (e.target.files) {
            const file = e.target.files[0]
            const formData = new FormData()
            formData.append('photo', file)

            let response: IApiResponse
            if(type === 'user'){
                response = await userService.uploadPhoto(formData)
            }
            else if(type === 'superadmin' && id){
                response = await superadminUsersService.uploadPhoto(id, formData)
            }
            else{
                return
            }
            if(response.success){
                setUploadPhotoResponseMessage(null)
                router.refresh()
            }
            else{
                setUploadPhotoResponseMessage(response.data.message)
            }
        }
    }

    const handleTriggerFileInput = () => {
        if(fileInputRef.current){
            fileInputRef.current.click()
        }
    }

    const handleDeletePhoto: MouseEventHandler<SVGSVGElement> = async () => {
        let response: IApiResponse
        if(type === 'user'){
            response = await userService.deletePhoto()
        }
        else if(type === 'superadmin' && id){
            response = await superadminUsersService.deletePhoto(id)
        }
        else{
            return
        }

        if(response.success){
            setUploadPhotoResponseMessage(null)
            router.refresh()
        }
        else{
            setUploadPhotoResponseMessage(response.data.message)
        }
    }

    const handleEdit = () => {
        if(isOpenEdit){
            reset()
            setErrorResponseMessage(null)
        }
        setIsOpenEdit((value) => !value)
    }

    const handleRegionInputChange = (value: string) => {
        if(cityInputValue) {
            setCityInputValue('')
        }
        setRegionInputValue(value)
    }

    const handleRegionSelectionChange = (value: Key | null) => {
        if(value){
            setRegionId(Number(value))
        }
    }

    const handleRegionIdMatch = (id: number | undefined) => {
        setRegionId(id);
    }

    const handleCityInputChange = (value: string) => {
        setCityInputValue(value)
    }

    const handleCitySelectionChange = (value: Key | null) => {
        if(value){
            setCityId(Number(value))
        }
    }

    const handleActivation = async () => {
        if(type === 'superadmin' && id){
          const response = await superadminUsersService.update(id, {isActive: !isActive})
          if(response.success){
            setErrorResponseMessage(null)
            router.refresh()
          }
          else{
            setErrorResponseMessage(`${response.data.message}`)
          }
        }
    }

    const handleVerification = async () => {
        if(type === 'superadmin' && id){
          const response = await superadminUsersService.update(id, {isVerified: !isVerified})
          if(response.success){
            setErrorResponseMessage(null)
            router.refresh()
          }
          else{
            setErrorResponseMessage(`${response.data.message}`)
          }
        }
    }

    const handleDelete = async () => {
      let response: IApiResponse
      if(type === 'user'){
        response = await userService.deleteMe()
      }
      else if(type === 'superadmin' && id){
        response = await superadminUsersService.delete(id)
      }
      else{
        return
      }

      if(response.success){
        setUploadPhotoResponseMessage(null)
        router.refresh()
      }
      else{
        setErrorResponseMessage(`${response.data.message}`)
      }
    }

    const handleConfirmInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.target.value
        if(email === value){
          setIsCorrectInput(true)
        }
        else{
          if(isCorrectInput){
            setIsCorrectInput(false)
          }
        }
    }

    const handleRestore = async () => {
      if(type === 'superadmin' && id){
        const response = await superadminUsersService.update(id, {isDeleted: false})
        if(response.success){
          setErrorResponseMessage(null)
          router.refresh()
        }
        else{
          setErrorResponseMessage(`${response.data.message}`)
        }
      }
    }

    const handleOnPressDeleteButton: (e: PressEvent) => void = () => {
       setIsCorrectInput(false)
    }

  return {handleUploadFile, handleTriggerFileInput, handleDeletePhoto, onSubmit, handleEdit, handleRegionInputChange, handleRegionSelectionChange, handleCityInputChange, handleCitySelectionChange, register, handleSubmit, errors, isValid, errorResponseMessage, uploadPhotoResponseMessage, isOpenEdit, cityInputValue, regionInputValue, fileInputRef, control, regionId, handleRegionIdMatch, handleActivation, handleVerification, handleDelete, isCorrectInput, handleConfirmInputChange, handleRestore, handleOnPressDeleteButton, isDirty, router}
}

export default useProfileView