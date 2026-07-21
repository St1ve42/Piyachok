import {NewsCategoryEnum} from "@/src/enums/news/news-category.enum";
import {JSX} from "react";
import {Percent} from "@gravity-ui/icons";

export const newsIcons: Record<NewsCategoryEnum, JSX.Element> = {
    [NewsCategoryEnum.GENERAL]: <div>📢</div>,
    [NewsCategoryEnum.SALE]: <Percent/>,
    [NewsCategoryEnum.EVENT]: <div>📌</div>,
}