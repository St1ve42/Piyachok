import Link from "next/link";

const MenuComponent = () => {
    return (
        <ul className="flex gap-10">
            <li>
                <Link href="/">Головна</Link>
            </li>
            <li>
                <Link href="/top-food-and-drink">Топ закладів</Link>
            </li>
            <li>
                <Link href="/piyachok">Пиячок</Link>
            </li>
        </ul>
    )
}

export default MenuComponent