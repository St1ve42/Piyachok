import type { Metadata } from "next";
import {getUserFromHeaders} from "@/src/services/server.service";
import NewsCreatingOrUpdatingView from "@/src/components/views/account/news/news-create-or-update/NewsCreatingOrUpdatingView";

export const metadata: Metadata = {
  title: "Створити новину",
};

const NewsCreate = async () => {
    const { ownerOf } = await getUserFromHeaders();
    if(!ownerOf){
        return <div>Створювати новини може лише власник закладу.</div>
    }
    const {id} = ownerOf
    return <NewsCreatingOrUpdatingView foodAndDrinkId={id}/>;
};

export default NewsCreate;
