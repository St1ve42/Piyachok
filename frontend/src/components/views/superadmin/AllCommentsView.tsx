import {getAccessCookie} from "@/src/services/server.service";
import {Heading} from "@heroui/react";
import PaginationWithEclipses from "@/src/components/shared/components/pagination/PaginationWithEclipses";
import {FC} from "react";
import Limit from "@/src/components/shared/components/limitation/Limit";
import {IQueryComments} from "@/src/validators/comments/query-comments.validator";
import {CommentSearchByEnum} from "@/src/enums/comments/CommentSearchByEnum";
import {superadminCommentsService} from "@/src/services/superadmin-comments.service";
import CommentSearch from "@/src/components/features/comments/CommentSearch";
import CommentSuperadminCard from "@/src/components/features/comments/CommentSuperadminCard";
import CommentSort from "@/src/components/features/comments/CommentSort";
import Filter from "@/src/components/shared/components/filter/Filter";
import {CommentSearchByTranslation} from "@/src/constants/comment-search-by.translation";
import NoResults from "@/src/components/shared/ui/NoResults";

type PropsType = {
    searchParams: IQueryComments
}

const AllCommentsView: FC<PropsType> = async ({searchParams}) => {
    const {page = 1, sort, sortBy, limit} = searchParams
    const {search, searchBy = CommentSearchByEnum.TEXT, ...restSearchParams} = searchParams
    const accessCookie = await getAccessCookie()
    const comments = await superadminCommentsService.find({...restSearchParams, [searchBy]: search}, accessCookie)
    if(!comments.success){
        return <div>{comments.data.message}</div>
    }
    const {total, totalPages} = comments.data
    return (
        <section className="flex flex-col gap-3 max-sm:gap-2 pr-15 max-sm:pr-0">
            <Heading level={3} className="max-sm:text-lg">Усі коментарі</Heading>
            <Heading level={5} className="max-sm:text-base">Знайдено: {total}</Heading>
            <div className="flex flex-col gap-3 max-sm:gap-2">
                <div className="flex flex-wrap justify-end items-center gap-2 max-sm:gap-1 max-[500px]:flex-col max-[500px]:items-stretch max-[500px]:gap-1">
                    <div className="max-[500px]:w-full max-[500px]:mb-2"><Limit currentLimit={limit}/></div>
                    <div className="max-[500px]:w-full"><CommentSort initialSortValue={sort} initialSortByValue={sortBy}/></div>
                    <div className="flex items-center gap-3">
                        <div className="max-[500px]:w-full"><Filter searchByEnum={CommentSearchByEnum} searchByTranslation={CommentSearchByTranslation} initialSearchByValue={searchBy}/></div>
                        <div className="max-[500px]:w-full"><CommentSearch searchBy={searchBy} initialSearch={search}/></div>
                    </div>
                </div>
                {comments.data.data.length > 0 ? <div className="flex flex-col gap-3 max-sm:gap-2 mb-3">
                    {comments.data.data.map(comment => <CommentSuperadminCard key={comment.id} comment={comment}/>)}
                </div> : <NoResults isButtonClearFilters={false}/>}
            </div>
            {totalPages > 1 && <PaginationWithEclipses totalPages={totalPages} currentPage={page}/>}
        </section>
    )
}

export default AllCommentsView