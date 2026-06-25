import {Heading} from "@heroui/react";
import {IFoodAndDrinkListData} from "@/src/interfaces/food-and-drink/IFoodAndDrinkListData";
import {FC} from "react";
import {redirect} from "next/navigation";
import FoodAndDrinkList from "@/src/components/shared/food-and-drink/list/FoodAndDrinkList";
import PaginationWithEclipses from "@/src/components/ui/pagination/PaginationWithEclipses";

type PropsType = {
    foodAndDrinkListData: IFoodAndDrinkListData
    page: number
}

const Favourites: FC<PropsType> = ({foodAndDrinkListData}) => {
    const {data, total, page, totalPages} = foodAndDrinkListData
    if(page > totalPages && totalPages !== 0){
        redirect('/account/superadmin/food-and-drinks')
    }
  return (
    <section className="flex flex-col gap-3">
      <Heading level={3}>Мої улюблені заклади</Heading>
      <Heading level={5}>Знайдено: {total}</Heading>
      <FoodAndDrinkList
        foodAndDrinkList={data}
        href={"/food-and-drink"}
        mode={'favourite'}
      />
      {totalPages > 1 && (
        <PaginationWithEclipses totalPages={totalPages} currentPage={page} />
      )}
    </section>
  );
};

export default Favourites;
