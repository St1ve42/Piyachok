import {Header, ListBox} from "@heroui/react";
import React from "react";

const Sidebar = () => {
    return (
        <section className="w-[30%] h-fit border-2 rounded-2xl">
            <Header className="text-xl text-black bg-[#EA148C] rounded-t-2xl pl-3">Особистий кабінет</Header>
            <ListBox aria-label={'бокова панель'}>
                <ListBox.Item href={'/account'} textValue={'Профіль'}>Профіль</ListBox.Item>
                <ListBox.Item href={'/account/favourites'} textValue={'Улюблені'}>Уподобання</ListBox.Item>
                <ListBox.Item href={'/account/comments'} textValue={'Коментарі'}>Коментарі</ListBox.Item>
                <ListBox.Item href={'/account/reviews'} textValue={'Відгуки'}>Відгуки</ListBox.Item>
                <ListBox.Item href={'/account/food-and-drink'} textValue={'Заклад'}>Заклад</ListBox.Item>
                <ListBox.Item href={'/account/statistics'} textValue={'Статистика'}>Статистика</ListBox.Item>
            </ListBox>
        </section>
    )
}

export default Sidebar