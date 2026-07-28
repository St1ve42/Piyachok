import {NewsCategoryEnum} from "@/src/enums/news/news-category.enum";

export const NewsCategoryTranslation: Record<NewsCategoryEnum, string> = {
    [NewsCategoryEnum.GENERAL]: 'Загальні',
    [NewsCategoryEnum.SALE]: 'Акційні',
    [NewsCategoryEnum.EVENT]: 'Подія'
}