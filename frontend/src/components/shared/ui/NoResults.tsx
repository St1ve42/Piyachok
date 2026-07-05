import Image from "next/image";
import PageNotFound from "@/src/public/no-results.png";
import {Heading} from "@heroui/react";

const NoResults = () => {
  return <div className="h-[60%] flex justify-center items-center">
      <div className="w-[60%] flex flex-col items-center gap-2">
          <Image src={PageNotFound} width={100} height={100} alt={'Не знайдено'}/>
          <Heading level={3}>Схоже, ми поки нічого не знайшли...</Heading>
          <div className="text-center">
              За Вашим запитом збігів немає. Спробуйте знайти щось інакше — це має допомогти!
          </div>
      </div>
  </div>
};

export default NoResults;
