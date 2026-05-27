import Home from "@/src/components/views/home/Home";

type PropsType = {
    searchParams: Promise<Record<'page' | 'name' | 'type' | 'rating' | 'averageReceipt[gte]' | 'averageReceipt[lte]' | 'features[]' | 'sortBy', string | undefined> & {
        sort: 'asc' | 'desc'
    }>
}

export default async function HomePage({searchParams}: PropsType) {
    const {page = 1, ...restSearchParams} = await searchParams
    return <Home searchParams={{page: Number(page), ...restSearchParams}}/>;
}