'use client'
import {Header, Key, ListBox} from "@heroui/react";
import {FC} from "react";
import {IUser} from "@/src/interfaces/users/IUser";
import {GlobalUserRoleEnum} from "@/src/enums/user/global.user.role.enum";
import {authService} from "@/src/services/auth.service";
import {useRouter} from "next/navigation";
import {Bars, CircleNumber1} from "@gravity-ui/icons"
import {Comment, Comments, Star, Person, Persons, ChartColumn, ArrowRightFromSquare, House, ListUl, Heart, Plus, Shield} from "@gravity-ui/icons";
import Link from "next/link";

type PropsType = {
    user: IUser
}

const Sidebar: FC<PropsType> = ({user}) => {
    const {role, ownerOf} = user
    const router = useRouter()
    const handleExit = async() => {
        const response = await authService.logOut()
        if(response.success){
            router.refresh()
        }
    }
    return (
        <section className="w-[20%] h-[80%] border-2 rounded-2xl mt-2 hidden lg:block">
            <Header className="text-xl text-black border-b-[1px] rounded-t-2xl pl-3">Особистий кабінет</Header>
            <ListBox className="gap-0 overflow-y-scroll max-h-[73vh]" aria-label={'бокова панель'} onAction = {async (key: Key | null) => {
                if(key === 'exit'){
                    await handleExit()
                }
            }}>
                <ListBox.Section>
                    <Header>Мій простір</Header>
                    <ListBox.Item textValue={'Профіль'}>
                        <Link href={'/account'} className="flex w-full items-center gap-3">
                            <Person/> Профіль
                        </Link>
                    </ListBox.Item>
                    <ListBox.Item textValue={'Улюблені'}>
                        <Link href={'/account/favourites'} className="flex w-full items-center gap-3">
                            <Heart/> Улюблені
                        </Link>
                    </ListBox.Item>
                    <ListBox.Item textValue={'Відгуки'}>
                        <Link href={'/account/reviews'} className="flex w-full items-center gap-3">
                            <Star/>
                            Відгуки
                        </Link>
                    </ListBox.Item>
                    <ListBox.Item textValue={'Коментарі'}>
                        <Link href={'/account/comments'} className="flex w-full items-center gap-3">
                            <Comment/>
                            Коментарі
                        </Link>
                    </ListBox.Item>
                </ListBox.Section>
                <ListBox.Section>
                    <Header>Мій заклад</Header>
                    {ownerOf && <ListBox.Item textValue={'Заклад'}>
                        <Link href={'/account/food-and-drink'} className="flex w-full items-center gap-3">
                            <House/>
                            Заклад
                        </Link>
                    </ListBox.Item>}
                    {ownerOf && <ListBox.Item textValue={'Статистика'}>
                        <Link href={'/account/statistics'} className="flex w-full items-center gap-3">
                            <ChartColumn/>
                            Статистика
                        </Link>
                    </ListBox.Item>}
                    {!ownerOf && <ListBox.Item textValue={'Створити заклад'}>
                        <Link href={'/account/food-and-drink/create'} className="flex w-full items-center gap-3">
                            <Plus/>
                            Створити заклад
                        </Link>
                    </ListBox.Item>}
                    {ownerOf && <ListBox.Item textValue={'Створити новину'}>
                        <Link href={'/account/news/create'} className="flex w-full items-center gap-3">
                            <Plus/>
                            Створити новину
                        </Link>
                    </ListBox.Item>}
                    {ownerOf && <ListBox.Item textValue={'Новини закладу'}>
                        <Link href={'/account/news'} className="flex w-full items-center gap-3">
                            <Bars/>
                            Новини
                        </Link>
                    </ListBox.Item>}
                </ListBox.Section>
                {role === GlobalUserRoleEnum.SUPERADMIN && <ListBox.Section>
                    <Header>Модерація</Header>
                    <ListBox.Item textValue={'Модерація закладів'}>
                        <Link href={'/account/superadmin/food-and-drinks/moderate'} className="flex w-full items-center gap-3">
                            <Shield/>
                            Модерація закладів
                        </Link>
                    </ListBox.Item>
                    <ListBox.Item textValue={'Усі заклади'}>
                        <Link href={'/account/superadmin/food-and-drinks'} className="flex w-full items-center gap-3">
                            <ListUl/>
                            Усі заклади
                        </Link>
                    </ListBox.Item>
                    <ListBox.Item textValue={'Усі користувачі'}>
                        <Link href={'/account/superadmin/users'} className="flex w-full items-center gap-3">
                            <Persons/>
                            Усі користувачі
                        </Link>
                    </ListBox.Item>
                    <ListBox.Item textValue={'Усі коментарі'}>
                        <Link href={'/account/superadmin/comments'} className="flex w-full items-center gap-3">
                            <Comments/>
                            Усі коментарі
                        </Link>
                    </ListBox.Item>
                    <ListBox.Item textValue={'Усі новини'}>
                        <Link href={'/account/superadmin/news'} className="flex w-full items-center gap-3">
                            <Persons/>
                            Усі новини
                        </Link>
                    </ListBox.Item>
                    <ListBox.Item textValue={'Усі відгуки'}>
                        <Link href={'/account/superadmin/reviews'} className="flex w-full items-center gap-3">
                            <Star/>
                            Усі відгуки
                        </Link>
                    </ListBox.Item>
                    <ListBox.Item textValue={'Усі топ категорії'}>
                        <Link href={'/account/superadmin/top-categories'} className="flex w-full items-center gap-3">
                            <CircleNumber1/>
                            Усі топ категорії
                        </Link>
                    </ListBox.Item>
                </ListBox.Section>}
                <ListBox.Section>
                    <Header>Вихід</Header>
                    <ListBox.Item id={'exit'} textValue={'Вихід'} className="text-red-600">
                        <ArrowRightFromSquare/>
                        Вийти
                    </ListBox.Item>
                </ListBox.Section>
            </ListBox>
        </section>
    )
}

export default Sidebar