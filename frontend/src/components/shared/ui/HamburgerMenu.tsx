'use client'
import {Button, Dropdown} from "@heroui/react";
import {ListUl} from "@gravity-ui/icons"
import Link from "next/link";

const HamburgerMenu = () => {
    return (
        <Dropdown className="lg:hidden">
            <Button className="lg:hidden"><ListUl/></Button>
            <Dropdown.Trigger/>
            <Dropdown.Popover>
                <Dropdown.Menu>
                    <Dropdown.Item>
                        <Link href="/">Головна</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link href="/top-food-and-drinks">Топ закладів</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link href="/piyachok">Пиячок</Link>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    )
}

export default HamburgerMenu