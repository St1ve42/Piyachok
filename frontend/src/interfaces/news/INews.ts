import {NewsCategoryEnum} from "@/src/enums/news/news-category.enum";

export interface INews {
    id: string;
    title: string;
    photo: string | null;
    category: NewsCategoryEnum,
    isPromoted: boolean
    createdAt: string;
}