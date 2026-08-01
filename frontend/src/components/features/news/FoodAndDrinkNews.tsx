'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import { INews } from "@/src/interfaces/news/INews";
import { FC, useLayoutEffect, useState } from "react";
import {Heading} from "@heroui/react";
import {Navigation, Pagination} from "swiper/modules";
import FoodAndDrinkNewsCard from "@/src/components/features/news/FoodAndDrinkNewsCard";
import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";
import {IFullData} from "@/src/interfaces/shared/IFullData";

type PropsType = {
    newsResponse: IApiResponse<IFullData<INews>>,
    hasRightToManageNews?: boolean,
    foodAndDrinkId: string,
    foodAndDrinkName: string
}

const FoodAndDrinkNews: FC<PropsType> = ({newsResponse, hasRightToManageNews = false, foodAndDrinkId, foodAndDrinkName}) => {
    const [clientWidth, setClientWidth] = useState<number | null>(null)
    useLayoutEffect(() => {
        setClientWidth(document.documentElement.clientWidth)
    }, [])
    if(!newsResponse.success){
        return <div>Сталась помилка при відображенні новини. Причина: {newsResponse.data.message}</div>
    }
    const {total, data: news} = newsResponse.data;
    return (
        <section>
            <Heading level={3}>Новини</Heading>
            {clientWidth ? <Swiper className="w-full"
                    modules={[Navigation, Pagination]}
                    spaceBetween={10}
                    navigation={true}
                    pagination={true}
                    slidesPerView={clientWidth > 620 ? (total > 3 ? 3 : total) : 1}
            >
                {news.map((oneNews => <SwiperSlide key={oneNews.id} className="m-1 w-full"><FoodAndDrinkNewsCard news={oneNews} hasRightToManageNews={hasRightToManageNews} mode={'default'} foodAndDrinkId={foodAndDrinkId} foodAndDrinkName={foodAndDrinkName}/></SwiperSlide>))}
            </Swiper> : <p>Завантаження...</p>}
        </section>
    )
}

export default FoodAndDrinkNews