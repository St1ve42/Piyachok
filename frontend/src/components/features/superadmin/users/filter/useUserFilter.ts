import {useURL} from "@/src/hooks/shared/useURL";
import {Key} from "@heroui/react";

const useUserFilter = () => {
    const {createQueryString, pathname, router} = useURL()
    const handleFilterChange = (key: Key) => {
        router.push(pathname + '?' + createQueryString('searchBy', key.toString()))
    }
    return {handleFilterChange};
};

export default useUserFilter;
