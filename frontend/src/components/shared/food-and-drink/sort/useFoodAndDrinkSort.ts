import {useEffect, useState} from "react";
import {useURL} from "@/src/hooks/shared/useURL";
import {Key} from "@heroui/react";
import {useErrorStore} from "@/src/hooks/shared/useSharedStore";

const useFoodAndDrinkSort = () => {
    const [sort, setSort] = useState<string | null>(null)
    const [sortBy, setSortBy] = useState<string | null>(null)
    const {pathname, router, createQueryString} = useURL()
    const {error, setError} = useErrorStore()
    const handleSuccess = (position: GeolocationPosition) => {
        let query = createQueryString(`sortBy`, 'distance')
        query = createQueryString(`lat`, position.coords.latitude.toString(), "set", query)
        query = createQueryString(`lng`, position.coords.longitude.toString(), "set", query)
        router.push(pathname + '?' + createQueryString(`sort`, sort, "set", query))
    };

    const handleError = (err: GeolocationPositionError) => {
        setError(err.message);
        setSortBy('reset')
        setSort('reset')
    };
    useEffect(() => {
        if(sortBy){
            if(sortBy === 'reset'){
                router.push(pathname + '?' + createQueryString(`sortBy`, null, "delete"))
            }
            else if(sortBy === 'distance'){
                if (!navigator.geolocation) {
                    setError("Геолокація не підтримується");
                    return;
                }

                navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
            }
            else{
                let query = createQueryString(`lat`, null, "delete")
                query = createQueryString(`lng`, null, "delete", query)
                router.push(pathname + '?' + createQueryString(`sortBy`, sortBy, "set", query))
            }
        }
    }, [sortBy]);

    useEffect(() => {
        if(sort){
            if(sort === 'reset'){
                router.push(pathname + '?' + createQueryString(`sort`, null, "delete"))
            }
            else{
                router.push(pathname + '?' + createQueryString(`sort`, sort))
            }
        }
    }, [sort]);
    const handleChangeSortBy = (key: Key | null) => {
        if(error){
            setError(null)
        }
        if(key){
            if(key === 'distance'){
                setSort('asc')
            }
            setSortBy(`${key}`)
        }
    }
    const handleChangeSort = (key: Key | null) => {
        if(error){
            setError(null)
        }
        if (key) {
            setSort(`${key}`)
        }
    }
    return {sort, sortBy, handleChangeSortBy, handleChangeSort}
}

export default useFoodAndDrinkSort