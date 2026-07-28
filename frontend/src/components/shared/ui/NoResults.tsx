import Image from "next/image";
import PageNotFound from "@/src/public/no-results.png";
import {Heading} from "@heroui/react";
import {FC} from "react";
import {StaticImport} from "next/dist/shared/lib/get-img-props";

type PropsType = {
    image?: string | StaticImport
    text?: string
}

const NoResults: FC<PropsType> = ({image, text}) => {
  return <div className="h-[50vh] flex justify-center items-center">
      <div className="w-full flex flex-col items-center gap-2">
          <Image src={image ?? PageNotFound} width={100} height={100} alt={'Не знайдено'}/>
          <Heading level={3} className="text-center">Схоже, ми поки нічого не знайшли...</Heading>
          <div className="text-center">
              {text ?? 'За Вашим запитом збігів немає. Спробуйте знайти щось інакше — це має допомогти!'}
          </div>
      </div>
  </div>
};

export default NoResults;
