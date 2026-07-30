'use client'
import Image from "next/image";
import PageNotFound from "@/src/public/no-results.png";
import { Button, Heading } from "@heroui/react";
import {FC} from "react";
import {StaticImport} from "next/dist/shared/lib/get-img-props";
import {useURL} from "@/src/hooks/shared/useURL";

type PropsType = {
    image?: string | StaticImport
    text?: string,
    isButtonClearFilters?: boolean,
    queryNamesToRemove?: string[]
}

const NoResults: FC<PropsType> = ({image, text, queryNamesToRemove, isButtonClearFilters = true}) => {
    const {pathname, router, createQueryString} = useURL()
    const handleOnPressFilter = () => {
        const query = (queryNamesToRemove as string[]).reduce((accum, currentValue) => {
            return createQueryString(currentValue, null, 'delete', accum)
        }, createQueryString('page', 1, 'set'))
        router.push(pathname + '?' + query)
    }
    return <div className="h-[50vh] flex justify-center items-center">
      <div className="w-full flex flex-col items-center gap-3">
          <Image src={image ?? PageNotFound} width={100} height={100} alt={'Не знайдено'}/>
          <Heading level={3} className="text-center">Схоже, ми поки нічого не знайшли...</Heading>
          <div className="text-center">
              {text ?? `За Вашим запитом збігів немає. Спробуйте знайти щось інакше ${isButtonClearFilters ? 'або очистити фільтри' : ''} — це має допомогти!`}
          </div>
          {isButtonClearFilters && queryNamesToRemove && <Button onPress={handleOnPressFilter}>Скинути фільтри</Button>}
      </div>
    </div>
};

export default NoResults;
