import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {JoiOptions} from "@/src/constants/joi.options";
import {INewsCreate} from "@/src/interfaces/news/INewsCreate";
import {IGeneralNewsById} from "@/src/interfaces/news/IGeneralNewsById";
import {toast} from "@heroui/react";
import {utilsService} from "@/src/services/utils.service";
import {newsService} from "@/src/services/news.service";
import {createNewsSchema} from "@/src/validators/news/create-news-schema";
import {redirect} from "next/navigation";
import {updateTagAction} from "@/src/actions/server.actions";

type Props = { mode?: 'create' | 'update', news?: IGeneralNewsById, foodAndDrinkId?: string}

const useNewsCreatingOrUpdatingView = ({mode = 'create', news, foodAndDrinkId}: Props) => {
    const [photoPreview, setPhotoPreview] = useState<File | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const {register, handleSubmit, control, formState: {errors, isValid, isDirty}} = useForm<INewsCreate>({
        resolver: joiResolver(createNewsSchema, JoiOptions),
        mode: 'all',
        defaultValues: {
            title: news?.title ?? '',
            text: news?.text ?? '',
        }
    })

    useEffect(() => {
        if (mode === 'update' && news?.photo) {
            utilsService
              .urlToFile(utilsService.buildStorageURL(news.photo), "photo")
              .then((file) => setPhotoPreview(file));
        }
    }, [])

    const handlePhotoSelect = (files: FileList | null) => {
        if (!files || files.length === 0) {
            toast.danger('Файл не вибрано')
            return
        }
        if (files.length > 1) {
            toast.danger('Можна завантажити лише один файл')
            return
        }
        const file = files[0]
        const extension = file.type.split('/')[1]
        const allowedExtensions = ['png', 'jpeg', 'jpg']
        if(!allowedExtensions.includes(extension)){
            toast.danger(`Недопустиме розширення файлу. Дозволені розширення: ${utilsService.outputArray(allowedExtensions)}.`)
            return;
        }
        if(file.size > 1024*1024){
            toast.danger('Розмір файла не може перевищувати 1 МБ.')
            return;
        }
        setPhotoPreview(file)
    }

    const handlePhotoClear = () => {
        setPhotoPreview(null)
    }

    const handleCreateFormSubmit = async (data: INewsCreate) => {
        setIsLoading(true)
        const newsCreateResponse = await newsService.create(data)
        if(!newsCreateResponse.success){
            toast.danger(newsCreateResponse.data.message)
            return
        }
        const {id} = newsCreateResponse.data
        const formData = new FormData()
        formData.append('photo', photoPreview as File)
        const newsUploadPhotoResponse = await newsService.uploadPhoto(id, formData)
        if(!newsUploadPhotoResponse.success){
            toast.danger(newsUploadPhotoResponse.data.message)
            await newsService.delete(id)
            return
        }
        setIsLoading(false)
        toast.success('Новину успішно створено!')
        await updateTagAction(`food-and-drink-news-${foodAndDrinkId}`)
        await updateTagAction('public-news')
        redirect('/account/news')
    }

    const handleUpdateFormSubmit = async (data: INewsCreate) => {
        setIsLoading(true)
        if(!news || !photoPreview){
            return
        }
        const {id, foodAndDrink: {id: foodAndDrinkId}} = news
        const newsUpdateResponse = await newsService.update(id, data)
        if(!newsUpdateResponse.success){
            toast.danger(newsUpdateResponse.data.message)
            return
        }
        const formData = new FormData()
        formData.append('photo', photoPreview)
        const newsUploadPhotoResponse = await newsService.uploadPhoto(id, formData)
        if(!newsUploadPhotoResponse.success){
            toast.danger(newsUploadPhotoResponse.data.message)
            return
        }
        setIsLoading(false)
        toast.success('Новину успішно оновлено')
        await updateTagAction('public-news')
        await updateTagAction(`detail-news-${id}`)
        await updateTagAction(`food-and-drink-news-${foodAndDrinkId}`)
        redirect(`/account/news/${id}`)
    }

    return {register, handleSubmit, isDirty, control, errors, isValid, isLoading, photoPreview, handleCreateFormSubmit, handleUpdateFormSubmit, handlePhotoClear, handlePhotoSelect}
}

export default useNewsCreatingOrUpdatingView