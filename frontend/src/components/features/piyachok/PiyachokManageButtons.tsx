'use client'
import PiyachokForm from "@/src/components/features/piyachok/PiyachokForm";
import {IPiyachokDetail} from "@/src/interfaces/piyachok/IPiyachokDetail";
import {FC} from "react";
import DeleteModalWindow from "@/src/components/shared/components/delete-modal-window/DeleteModalWindow";
import {piyachokService} from "@/src/services/piyachok.service";
import {toast} from "@heroui/react";
import {redirect} from "next/navigation";
import {updateTagAction} from "@/src/actions/server.actions";

type PropsType = {
    piyachok: IPiyachokDetail
}

const PiyachokManageButtons: FC<PropsType> = ({piyachok}) => {
    const {id, purpose} = piyachok
    const resourceDescription = `пиячок з метою "${purpose}"`
    const handleDelete = async () => {
        const response = await piyachokService.delete(id)
        if(!response.success){
            toast.danger(response.data.message)
            return
        }
        await updateTagAction('piyachoks')
        toast.success('Успішно видалено пиячок!')
        redirect('/piyachok')
    }
    return (
        <div className="flex gap-3">
            <PiyachokForm piyachok={piyachok} mode={'update'}/>
            <DeleteModalWindow handleDelete={handleDelete} resourceDescription={resourceDescription} isButton={true}/>
        </div>
    )
}

export default PiyachokManageButtons