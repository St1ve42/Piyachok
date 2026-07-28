'use client'
import { Button, Form, Input, Modal, toast} from "@heroui/react";
import {topCategoryService} from "@/src/services/top-category.service";
import {useForm} from "react-hook-form";
import {ICreateTopCategory} from "@/src/interfaces/top-category/ICreateTopCategory";
import {updateTagAction} from "@/src/actions/server.actions";
import {ITopCategory} from "@/src/interfaces/top-category/ITopCategory";
import {FC} from "react";
import {Plus} from "@gravity-ui/icons";

type PropsType = {
    mode?: 'create' | 'update',
    topCategory?: ITopCategory,
    isOpen?: boolean,
    setIsOpen?: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

const CreateOrUpdateTopCategory: FC<PropsType> = ({mode = 'create', topCategory, isOpen, setIsOpen}) => {
    const {register, handleSubmit} = useForm<ICreateTopCategory>({mode: 'all', defaultValues: {
        name: topCategory?.name
        }})
    const handleCreateTopCategory = async (formData: ICreateTopCategory) => {
        const createTopCategoryResponse = await topCategoryService.create(formData)
        if(!createTopCategoryResponse.success){
            toast.danger(createTopCategoryResponse.data.message)
        }
        await updateTagAction('all-top-categories')
    }
    const handleUpdateTopCategory = async (formData: ICreateTopCategory) => {
        if(!topCategory){
            return
        }
        const {id} = topCategory
        const createTopCategoryResponse = await topCategoryService.update(id, formData)
        if(!createTopCategoryResponse.success){
            toast.danger(createTopCategoryResponse.data.message)
        }
        await updateTagAction('all-top-categories')
    }
    return (
        <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
            {isOpen === undefined && <Button variant="secondary"><Plus/> Створити</Button>}
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog className="sm:max-w-[360px]">
                        <Modal.CloseTrigger/>
                        <Modal.Header>
                            <Modal.Heading>{mode === 'create' ? 'Нова топ категорія' : 'Оновлення топ категорії'}</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body>
                            <Form className="flex flex-col gap-2 justify-center" onSubmit={handleSubmit(mode === 'create' ? handleCreateTopCategory : handleUpdateTopCategory)}>
                                <Input type='text' max={100} placeholder='Введіть назву...' className="w-[99%] my-1" {...register('name')}/>
                                <Button className="w-full" slot="close" type='submit'>
                                    {mode === 'create' ? 'Створити' : 'Оновити'}
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
}

export default CreateOrUpdateTopCategory