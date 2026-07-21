'use client'
import Search from "@/src/components/shared/components/search/Search";
import {INewsQuery} from "@/src/interfaces/shared/IBaseQuery";
import {newsService} from "@/src/services/news.service";
import {IGeneralNews} from "@/src/interfaces/news/IGeneralNews";
import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";
import {IGeneralNewsListData} from "@/src/interfaces/news/IGeneralNewsListData";
import {ReactNode} from "react";
import {ListBox} from "@heroui/react";
import {NewsCategoryEnum} from "@/src/enums/news/news-category.enum";

const NewsSearch = ({category}: {category: NewsCategoryEnum}) => {
    const queryFn = async (query: INewsQuery): Promise<IApiResponse<IGeneralNewsListData>> => {
        return newsService.find({...query, category});
    }

    const searchMapCallback = (news: IGeneralNews): ReactNode => {
        const {id, title} = news
        return  <ListBox.Item key={id} id={title} textValue={title}>
            {title}
        </ListBox.Item>
    }

    return <Search searchBy={'title'} queryKey={'news'} queryFn={queryFn} mapCallback={searchMapCallback} notFoundMessage={'Новин не знайдено'}/>
}

export default NewsSearch