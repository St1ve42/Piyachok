'use client'
import {Header, Key, ListBox} from "@heroui/react";
import {FC} from "react";
import {IUser} from "@/src/interfaces/users/IUser";
import {GlobalUserRoleEnum} from "@/src/enums/user/global.user.role.enum";
import {authService} from "@/src/services/auth.service";
import {removeTokens} from "@/src/actions/server.actions";
import {useRouter} from "next/navigation";
import {Comment, Star, Person, Persons, ChartColumn, ArrowRightFromSquare, House, ListUl, Heart, Plus, Shield} from "@gravity-ui/icons";
import Link from "next/link";

type PropsType = {
    user: IUser
}

const Sidebar: FC<PropsType> = ({user}) => {
    const {role} = user
    const router = useRouter()
    const handleExit = async() => {
        const response = await authService.logOut()
        if(response.success){
            await removeTokens()
            router.refresh()
        }
    }
    return (
        <section className="w-[20%] h-fit border-2 rounded-2xl">
            <Header className="text-xl text-black border-b-[1px] rounded-t-2xl pl-3">Особистий кабінет</Header>
            <ListBox aria-label={'бокова панель'} onAction = {async (key: Key | null) => {
                if(key === 'exit'){
                    await handleExit()
                }
            }}>
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
                <ListBox.Item textValue={'Коментарі'}>
                    <Link href={'/account/comments'} className="flex w-full items-center gap-3">
                        <Comment/>
                        Коментарі
                    </Link>
                </ListBox.Item>
                <ListBox.Item textValue={'Відгуки'}>
                    <Link href={'/account/reviews'} className="flex w-full items-center gap-3">
                        <Star/>
                        Відгуки
                    </Link>
                </ListBox.Item>
                <ListBox.Item textValue={'Створити заклад'}>
                    <Link href={'/account/food-and-drink/create'} className="flex w-full items-center gap-3">
                        <Plus/>
                        Створити заклад
                    </Link>
                </ListBox.Item>
                {(role === GlobalUserRoleEnum.ADMIN || role === GlobalUserRoleEnum.SUPERADMIN) && <ListBox.Item textValue={'Заклад'}>
                    <Link href={'/account/food-and-drink'} className="flex w-full items-center gap-3">
                        <House/>
                        Заклад
                    </Link>
                </ListBox.Item>}
                {(role === GlobalUserRoleEnum.ADMIN || role === GlobalUserRoleEnum.SUPERADMIN) && <ListBox.Item textValue={'Статистика'}>
                    <Link href={'/account/statistics'} className="flex w-full items-center gap-3">
                        <ChartColumn/>
                        Статистика
                    </Link>
                </ListBox.Item>}
                {role === GlobalUserRoleEnum.SUPERADMIN && <ListBox.Item textValue={'Модерація закладів'}>
                    <Link href={'/account/superadmin/food-and-drinks/moderate'} className="flex w-full items-center gap-3">
                        <Shield/>
                        Модерація закладів
                    </Link>
                </ListBox.Item>}
                {role === GlobalUserRoleEnum.SUPERADMIN && <ListBox.Item textValue={'Усі заклади'}>
                    <Link href={'/account/superadmin/food-and-drinks'} className="flex w-full items-center gap-3">
                        <ListUl/>
                        Усі заклади
                    </Link>
                </ListBox.Item>}
                {role === GlobalUserRoleEnum.SUPERADMIN && <ListBox.Item textValue={'Усі користувачі'}>
                    <Link href={'/account/superadmin/users'} className="flex w-full items-center gap-3">
                        <Persons/>
                        Усі користувачі
                    </Link>
                </ListBox.Item>}
                <ListBox.Item id={'exit'} textValue={'Вихід'}>
                    <ArrowRightFromSquare/>
                    Вийти
                </ListBox.Item>
            </ListBox>
        </section>
    )
}

export default Sidebar