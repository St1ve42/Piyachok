import type { Metadata } from "next";
import {
  getNews,
  getUserFromHeaders,
  isSuperadmin,
} from "@/src/services/server.service";
import NewsCreatingOrUpdatingView from "@/src/components/views/account/news/news-create-or-update/NewsCreatingOrUpdatingView";

type PropsType = {
    params: Promise<{id?: string}>;
};

export const generateMetadata = async({params}: PropsType): Promise<Metadata> => {
    const {title} = await getNews(params)
    return {
        title
    }
}

const NewsUpdatePage = async ({params}: PropsType) => {
    const {ownerOf} = await getUserFromHeaders()
    const news = await getNews(params);
    if(!(await isSuperadmin())){
        if(!ownerOf){
            return <div>У Вас немає права переглядати цю новину</div>
        }
        const {foodAndDrink} = news
        if(ownerOf.id !== foodAndDrink.id){
            return <div>У Вас немає права переглядати цю новину</div>
        }
    }
    return <NewsCreatingOrUpdatingView news={news} mode={'update'}/>
};

export default NewsUpdatePage;
