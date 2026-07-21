import {Heading} from "@heroui/react";
import {FC} from "react";
import {redirect} from "next/navigation";
import FoodAndDrinkList from "@/src/components/features/food-and-drink/FoodAndDrinkList";
import PaginationWithEclipses from "@/src/components/shared/components/pagination/PaginationWithEclipses";
import {getAccessCookie} from "@/src/services/server.service";
import {userService} from "@/src/services/users.service";

type PropsType = {
    page: number
}

const MyFavouritesView: FC<PropsType> = async ({page}) => {
    const accessToken = await getAccessCookie()
    const favouriteFoodAndDrinkList = await userService.findMyFavouriteFoodAndDrinks({page}, accessToken)
    if(!favouriteFoodAndDrinkList.success){
        return <div>{favouriteFoodAndDrinkList.data.message}</div>
    }
    const {data, total, totalPages} = favouriteFoodAndDrinkList.data
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

export default MyFavouritesView;
