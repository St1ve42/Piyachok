import {ChangeEvent, useActionState, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useRegionInfinityQuery} from "@/src/useQuery/useRegionInfinityQuery";
import {useCityInfinityQuery} from "@/src/useQuery/useCityInfinityQuery";
import {useInView} from "react-intersection-observer";
import {joiResolver} from "@hookform/resolvers/joi";
import {signUpValidator} from "@/src/validators/sign-up.validator";
import {JoiOptions} from "@/src/constants/joi.options";
import {signUpAction} from "@/src/actions/auth.actions";
import {ISignUp} from "@/src/interfaces/auth/ISignUp";
import {IResponseMessage} from "@/src/interfaces/shared/IResponseMessage";
import {IError} from "@/src/interfaces/shared/IError";
import {useRouter} from "next/navigation";
import {useResponseMessageStore} from "@/src/zustand/useSharedStore";
import {MakeOptional} from "@/src/interfaces/MakeOptional";

const useSignUp = () => {
    //Implement or fix draft
    const [isOpenRegion, setIsOpenRegion] = useState(false);
    const [isOpenCity, setIsOpenCity] = useState(false);
    const [isShownPassword, setIsShownPassword] = useState(false)
    const [regionInputValue, setRegionInputValue] = useState('');
    const [cityInputValue, setCityInputValue] = useState('');
    const router = useRouter()
    const {register, setValue, watch, reset, formState: {isValid, errors}} = useForm<MakeOptional<ISignUp, 'regionId' | 'cityId'>>({mode: 'all', reValidateMode: "onChange", resolver: joiResolver(signUpValidator, JoiOptions)})
    const [formState, formAction] = useActionState<{success: boolean, status: number, data: IResponseMessage | IError}, FormData>(signUpAction, {data: {message: ''}, success: false, status: 0})
    // eslint-disable-next-line react-hooks/incompatible-library
    const regionId = watch('regionId')
    const allFields = watch();
    const {setApiResponse} = useResponseMessageStore()

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
        }
    }, [inView, regionQuery, isOpenRegion, cityQuery, isOpenCity]);

    const handleCitySelect = (id: number, name: string) => {
        setValue('cityId', id, {shouldValidate: true});
        setCityInputValue(name);
        setIsOpenCity(false);
    };

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
        setRegionInputValue(name);
        setIsOpenRegion(false);
    };

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

    useEffect(() => {
        const formData = localStorage.getItem('formData')
        if(formData){
            try{
                const parsedData = JSON.parse(formData);
                reset(parsedData)
            }
            catch(e){
                console.log("Помилка парсингу даних: ", e)
            }
        }
    }, [reset, formState]);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {password, ...restSignUp} = allFields
        localStorage.setItem('formData', JSON.stringify(restSignUp));
    }, [allFields]);

    useEffect(() => {
        if(formState.success && !('error' in formState.data)){
            localStorage.removeItem('formData')
            setApiResponse(formState.data)
            router.push('/auth/activate')
        }
    }, [formState, router, setApiResponse]);



    return {formState, formAction, isOpenRegion, setIsOpenRegion, isShownPassword, setIsShownPassword, isOpenCity, setIsOpenCity, regionInputValue, setRegionInputValue, cityInputValue, setCityInputValue, register, setValue, isValid, errors, regionQuery, cityQuery, ref, handleRegionInputChange, handleRegionSelect, handleCityInputChange, handleCitySelect, regionId}
}

export default useSignUp