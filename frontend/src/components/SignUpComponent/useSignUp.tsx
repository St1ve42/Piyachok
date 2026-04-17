import {ChangeEvent, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useRegionInfinityQuery} from "@/src/useQuery/useRegionInfinityQuery";
import {useCityInfinityQuery} from "@/src/useQuery/useCityInfinityQuery";
import {useInView} from "react-intersection-observer";
import {joiResolver} from "@hookform/resolvers/joi";
import {getSignUpValidator} from "@/src/validators/sign-up.validator";
import {JoiOptions} from "@/src/constants/joi.options";
import {ISignUp} from "@/src/interfaces/auth/ISignUp";
import {useRouter} from "next/navigation";
import {useResponseMessageStore, useUserFromSocialNetworkStore} from "@/src/zustand/useSharedStore";
import {MakeOptional} from "@/src/interfaces/MakeOptional";
import {authService} from "@/src/services/auth.service";

export type IFormProps = MakeOptional<ISignUp, 'regionId' | 'cityId' | 'email' | 'password'> & {repeatedPassword?: string}

const useSignUp = () => {
    const [isOpenRegion, setIsOpenRegion] = useState(false);
    const [isOpenCity, setIsOpenCity] = useState(false);
    const [isShownPassword, setIsShownPassword] = useState(false)
    const [isShownRepeatedPassword, setIsShownRepeatedPassword] = useState(false)
    const [regionInputValue, setRegionInputValue] = useState('');
    const [cityInputValue, setCityInputValue] = useState('');
    const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null)

    //Zustand api store
    const {previousApiResponse} = useUserFromSocialNetworkStore()
    const {setApiResponse} = useResponseMessageStore()

    const router = useRouter()

    //Hook form
    const {register, setValue, watch, reset, handleSubmit, formState: {isValid, errors}} = useForm<MakeOptional<ISignUp, 'regionId' | 'cityId' | 'email' | 'password'> & {repeatedPassword?: string}>({mode: 'all', reValidateMode: "onChange", resolver: joiResolver(getSignUpValidator(!!previousApiResponse), JoiOptions)})
    // eslint-disable-next-line react-hooks/incompatible-library
    const regionId = watch('regionId')
    const allFields = watch();

    //Tanstack query hooks for implementation list of regions and cities + view hook for detecting if user scrolled to the end of list
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
    useEffect(() => {
        const error = regionQuery.error ?? cityQuery.error
        if(error){
            setApiErrorMessage(error.message)
        }
    }, [regionQuery.error, cityQuery.error]);

    const regions = regionQuery.data?.pages.flatMap(page => page.data)
    const cities = cityQuery.data?.pages.flatMap(page => page.data)

    //setting draft
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
    }, [reset, apiErrorMessage]);

    //setting data from social network after sign in
    useEffect(() => {
        if(previousApiResponse){
            reset({name: previousApiResponse.name.split(' ')[0], surname: previousApiResponse.name.split(' ')[1]})
        }
    }, [previousApiResponse, reset]);

    //removing draft from localStorage
    useEffect(() => {

        return () => {
            localStorage.removeItem('formData');
        };
    }, []);

    //saving draft to localStorage
    useEffect(() => {
        if(!apiErrorMessage){
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const {password, repeatedPassword, ...restSignUp} = allFields
            localStorage.setItem('formData', JSON.stringify(restSignUp));
        }
    }, [allFields, apiErrorMessage]);

    //Region and City handlers
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

    //saving successful api response from endpoint 'auth/activate' to store and redirecting to activation page
    //or saving successful api response from endpoint 'auth/social-network' to store and redirecting to main page with successful sign-up
    const handleFormSubmit = async(formData: IFormProps) => {
        if(!previousApiResponse && 'email' in formData){
            const {repeatedPassword, ...restFormData} = formData
            const response = await authService.singUp(restFormData)
            if(response.success && !('error' in response.data)){
                setApiResponse(response.data)
                router.push('/auth/activate')
            }
            else{
                setApiErrorMessage(response.data.message)
            }
        }
        else if(previousApiResponse){
            const response = await authService.signUpWithSocialNetwork(formData, previousApiResponse.token)
            if(!('error' in response.data)){
                if('email' in response.data){
                    router.push('/')
                    router.refresh()
                }
                else{
                    setApiResponse(response.data)
                    router.push('/auth/activate')
                }
            }
            else{
                setApiErrorMessage(response.data.message)
            }
        }
    }

    return {previousApiResponse, isShownRepeatedPassword, setIsShownRepeatedPassword, isOpenRegion, setIsOpenRegion, isShownPassword, setIsShownPassword, isOpenCity, setIsOpenCity, regionInputValue, setRegionInputValue, cityInputValue, setCityInputValue, register, setValue, isValid, errors, regionQuery, cityQuery, ref, handleRegionInputChange, handleRegionSelect, handleCityInputChange, handleCitySelect, regionId, regions, cities, handleFormSubmit, handleSubmit, apiErrorMessage}
}

export default useSignUp