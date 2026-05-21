import {ChangeEventHandler, MouseEventHandler, useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {IUpdateUser} from "@/src/interfaces/users/IUpdateUser";
import {joiResolver} from "@hookform/resolvers/joi";
import {updateMeValidator} from "@/src/validators/update-me.validator";
import {JoiOptions} from "@/src/constants/joi.options";
import {useRegionQuery} from "@/src/useQuery/useRegionQuery";
import {useCityQuery} from "@/src/useQuery/useCityQuery";
import {useRouter} from "next/navigation";
import {userService} from "@/src/services/users.service";
import {Key} from "@heroui/react";
import {IUser} from "@/src/interfaces/users/IUser";

const useProfile = ({user}: {user: IUser}) => {
    const {name, surname, age, gender, city, region, phone} = user
    const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false)
    const [regionInputValue, setRegionInputValue] = useState<string>(region)
    const [debouncedRegionInputValue, setDebouncedRegionInputValue] = useState<string>(region)
    const [regionId, setRegionId] = useState<number | undefined>(undefined)
    const [cityId, setCityId] = useState<number | undefined>(undefined)
    const [selectedGender, setSelectedGender] = useState<string | undefined>(gender)
    const [cityInputValue, setCityInputValue] = useState<string>(city)
    const [debouncedCityInputValue, setDebouncedCityInputValue] = useState<string>(city)
    const [updateResponseMessage, setUpdateResponseMessage] = useState<string | null>(null)
    const [uploadPhotoResponseMessage, setUploadPhotoResponseMessage] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const {register, handleSubmit, formState: {errors, isValid}, reset} = useForm<IUpdateUser>({
        resolver: joiResolver(updateMeValidator, JoiOptions),
        mode: 'all'
    })

    const regionQuery = useRegionQuery({search: debouncedRegionInputValue})
    const cityQuery = useCityQuery({search: debouncedCityInputValue, regionId})
    const router = useRouter()
    const regionData = regionQuery.data
    const cityData = cityQuery.data

    const onSubmit = async (formData: Omit<IUpdateUser, 'regionId' | 'cityId'>) => {
        const updatedData: Partial<IUpdateUser> = {}
        if(formData.name !== name) updatedData.name = formData.name
        if(formData.surname !== surname) updatedData.surname = formData.surname
        if(formData.age !== age) updatedData.age = formData.age
        if(formData.phone !== phone) updatedData.phone = formData.phone
        if(selectedGender !== gender && selectedGender !== 'reset') updatedData.gender = selectedGender
        if(regionId && regionInputValue !== region) updatedData.regionId = regionId
        if(cityId && cityInputValue !== city) updatedData.cityId = cityId
        if(Object.keys(updatedData).length === 0) {
            setUpdateResponseMessage('Будь ласка, змініть дані')
            return
        }
        console.log(updatedData)

        const response = await userService.updateMe(updatedData)
        if(response.success){
            setUpdateResponseMessage('Дані успішно змінені!')
            setIsOpenEdit(false)
            router.refresh()
        }
        else{
            setUpdateResponseMessage(`${response.data.message}`)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedCityInputValue(cityInputValue), 500)
        return () => clearTimeout(timer)
    }, [cityInputValue]);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedRegionInputValue(regionInputValue), 500)
        return () => clearTimeout(timer)
    }, [regionInputValue]);

    const handleUploadFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
        if (e.target.files) {
            const file = e.target.files[0]
            const formData = new FormData()
            formData.append('photo', file)
            const response = await userService.uploadPhoto(formData)
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
        const response = await userService.deletePhoto()
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
            setUpdateResponseMessage(null)
        }
        setIsOpenEdit((value) => !value)
    }

    const handleGenderSelectionChange = (value: Key | null) => {
        if(value){
            setSelectedGender(`${value}`)
        }
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

    const handleCityInputChange = (value: string) => {
        setCityInputValue(value)
    }

    const handleCitySelectionChange = (value: Key | null) => {
        if(value){
            setCityId(Number(value))
        }
    }

    return {handleUploadFile, handleTriggerFileInput, handleDeletePhoto, onSubmit, regionData, cityData, handleEdit, handleGenderSelectionChange, handleRegionInputChange, handleRegionSelectionChange, handleCityInputChange, handleCitySelectionChange, register, handleSubmit, errors, isValid, updateResponseMessage, uploadPhotoResponseMessage, isOpenEdit, selectedGender, cityInputValue, regionInputValue, fileInputRef}
}

export default useProfile