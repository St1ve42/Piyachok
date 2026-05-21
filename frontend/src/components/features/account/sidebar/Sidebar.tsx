'use client'
import {Header, Key, ListBox} from "@heroui/react";
import {FC} from "react";
import {IUser} from "@/src/interfaces/users/IUser";
import {GlobalUserRoleEnum} from "@/src/enums/user/global.user.role.enum";
import {authService} from "@/src/services/auth.service";
import {removeTokens} from "@/src/actions/server.actions";
import {useRouter} from "next/navigation";
import {Comment, Star, Person, Persons, ChartColumn, ArrowRightFromSquare, House, ListUl, Heart, Plus} from "@gravity-ui/icons";

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
                <ListBox.Item href={'/account'} textValue={'Профіль'}>
                    <Person/> Профіль
                </ListBox.Item>
                <ListBox.Item href={'/account/favourites'} textValue={'Улюблені'}>
                    <Heart/> Улюблені
                </ListBox.Item>
                <ListBox.Item href={'/account/comments'} textValue={'Коментарі'}>
                    <Comment/>
                    Коментарі
                </ListBox.Item>
                <ListBox.Item href={'/account/reviews'} textValue={'Відгуки'}>
                    <Star/>
                    Відгуки
                </ListBox.Item>
                <ListBox.Item href={'/account/food-and-drink'} textValue={'Заклад'}>
                    <Plus/>
                    Створити заклад
                </ListBox.Item>
                {role === GlobalUserRoleEnum.ADMIN || role === GlobalUserRoleEnum.SUPERADMIN && <ListBox.Item href={'/account/food-and-drink'} textValue={'Заклад'}>
                    <House/>
                    Заклад
                </ListBox.Item>}
                {role === GlobalUserRoleEnum.ADMIN || role === GlobalUserRoleEnum.SUPERADMIN && <ListBox.Item href={'/account/statistics'} textValue={'Статистика'}>
                    <ChartColumn/>
                    Статистика
                </ListBox.Item>}
                {role === GlobalUserRoleEnum.SUPERADMIN && <ListBox.Item href={'/account/food-and-drinks'} textValue={'Заклад'}>
                    <ListUl/>
                    Усі заклади
                </ListBox.Item>}
                {role === GlobalUserRoleEnum.SUPERADMIN && <ListBox.Item href={'/account/users'} textValue={'Заклад'}>
                    <Persons/>
                    Усі користувачі
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