'use client'
import './sign-up.style.css'
import Vision from "@/public/vision.png"
import unVision from "@/public/unvision.png"
import useSignUpQuery from "@/components/SignUpComponent/use-sign-up.query";
import Image from "next/image";
import {signUpAction} from "@/actions/server.actions";
import {useRouter} from "next/navigation";
import {usePathname} from "next/navigation";

const SignUpComponent = () => {
    const {isOpenRegion, setIsOpenRegion, isShownPassword, setIsShownPassword, isOpenCity, setIsOpenCity, regionId, regionInputValue, cityInputValue, errors, register, isValid, regionQuery, cityQuery, ref, handleRegionInputChange, handleCityInputChange, handleRegionSelect, handleCitySelect} = useSignUpQuery()
    const pathname = usePathname();
    const router = useRouter()
    if(regionQuery.isError) return <div>{regionQuery.error.stack}</div>
    if(cityQuery.isError) return <div>{cityQuery.error.stack}</div>
    const regions = regionQuery.data?.pages.flatMap(page => page.data)
    const cities = cityQuery.data?.pages.flatMap(page => page.data)
    return (
        <section className="h-full flex justify-center items-center ">
            <form action={signUpAction} className="flex flex-col w-[50%] p-4 sign-up-form gap-5">
                <h1 className='text-xl text-center'>Створити акаунт</h1>
                <div className="flex justify-between">
                    <input type='text' className="w-[48%]" placeholder='Ім`я' {...register('name')}></input>
                    <input type='text' className="w-[48%]" placeholder='Прізвище' {...register('surname')}></input>
                </div>
                {/*<div className="h-1 mt-1">*/}
                {errors.name && <div className="text-red-600">{errors.name.message}</div>}
                {/*</div>*/}
                {errors.surname && <div className="text-red-600">{errors.surname.message}</div>}
                <input type='number' placeholder='Вік' min={1} {...register('age')}></input>
                {errors.age && <div className="text-red-600">{errors.age.message}</div>}
                <div className="flex gap-2">
                    <div className="relative w-full">
                        <input
                            placeholder={'Область'}
                            value={regionInputValue}
                            onChange={handleRegionInputChange}
                            onFocus={() => regionInputValue && setIsOpenRegion(true)}
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
                    </div>
                    <div className="relative w-[96%]">
                        <input
                            placeholder={'Місто'}
                            value={cityInputValue}
                            onChange={handleCityInputChange}
                            onFocus={() => cityInputValue && setIsOpenCity(true)}
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
                    </div>

                </div>
                {errors.regionId && <div className="text-red-600">{errors.regionId.message}</div>}
                {errors.cityId && <div className="text-red-600">{errors.cityId.message}</div>}
                <input type="hidden" {...register('regionId')} />
                <input type="hidden" {...register('cityId')} />
                <input type="hidden" {...register('regionName')} />
                <input type="hidden" {...register('cityName')} />
                <input type='email' placeholder='Електронна пошта' {...register('email')}></input>
                {errors.email && <div className="text-red-600">{errors.email.message}</div>}
                <div className="relative">
                    <input type={isShownPassword ? 'text' : 'password'} placeholder='Пароль' className='w-full pr-10 psw' {...register('password')}></input>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center cursor-pointer hover:opacity-70 transition-opacity">
                        <Image src={Vision} alt={"Показати пароль"} height={25} width={25} onClick={() => {
                            setIsShownPassword(true)
                        }} style={{display: !isShownPassword ? 'block' : 'none'}}/>
                        <Image src={unVision} alt={"Приховати пароль"} height={25} width={25} onClick={() => setIsShownPassword(false)} style={{display: isShownPassword ? 'block' : 'none'}}/>
                    </div>
                </div>
                {errors.password && <div className="text-red-600">{errors.password.message}</div>}
                <button type="submit" className="text-center sign-up-btn bg-black text-white" disabled={!isValid}
                        style={{opacity: isValid ? 1 : 0.8, cursor: isValid ? 'pointer' : 'default'}} onSubmit={() => router.replace(pathname)}>Зареєструватись
                </button>
            </form>
        </section>
    )
}

export default SignUpComponent