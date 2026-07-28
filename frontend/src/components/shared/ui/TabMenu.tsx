'use client'
import {Tab, TabIndicator, TabList, TabListContainer, TabsRoot} from "@heroui/react";
import {usePathname} from "next/navigation";
import Link from "next/link";

const TabMenu = () => {
    const pathname = usePathname()
    const selectedKey = pathname === '/news' ? 'news' : 'food-and-drink'
    return <div className="w-[80vw]">
        <TabsRoot selectedKey={selectedKey} className="mb-2">
            <TabListContainer>
                <TabList aria-label="Options" className="bg-white *:h-7 *:px-3 *:text-sm *:font-normal [&_a]:tex-black">
                    <Tab id="food-and-drink" key="food-and-drink">
                        <Link href={'/'}>
                            Заклади
                            <TabIndicator/>
                        </Link>
                    </Tab>
                    <Tab id="news" key="news">
                        <Link href={'/news'}>
                             Новини
                            <TabIndicator/>
                        </Link>
                    </Tab>
                </TabList>
            </TabListContainer>
        </TabsRoot>
    </div>
    // <ListBox className="w-full flex flex-row text-center font-bold mb-2">
    //     <ListBox.Item>
    //         <Link href={'/'} className="w-full">
    //             Заклади
    //         </Link>
    //     </ListBox.Item>
    //     <ListBox.Item>
    //         <Link href={{pathname: '/news', query: 'category=sale'}} className="w-full">
    //             Новини
    //         </Link>
    //     </ListBox.Item>
    // </ListBox>
}

export default TabMenu