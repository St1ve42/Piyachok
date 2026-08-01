"use client";
import Search from "@/src/components/shared/components/search/Search";
import { FC } from "react";
import { CommentSearchByEnum } from "@/src/enums/comments/CommentSearchByEnum";

type PropsType = {
    searchBy?: CommentSearchByEnum;
    initialSearch?: string
};

const CommentSearch: FC<PropsType> = ({ initialSearch}) => {
  return (
    <Search
      initialValue={initialSearch}
    />
  );
};

export default CommentSearch;