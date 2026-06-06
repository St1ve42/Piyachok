import { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

const GalleryFilesWithSwiper = memo(function GalleryFilesWithSwiper({galleryFiles}: {galleryFiles: File[]}) {
    return <div className="relative rounded-md overflow-hidden">
      <Swiper className="relative w-full h-[25rem] bg-gray-100"
              modules={[Navigation, Pagination]}
              spaceBetween={50}
              navigation={true}
              pagination={true}
              loop={galleryFiles.length > 1}
              slidesPerView={1}
      >
        {galleryFiles.map((image => <SwiperSlide key={uuidv4()}><Image src={URL.createObjectURL(image)} alt={image.name} fill className="object-cover"/></SwiperSlide>))}
      </Swiper>
    </div>
})

export default GalleryFilesWithSwiper;
