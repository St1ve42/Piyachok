"use client";
import Search from "@/src/components/shared/components/search/Search";
import { FC, ReactNode } from "react";
import { ListBox } from "@heroui/react";
import { CommentSearchByEnum } from "@/src/enums/comments/CommentSearchByEnum";
import {ICommentWithUserAndFoodAndDrink} from "@/src/interfaces/comments/ICommentWithUserAndFoodAndDrink";
import {superadminCommentsService} from "@/src/services/superadmin-comments.service";

type PropsType = {
  searchBy?: CommentSearchByEnum;
};

const CommentSearch: FC<PropsType> = ({ searchBy = CommentSearchByEnum.TEXT }) => {
  const mapCallback: (comment: ICommentWithUserAndFoodAndDrink) => ReactNode = (
    comment,
  ) => {
    let search
    switch (searchBy) {
        case CommentSearchByEnum.FOOD_AND_DRINK_NAME:
            search = comment["foodAndDrink"]["name"];
            break
        case CommentSearchByEnum.USER_NAME:
            search = comment["user"]["name"];
            break
        default:
            search = comment[searchBy]
    }
    return (
        <ListBox.Item key={comment.id} id={search} textValue={search}>
          {search}
        </ListBox.Item>
      );
  };
  const findCommentsHandler = async (query?: any) => {
    return superadminCommentsService.find(query);
  };

  return (
    <Search<ICommentWithUserAndFoodAndDrink>
      searchBy={searchBy}
      queryKey={"comments"}
      queryFn={findCommentsHandler}
      mapCallback={mapCallback}
      notFoundMessage={'Коментарів немає'}
    />
  );
};

export default CommentSearch;