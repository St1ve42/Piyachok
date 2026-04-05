import {ChangeEvent, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useRegionInfinityQuery} from "@/useQuery/useRegionInfinityQuery";
import {useCityInfinityQuery} from "@/useQuery/useCityInfinityQuery";
import {useInView} from "react-intersection-observer";
import {joiResolver} from "@hookform/resolvers/joi";
import {signUpValidator} from "@/validators/sign-up.validator";
import {JoiOptions} from "@/constants/joi.options";

type SignUpFormProps = {
    name: string,
    surname: string,
    age: number,
    regionId: number,
    cityId: number,
    email: string,
    password: string,
    regionName: string,
    cityName: string
}

const useSignUpQuery = () => {
    const [isOpenRegion, setIsOpenRegion] = useState(false);
    const [isOpenCity, setIsOpenCity] = useState(false);
    const [isShownPassword, setIsShownPassword] = useState(false)
    const [regionInputValue, setRegionInputValue] = useState('');
    const [cityInputValue, setCityInputValue] = useState('');
    const {register, setValue, watch, formState: {isValid, errors}} = useForm<SignUpFormProps>({mode: 'all', reValidateMode: "onChange", resolver: joiResolver(signUpValidator, JoiOptions)})

     
    const regionId = watch('regionId')

    const regionQuery = useRegionInfinityQuery({search: regionInputValue})
    const cityQuery = useCityInfinityQuery({regionId, search: cityInputValue})
    const { ref, inView } = useInView();
    useEffect(() => {
        if (inView) {
            if (isOpenRegion && regionQuery.hasNextPage && !regionQuery.isFetchingNextPage) {
                regionQuery.fetchNextPage().then();
            }
            if (isOpenCity && cityQuery.hasNextPage && !cityQuery.isFetchingNextPage) {
                cityQuery.fetchNextPage().then();
            }
            // Якщо буде відкритий селект міста, можна додати аналогічну логіку сюди
        }
    }, [inView, regionQuery, isOpenRegion, cityQuery, isOpenCity]);

    const handleCitySelect = (id: number, name: string) => {
        setValue('cityId', id, {shouldValidate: true});
        setValue('cityName', name);
        setCityInputValue(name);
        setIsOpenCity(false);
    };

    // Введення тексту в інпут
    const handleCityInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setCityInputValue(val);

        if (val === '') {
            setValue('cityId', undefined, {shouldValidate: true});
            setIsOpenCity(false);
        } else if (!isOpenCity) {
            setIsOpenCity(true);
        }
    };

    const handleRegionSelect = (id: number, name: string) => {
        setValue('regionId', id, {shouldValidate: true});
        setValue('regionName', name);
        setRegionInputValue(name);
        setIsOpenRegion(false);
    };

    // Введення тексту в інпут
    const handleRegionInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setRegionInputValue(val);

        if (val === '') {
            setValue('regionId', undefined, {shouldValidate: true});
            setIsOpenRegion(false);
        } else if (!isOpenRegion) {
            setIsOpenRegion(true);
        }
    };
    return {isOpenRegion, setIsOpenRegion, isShownPassword, setIsShownPassword, isOpenCity, setIsOpenCity, regionInputValue, setRegionInputValue, cityInputValue, setCityInputValue, register, setValue, isValid, errors, regionQuery, cityQuery, ref, handleRegionInputChange, handleRegionSelect, handleCityInputChange, handleCitySelect, regionId}
}

export default useSignUpQuery