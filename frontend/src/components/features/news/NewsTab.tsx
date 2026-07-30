'use client'
import {Tab, TabIndicator, TabList, TabListContainer, Tabs,} from "@heroui/react";
import Link from "next/link";
import {FC} from "react";
import {NewsCategoryEnum} from "@/src/enums/news/news-category.enum";

type PropsType = {
    href?: string,
    activeCategory?: NewsCategoryEnum
}

const NewsTab: FC<PropsType> = ({href = '/news', activeCategory}) => {
    return <div className="w-full mb-2">
        <Tabs selectedKey={activeCategory ?? NewsCategoryEnum.GENERAL}>
            <TabListContainer>
                <TabList aria-label="Options" className="bg-white [&_a]:text-black">
                    <Tab id="general" key="general">
                        <Link href={href} className="w-full">
                            Загальні
                            <TabIndicator />
                        </Link>
                    </Tab>
                    <Tab id="sale" key="sale">
                        <Link href={{pathname: href, query: 'category=sale'}} className="w-full">
                            Акційні
                            <TabIndicator />
                        </Link>
                    </Tab>
                    <Tab id="event" key="event">
                        <Link href={{pathname: href, query: 'category=event'}} className="w-full">
                            Події
                            <TabIndicator />
                        </Link>
                    </Tab>
                </TabList>
            </TabListContainer>
        </Tabs>
    </div>
}

export default NewsTab