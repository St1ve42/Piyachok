import {Heading} from "@heroui/react";
import {userService} from "@/src/services/users.service";
import {getAccessCookie} from "@/src/services/server.service";
import CommentUserCard from "@/src/components/features/comments/CommentUserCard";
import PaginationWithEclipses from "@/src/components/shared/components/pagination/PaginationWithEclipses";
import {FC, JSX} from "react";
import NoResults from "@/src/components/shared/ui/NoResults";

type PropsType = {
    page: number
}

const MyComments: FC<PropsType> = async ({page}) => {
    const accessCookie = await getAccessCookie()
    const {success, data} = await userService.findMyComments({page}, accessCookie)
    let total: number = 0
    let totalPages: number = 0
    let listMarkup: JSX.Element
    if(success){
        total = data.total
        totalPages = data.totalPages
        const comments = data.data
        listMarkup = comments.length > 0 ? <div className="flex flex-col gap-3 mb-3">
            {comments.map(comment => <CommentUserCard comment={comment} key={comment.id}/>)}
        </div> : <div className="mt-5"><NoResults text={'Почніть писати коментарі!'}/></div>
    }
    else{
        listMarkup = <div>data.message</div>
    }
    return (
      <section className="flex flex-col gap-3">
        <Heading level={3}>Мої коментарі</Heading>
        <Heading level={5}>Знайдено: {total}</Heading>
        {listMarkup}
        {totalPages > 1 && <PaginationWithEclipses totalPages={totalPages} currentPage={page}/>}
      </section>
    );
}

export default MyComments