'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import {INews} from "@/src/interfaces/news/INews";
import {FC} from "react";
import {Heading} from "@heroui/react";
import {Navigation, Pagination} from "swiper/modules";
import FoodAndDrinkNewsCard from "@/src/components/features/news/FoodAndDrinkNewsCard";
import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";
import {IFullData} from "@/src/interfaces/shared/IFullData";

type PropsType = {
    newsResponse: IApiResponse<IFullData<INews>>,
    hasRightToManageNews?: boolean,
    foodAndDrinkId: string
}

const FoodAndDrinkNews: FC<PropsType> = ({newsResponse, hasRightToManageNews = false, foodAndDrinkId}) => {
    if(!newsResponse.success){
        return <div>Сталась помилка при відображенні новини. Причина: {newsResponse.data.message}</div>
    }
    const {total, data: news} = newsResponse.data;
    return (
        <section>
            <Heading level={3}>Новини</Heading>
            <Swiper className="w-full"
                    modules={[Navigation, Pagination]}
                    spaceBetween={10}
                    navigation={true}
                    pagination={true}
                    slidesPerView={total > 3 ? 3 : total}
            >
                {news.map((oneNews => <SwiperSlide key={oneNews.id} className="m-1 w-full"><FoodAndDrinkNewsCard news={oneNews} hasRightToManageNews={hasRightToManageNews} mode={'default'} foodAndDrinkId={foodAndDrinkId}/></SwiperSlide>))}
            </Swiper>
        </section>
    )
}

export default FoodAndDrinkNews