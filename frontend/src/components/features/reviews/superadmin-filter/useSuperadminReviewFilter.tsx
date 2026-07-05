import {useURL} from "@/src/hooks/shared/useURL";
import {Key} from "@heroui/react";
import {useMemo} from "react";
import {UserReviewSearchByEnum} from "@/src/enums/review/UserReviewSearchByEnum";

const useSuperadminReviewFilter = () => {
    const ratings = useMemo(() => [1,2,3,4,5], [])
    const searchByValues = useMemo(() => Object.values(UserReviewSearchByEnum), [])
    const {createQueryString, pathname, router} = useURL()
    const handleFilterChange = (key: Key) => {
        router.push(pathname + '?' + createQueryString('searchBy', key.toString()), {scroll: false})
    }
    const handleRatingChange = (key: Key) => {
        router.push(pathname + '?' + createQueryString('rating', key.toString()), {scroll: false})
    }
    return {handleFilterChange, searchByValues, ratings, handleRatingChange}
}

export default useSuperadminReviewFilter