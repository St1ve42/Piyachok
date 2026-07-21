'use client'
import {
    Tab,
  TabIndicator,
  TabList,
  TabListContainer,
  TabsRoot,
} from "@heroui/react";
import Link from "next/link";
import {FC} from "react";

type PropsType = {
    href?: string
}

const NewsTab: FC<PropsType> = ({href = '/news'}) => {
    return <div className="w-full mb-2">
        <TabsRoot>
            <TabListContainer>
                <TabList aria-label="Options">
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
        </TabsRoot>
    </div>
}

export default NewsTab