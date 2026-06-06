import {useQuery} from "@tanstack/react-query";
import {IFullData} from "@/src/interfaces/shared/IFullData";
import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";

interface UseSearchProps<T> {
    search: string;
    queryKeys: string[];
    fetchFn: (query: string) => Promise<IApiResponse<IFullData<T>>>;
}

export function useSearchQuery<T>({search, queryKeys, fetchFn}: UseSearchProps<T>){
    return useQuery({
        queryKey: ['search', ...queryKeys],
        queryFn: async () => fetchFn(search),
        enabled: !!search,
    })
}