import Sort from "@/src/components/shared/components/sort/Sort";
import {FC} from "react";

type PropsType = {
    initialSortByValue?: string,
    initialSortValue?: string
}

const ReviewSort: FC<PropsType> = (props) => {
    const listBoxItemsPropsAndValues: Array<{
        id: string
        textValue: string
        text: string
    }> = [{id: 'rating', textValue: 'рейтинг', text: 'Рейтингом'}, {id: 'createdAt', textValue: 'дата створення', text: 'Дата створення'}]
    return <Sort listBoxItemsPropsAndValues={listBoxItemsPropsAndValues} {...props}/>
}

export default ReviewSort