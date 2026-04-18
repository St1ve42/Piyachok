'use client'
import './SignUpStyle.css'
import Vision from "@/src/public/vision.png"
import unVision from "@/src/public/unvision.png"
import useSignUp from "@/src/components/SignUpComponent/useSignUp";
import Image from "next/image";

const SignUpComponent = () => {
    const {isLoading, previousApiResponse, isOpenRegion, setIsOpenRegion, isShownPassword, setIsShownPassword, isShownRepeatedPassword, setIsShownRepeatedPassword, isOpenCity, setIsOpenCity, regionId, regionInputValue, cityInputValue, errors, register, isValid, regionQuery, cityQuery, ref, handleRegionInputChange, handleCityInputChange, handleRegionSelect, handleCitySelect, regions, cities, apiErrorMessage, handleSubmit, handleFormSubmit} = useSignUp()
    return (
        <section className="h-full flex justify-center items-center ">
            <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col w-[50%] p-3 sign-up-form gap-5">
                <h1 className='text-xl text-center'>Створити акаунт</h1>
                <div className="flex justify-between w-full">
                    <div className="w-[48%] relative">
                        <input type='text' className="w-full" placeholder='Ім`я' disabled={isLoading} {...register('name')}></input>
                        {errors.name && <div className="absolute text-red-600 text-[10px] leading-none mt-1">{errors.name.message}</div>}
                    </div>
                    <div className="w-[48%] relative">
                        <input type='text' className="w-full" placeholder='Прізвище' disabled={isLoading} {...register('surname')}></input>
                        {errors.surname && <div className="absolute text-red-600 text-[10px] leading-none mt-1">{errors.surname.message}</div>}
                    </div>
                </div>
                <div className="relative w-full">
                    <input type='number' className="w-full" placeholder='Вік' min={1} max={100} disabled={isLoading} {...register('age')}></input>
                    {errors.age && <div className="absolute text-red-600 text-[10px] leading-none mt-1">{errors.age.message}</div>}
                </div>
                <div className="flex gap-2">
                    <div className="relative w-full">
                        <input
                            placeholder={'Область'}
                            value={regionInputValue}
                            onChange={handleRegionInputChange}
                            onFocus={() => regionInputValue && setIsOpenRegion(true)}
                            disabled={isLoading}
                            className="bg-white p-2 border border-gray-400 cursor-pointer flex justify-between items-center w-[98%]"
                        >
                        </input>

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
                        <input
                            placeholder={'Місто'}
                            value={cityInputValue}
                            onChange={handleCityInputChange}
                            onFocus={() => cityInputValue && setIsOpenCity(true)}
                            disabled={isLoading}
                            className="bg-white p-2 border border-gray-400 cursor-pointer flex justify-between items-center w-[100%]"
                            style={{opacity: regionId ? 1 : 0.4, pointerEvents: regionId ? 'auto' : 'none'}}
                        >
                        </input>

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
                <input type="hidden" {...register('regionId')} />
                <input type="hidden" {...register('cityId')} />
                {!previousApiResponse && <div className='relative w-full'>
                    <input type='email' className='w-full' placeholder='Електронна пошта' disabled={isLoading} {...register('email')}></input>
                    {'email' in errors && errors.email && <div className="absolute text-red-600 text-[10px] leading-none mt-1">{errors.email.message}</div>}
                </div>}
                {!previousApiResponse && <div className="relative">
                    <input type={isShownPassword ? 'text' : 'password'} placeholder='Пароль' disabled={isLoading} className='w-full pr-10 psw' {...register('password')}></input>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center cursor-pointer hover:opacity-70 transition-opacity">
                        <Image src={Vision} alt={"Показати пароль"} height={25} width={25} onClick={() => {
                            setIsShownPassword(true)
                        }} style={{display: !isShownPassword ? 'block' : 'none'}}/>
                        <Image src={unVision} alt={"Приховати пароль"} height={25} width={25} onClick={() => setIsShownPassword(false)}
                               style={{display: isShownPassword ? 'block' : 'none'}}/>
                    </div>
                    {'password' in errors && errors.password && <div className="mt-1 absolute text-red-600 text-[10px] leading-none">{errors.password.message}</div>}
                </div>}
                {!previousApiResponse && <div className="relative mt-[5px]">
                    <input type={isShownRepeatedPassword ? 'text' : 'password'} placeholder='Повторіть пароль'
                           className='w-full pr-10 psw' disabled={isLoading} {...register('repeatedPassword')}></input>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center cursor-pointer hover:opacity-70 transition-opacity">
                        <Image src={Vision} alt={"Показати пароль"} height={25} width={25} onClick={() => {
                            setIsShownRepeatedPassword(true)
                        }} style={{display: !isShownRepeatedPassword ? 'block' : 'none'}}/>
                        <Image src={unVision} alt={"Приховати пароль"} height={25} width={25} onClick={() => setIsShownRepeatedPassword(false)}
                               style={{display: isShownRepeatedPassword ? 'block' : 'none'}}/>
                    </div>
                    {'repeatedPassword' in errors && errors.repeatedPassword && <div className="absolute text-red-600 text-[10px] leading-none mt-1">{errors.repeatedPassword.message}</div>}
                    {apiErrorMessage &&
                        <div className="absolute text-red-600 text-xs leading-none mt-6">{apiErrorMessage}</div>}
                </div>}
                <button type="submit" className="text-center sign-up-btn bg-black text-white mt-6" disabled={!isValid || isLoading}
                        style={{opacity: isValid && !isLoading ? 1 : 0.8, cursor: isValid && !isLoading ? 'pointer' : 'default'}}>{isLoading ? 'Завантаження...' : 'Зареєструватись'}
                </button>
            </form>
        </section>
    )
}

export default SignUpComponent