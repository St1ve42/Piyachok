import {Metadata} from "next";
import MyFavouritesView from "@/src/components/views/account/MyFavouritesView";
import {FC} from "react";
import {redirect} from "next/navigation";

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
    return <MyFavouritesView page={page}/>
}

export default FavouritesPage