'use client'
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper/modules";
import Image from "next/image";
import {utilsService} from "@/src/services/utils.service";
import noImage from "@/src/public/no-image-icon.jpg";
import {FC} from "react";

type PropsType = {
    images: string[] | null
}

const FoodAndDrinkImages: FC<PropsType> = ({images}) => {
    return (
        images ? <div className="rounded-md overflow-hidden">
            <Swiper className="w-full h-[25rem] bg-gray-100"
                    modules={[Navigation, Pagination]}
                    spaceBetween={50}
                    navigation={true}
                    pagination={true}
                    loop={true}
                    slidesPerView={1}
            >
                {images.map((image => <SwiperSlide key={image}><Image src={utilsService.buildStorageURL(image)} alt={image} fill className="object-cover"/></SwiperSlide>))}
            </Swiper>
        </div> : <Image src={noImage} alt={'Зображення відсутнє'} width={150} height={150} priority={true} className="w-full h-[25rem] rounded-sm border-black border-solid border-2"/>
    )
}

export default FoodAndDrinkImages