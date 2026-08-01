'use client'
import Search from "@/src/components/shared/components/search/Search";

const NewsSearch = ({initialSearchValue}: {initialSearchValue?: string}) => {
    return <Search initialValue={initialSearchValue}/>
}

export default NewsSearch