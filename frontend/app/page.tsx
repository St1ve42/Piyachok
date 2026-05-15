import Home from "@/src/components/views/home/Home";

type PropsType = {
    searchParams: Promise<Record<'page' | 'name' | 'type' | 'rating' | 'range[averageReceipt][gte]' | 'range[averageReceipt][lte]' | 'features[]' | 'sort[rating]' | 'sort[distance]' | 'sort[name]' | 'sort[averageReceipt]' | 'sort[createdAt]', string | undefined>>
}

export default async function HomePage({searchParams}: PropsType) {
    const {page = 1, ...restSearchParams} = await searchParams
    return <Home searchParams={{page: Number(page), ...restSearchParams}}/>;
}

    // return <Home searchParams={{page: Number(page), name, type, rating, "features[]": awaitedSearchParams["features[]"], "range[averageReceipt][gte]": awaitedSearchParams["range[averageReceipt][gte]"], "range[averageReceipt][lte]": awaitedSearchParams["range[averageReceipt][lte]"]}}/>;
