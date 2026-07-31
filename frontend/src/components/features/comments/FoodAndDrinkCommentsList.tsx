'use client'

import useCommentInfinityQuery from "@/src/hooks/tanstack-query/useCommentInfinityQuery";
import { FC, useEffect } from "react";
import CommentCard from "@/src/components/features/comments/CommentCard";
import {useInView} from "react-intersection-observer";
import {IUser} from "@/src/interfaces/users/IUser";

type PropsType = {
    foodAndDrinkId: string,
    user: IUser | null,
    isOwner: boolean | null
}

const FoodAndDrinkCommentsList: FC<PropsType> = ({foodAndDrinkId, user, isOwner}) => {
    const {data, hasNextPage, fetchNextPage} = useCommentInfinityQuery({foodAndDrinkId, query: {limit: 10}})
    let total: number = 0;
    const comments = data?.pages.flatMap(page => {
        const {success, data} = page
        if(success){
            if(!total){
                total = data.total
            }
            return data.data
        }
    })
    const {inView, ref} = useInView()
    useEffect(() => {
        if(inView && hasNextPage){
            fetchNextPage().then(r => r)
        }
    }, [inView, hasNextPage, fetchNextPage])
    return (
        comments && (comments.length > 0 ? <div className="flex flex-col gap-2 mb-5">
            {comments.map((comment, index) => {
                if(comment){
                    return <CommentCard key={comment.id} ref={index === comments.length - 2 ? ref : undefined} comment={comment} user={user} isOwner={isOwner} foodAndDrinkId={foodAndDrinkId}/>
                }
            })}
        </div> : <p className="mb-5">На цей момент коментарів немає. Будьте першим, хто їх залишить.</p>)
    )
}

export default FoodAndDrinkCommentsList