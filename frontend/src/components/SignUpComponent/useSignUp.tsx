import {ChangeEvent, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useRegionInfinityQuery} from "@/src/useQuery/useRegionInfinityQuery";
import {useCityInfinityQuery} from "@/src/useQuery/useCityInfinityQuery";
import {useInView} from "react-intersection-observer";
import {joiResolver} from "@hookform/resolvers/joi";
import {getSignUpValidator} from "@/src/validators/sign-up.validator";
import {JoiOptions} from "@/src/constants/joi.options";
import {IBaseSignUp, ISignUpWithRepeatedPassword} from "@/src/interfaces/auth/ISignUp";
import {useRouter} from "next/navigation";
import {useResponseMessageStore, useUserFromSocialNetworkStore} from "@/src/zustand/useSharedStore";
import {authService} from "@/src/services/auth.service";
import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";
import {IResponseMessage} from "@/src/interfaces/shared/IResponseMessage";
import {IUser} from "@/src/interfaces/users/IUser";

export type IFormProps = ISignUpWithRepeatedPassword | IBaseSignUp

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
    const {register, setValue, watch, reset, handleSubmit, formState: {isValid, errors}} = useForm<ISignUpWithRepeatedPassword | IBaseSignUp>({mode: 'all', reValidateMode: "onChange", resolver: joiResolver(getSignUpValidator(!!previousApiResponse), JoiOptions)})
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
            let fields: IBaseSignUp | ISignUpWithRepeatedPassword = allFields
            if('repeatedPassword' in allFields){
                const {password, repeatedPassword, ...restSignUp} = allFields
                fields = restSignUp
            }
            localStorage.setItem('formData', JSON.stringify(fields));
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
            setValue('cityId', 0, {shouldValidate: true});
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
            setValue('regionId', 0, {shouldValidate: true});
            setIsOpenRegion(false);
        } else if (!isOpenRegion) {
            setIsOpenRegion(true);
        }
    };

    //saving successful api response from endpoint 'auth/activate' to store and redirecting to activation page
    //or saving successful api response from endpoint 'auth/social-network' to store and redirecting to main page with successful sign-up
    const handleFormSubmit = async(formData: IFormProps) => {
        let response: IApiResponse<IResponseMessage> | IApiResponse<IResponseMessage | IUser> | null = null
        if(!previousApiResponse && 'email' in formData) {
            const {repeatedPassword, ...restFormData} = formData
            response = await authService.singUp(restFormData)
        }
        else if(previousApiResponse){
            response = await authService.signUpWithSocialNetwork(formData, previousApiResponse.token)
        }
        if(response && response.success){
            if('message' in response.data){
                setApiResponse(response.data)
                router.push('/auth/activate')
            }
            else{
                router.push('/')
                router.refresh()
            }
        }
        else if(response){
            setApiErrorMessage(response.data.message)
        }
    }

    return {previousApiResponse, isShownRepeatedPassword, setIsShownRepeatedPassword, isOpenRegion, setIsOpenRegion, isShownPassword, setIsShownPassword, isOpenCity, setIsOpenCity, regionInputValue, setRegionInputValue, cityInputValue, setCityInputValue, register, setValue, isValid, errors, regionQuery, cityQuery, ref, handleRegionInputChange, handleRegionSelect, handleCityInputChange, handleCitySelect, regionId, regions, cities, handleFormSubmit, handleSubmit, apiErrorMessage}
}

export default useSignUp