import {useURL} from "@/src/hooks/shared/useURL";
import {Key} from "@heroui/react";
import {useMemo} from "react";

const useReviewFilter = () => {
    const ratings = useMemo(() => [1,2,3,4,5], [])
    const {createQueryString, pathname, router} = useURL()
    const handleFilterChange = (key: Key) => {
        router.push(pathname + '?' + createQueryString('rating', key.toString()), {scroll: false})
    }
    return {handleFilterChange, ratings}
}

export default useReviewFilter