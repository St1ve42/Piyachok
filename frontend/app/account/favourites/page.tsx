import {Metadata} from "next";
import Favourites from "@/src/components/views/account/Favourites";
import {FC} from "react";
import {redirect} from "next/navigation";
import {userService} from "@/src/services/users.service";
import {getAccessCookie} from "@/src/services/server.service";

export const metadata: Metadata = {
    title: 'Мої улюблені'
}

type PropsType = {
    searchParams: Promise<Record<'page', number | undefined>>
}

const FavouritesPage: FC<PropsType> = async ({searchParams}) => {
    let {page = 1} = await searchParams
    page = Number(page)
    if(isNaN(page) || page < 1){
        redirect('/account/favourites')
    }
    const accessToken = await getAccessCookie()
    const favouriteFoodAndDrinkList = await userService.findMyFavouriteFoodAndDrinks({page}, {headers: {'Cookie': accessToken}})
    if(!favouriteFoodAndDrinkList.success){
        return <div>{favouriteFoodAndDrinkList.data.message}</div>
    }
    return <Favourites foodAndDrinkListData={favouriteFoodAndDrinkList.data} page={page}/>
}

export default FavouritesPage