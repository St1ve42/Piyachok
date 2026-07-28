'use client'
import { Dispatch, FC, SetStateAction } from "react";
import { Button, Modal } from "@heroui/react";
import {TrashBin} from "@gravity-ui/icons";

type SharedType = {
    handleDelete: () => void,
    resourceDescription: string
}

type PropsType = ({
    isButton: true,
} & SharedType) | (SharedType & {isButton: false, isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>} )

const DeleteModalWindow: FC<PropsType> = ({handleDelete, resourceDescription, isButton = true, isOpen, setIsOpen}) => {
    return (
        <Modal isOpen={isOpen}>
            {isButton && <Button variant="danger"><TrashBin/>Видалити</Button>}
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog className="sm:max-w-[450px]">
                        <Modal.CloseTrigger onClick={() => setIsOpen(false)}/>
                        <Modal.Header>
                            <Modal.Heading className="text-red-600 line-clamp-3">Видалити {resourceDescription}?</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <p className="line-clamp-3">Ви збираєтесь назавжди видалити {resourceDescription}</p>
                                <p>Ви впевнені в цьому?</p>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={handleDelete} variant="danger" className="w-full" slot="close">
                                Так
                            </Button>
                            <Button className="w-full" slot="close" onClick={() => setIsOpen(false)}>
                                Ні
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
}

export default DeleteModalWindow