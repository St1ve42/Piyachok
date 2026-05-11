'use client'
import {Tab, TabIndicator, TabList, TabListContainer, TabsRoot} from "@heroui/react";
import {usePathname} from "next/navigation";

const TabMenu = () => {
    const pathname = usePathname()
    const selectedKey = pathname === '/news' ? 'news' : 'food-and-drink'
    return <div className="w-full">
        <TabsRoot selectedKey={selectedKey}>
            <TabListContainer>
                <TabList aria-label="Options">
                    <Tab id="food-and-drink" key="food-and-drink" href={'/'}>
                        Заклади
                        <TabIndicator />
                    </Tab>
                    <Tab id="news" key="news" href={'/news'}>
                         Новини
                        <TabIndicator/>
                    </Tab>
                </TabList>
            </TabListContainer>
        </TabsRoot>
    </div>
}

export default TabMenu