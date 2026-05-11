import Home from "@/src/components/views/home/Home";

type PropsType = {
    searchParams: Promise<{page: string | undefined, search: string | undefined}>
}

export default async function HomePage({searchParams}: PropsType) {
    const {page = 1, search = ''} = await searchParams
    return <Home searchParams={{search, page: Number(page)}}/>;
}

