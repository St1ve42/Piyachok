import type { Metadata } from "next";
import NewsDetailsView from "@/src/components/views/NewsDetailsView";
import {getNews} from "@/src/services/server.service";

type PropsType = {
    params: Promise<{id?: string}>;
};

export const generateMetadata = async ({ params }: PropsType): Promise<Metadata> => {
    const { title } = await getNews(params);
    return {
    title,
    };
};

const NewsByIdPage = async ({ params }: PropsType) => {
  const news = await getNews(params);
  return <NewsDetailsView news={news} />;
};

export default NewsByIdPage;
