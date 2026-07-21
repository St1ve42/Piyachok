'use client'
import Vision from "@/src/public/vision.png"
import unVision from "@/src/public/unvision.png"
import useSignUpView from "@/src/components/views/auth/sign-up/useSignUpView";
import Image from "next/image";
import { Button, Form, Heading, Input, Label } from "@heroui/react";

const SignUpView = () => {
    const {isLoading, previousApiResponse, isOpenRegion, setIsOpenRegion, isShownPassword, setIsShownPassword, isShownRepeatedPassword, setIsShownRepeatedPassword, isOpenCity, setIsOpenCity, regionId, regionInputValue, cityInputValue, errors, register, isValid, regionQuery, cityQuery, ref, handleCityInputChange, handleRegionInputChange, handleRegionSelect, handleCitySelect, regions, cities, apiErrorMessage, handleSubmit, handleFormSubmit, onFocusInput} = useSignUpView()
    return (
        <section className="h-full flex justify-center">
            <Form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col w-[35vw] px-4 backdrop-blur-sm py-2 sign-up-form gap-[13px] rounded-[24px] [&_input]:mt-1">
                <Heading level={3} className='text-xl text-center'>Створити акаунт</Heading>
                <div className="flex justify-between w-full">
                    <div className="w-[48%] relative">
                        <Label>Ім&#39;я</Label>
                        <Input onFocus={onFocusInput} type='text' className="w-full" placeholder='Введіть ім`я...' disabled={isLoading} {...register('name')}></Input>
                        {errors.name && <div className="absolute text-red-600 text-[10px] leading-none mt-1">{errors.name.message}</div>}
                    </div>
                    <div className="w-[48%] relative">
                        <Label>Прізвище</Label>
                        <Input onFocus={onFocusInput} type='text' className="w-full" placeholder='Введіть прізвище...' disabled={isLoading} {...register('surname')}></Input>
                        {errors.surname && <div className="absolute text-red-600 text-[10px] leading-none mt-1">{errors.surname.message}</div>}
                    </div>
                </div>
                <div className="relative w-full">
                    <Label>Вік</Label>
                    <Input onFocus={onFocusInput} type='number' className="w-full" placeholder='Введіть вік...' min={1} max={100} disabled={isLoading} {...register('age')}></Input>
                    {errors.age && <div className="absolute text-red-600 text-[10px] leading-none mt-1">{errors.age.message}</div>}
                </div>
                <div className="flex gap-2">
                    <div className="relative w-full">
                        <Label>Область</Label>
                        <Input
                            placeholder={'Введіть область...'}
                            value={regionInputValue}
                            onChange={handleRegionInputChange}
                            onFocus={() => {
                                onFocusInput()
                                if(regionInputValue){
                                    setIsOpenRegion(true)
                                }
                            }}
                            disabled={isLoading}
                            className="bg-white p-2 border border-gray-400 cursor-pointer flex justify-between items-center w-[98%]"
                        >
                        </Input>

                        {isOpenRegion && (
                            <div className="absolute w-full mt-1 bg-white border border-gray-400 max-h-60 overflow-y-auto z-10 shadow-lg">
                                {regions && regions.length !== 0 ? regions.map((region) => (
                                    <div
                                        key={region.id}
                                        onClick={() => handleRegionSelect(region.id, region.name)}
                                        className="p-2 hover:bg-blue-600 hover:text-white cursor-pointer"
                                    >
                                        {region.name}
                                    </div>
                                )) : <div className="mt-2 ml-2">Не знайдено регіону</div>}

                                <div ref={ref} className="p-2 text-center text-sm text-gray-500">
                                    {regionQuery.isFetchingNextPage && 'Завантаження...'}
                                </div>
                            </div>
                        )}
                        {errors.regionId && <div className="absolute text-red-600 text-[10px] leading-none mt-1">{errors.regionId.message}</div>}
                    </div>
                    <div className="relative w-[96%]">
                        <Label>Місто</Label>
                        <Input
                            placeholder={'Введіть місто...'}
                            value={cityInputValue}
                            onChange={handleCityInputChange}
                            onFocus={() => {
                                onFocusInput()
                                if(cityInputValue){
                                    setIsOpenCity(true)
                                }
                            }}
                            disabled={isLoading}
                            className="bg-white p-2 border border-gray-400 cursor-pointer flex justify-between items-center w-[100%]"
                            style={{opacity: regionId ? 1 : 0.4, pointerEvents: regionId ? 'auto' : 'none'}}
                        >
                        </Input>

                        {isOpenCity && (
                            <div className="absolute w-full mt-1 bg-white border border-gray-400 max-h-60 overflow-y-auto z-10 shadow-lg">
                                {cities && cities.length !== 0 ? cities.map((city) => (
                                    <div
                                        key={city.id}
                                        onClick={() => handleCitySelect(city.id, city.name)}
                                        className="p-2 hover:bg-blue-600 hover:text-white cursor-pointer"
                                    >
                                        {city.name}
                                    </div>
                                )) : <div className="mt-2 ml-2">Не знайдено місто</div>}
                                <div ref={ref} className="p-2 text-center text-sm text-gray-500">
                                    {cityQuery.isFetchingNextPage && 'Завантаження...'}
                                </div>
                            </div>
                        )}
                        {errors.cityId && <div className="absolute text-red-600 text-[10px] leading-none mt-1">{errors.cityId.message}</div>}
                    </div>
                </div>
                <Input type="hidden" {...register('regionId')} />
                <Input type="hidden" {...register('cityId')} />
                {!previousApiResponse && <div className='relative w-full'>
                    <Label>Email</Label>
                    <Input onFocus={onFocusInput} type='email' className='w-full' placeholder='Введіть імейл...' disabled={isLoading} {...register('email')}></Input>
                    {'email' in errors && errors.email && <div className="absolute text-red-600 text-[10px] leading-none mt-1">{errors.email.message}</div>}
                </div>}
                {!previousApiResponse && <div>
                    <Label>Пароль</Label>
                    <div className="relative">
                        <Input onFocus={onFocusInput} type={isShownPassword ? 'text' : 'password'} placeholder='Введіть пароль...' disabled={isLoading} className='w-full pr-10 psw' {...register('password')}></Input>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center cursor-pointer hover:opacity-70 transition-opacity">
                            <Image src={Vision} alt={"Показати пароль"} height={25} width={25} onClick={() => {
                                setIsShownPassword(true)
                            }} style={{display: !isShownPassword ? 'block' : 'none'}}/>
                            <Image src={unVision} alt={"Приховати пароль"} height={25} width={25} onClick={() => setIsShownPassword(false)}
                                   style={{display: isShownPassword ? 'block' : 'none'}}/>
                        </div>
                        {'password' in errors && errors.password && <div className="mt-1 absolute text-red-600 text-[10px] leading-none">{errors.password.message}</div>}
                    </div>
                </div>}
                {!previousApiResponse && <div className="relative mt-[5px]">
                    <Label>Повторіть пароль</Label>
                    <div className="relative">
                        <Input onFocus={onFocusInput} type={isShownRepeatedPassword ? 'text' : 'password'} placeholder='Введіть пароль...'
                               className='w-full pr-10 psw' disabled={isLoading} {...register('repeatedPassword')}></Input>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center cursor-pointer hover:opacity-70 transition-opacity">
                            <Image src={Vision} alt={"Показати пароль"} height={25} width={25} onClick={() => {
                                setIsShownRepeatedPassword(true)
                            }} style={{display: !isShownRepeatedPassword ? 'block' : 'none'}}/>
                            <Image src={unVision} alt={"Приховати пароль"} height={25} width={25} onClick={() => setIsShownRepeatedPassword(false)}
                                   style={{display: isShownRepeatedPassword ? 'block' : 'none'}}/>
                        </div>
                        {apiErrorMessage &&
                            <div className="absolute text-red-600 text-xs leading-none mt-1">{apiErrorMessage}</div>}
                        {'repeatedPassword' in errors && errors.repeatedPassword && <div className="absolute text-red-600 text-[10px] leading-none mt-1">{errors.repeatedPassword.message}</div>}
                    </div>
                <Button type="submit" className="text-center text-white mt-6 w-full" isDisabled={!isValid || isLoading}
                        style={{opacity: isValid && !isLoading ? 1 : 0.8, cursor: isValid && !isLoading ? 'pointer' : 'default'}}>{isLoading ? 'Завантаження...' : 'Зареєструватись'}
                </Button>
            </div>}
            </Form>
        </section>
    )
}

export default SignUpView