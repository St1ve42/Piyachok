import {getAccessCookie} from "@/src/services/server.service";
import Link from "next/link";
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
import {CommentSearchByTranslation} from "@/src/constants/CommentSearchByTranslation";

type PropsType = {
    searchParams: IQueryComments
}

const AllComments: FC<PropsType> = async ({searchParams}) => {
    const {page = 1, sort, sortBy, limit} = searchParams
    const {search, searchBy, ...restSearchParams} = searchParams
    const accessCookie = await getAccessCookie()
    const searchObj = searchBy ? {[searchBy]: search} : {[CommentSearchByEnum.TEXT]: search}
    const comments = await superadminCommentsService.find({...restSearchParams, ...searchObj}, accessCookie)
    if(!comments.success){
        return <div>{comments.data.message}</div>
    }
    const {total, totalPages} = comments.data
    const filterAndSortComponent = <div className="flex justify-end items-center gap-2">
        <Limit currentLimit={limit}/>
        <CommentSort initialSortValue={sort} initialSortByValue={sortBy}/>
        <Filter searchByEnum={CommentSearchByEnum} searchByTranslation={CommentSearchByTranslation}/>
        <CommentSearch searchBy={searchBy}/>
    </div>
    const emptyDataComponent = searchBy || search ? <div className="flex flex-col gap-2">
        {filterAndSortComponent}
        <div className="flex flex-col">
            <p>За Вашим фільтром коментарів не знайдено.</p>
            <Link className="text-blue-600" href={`/account/superadmin/reviews`} scroll={false}>Скинути фільтри</Link>
        </div>
    </div> : <div>Коментарів немає</div>
    return (
        <section className="flex flex-col gap-3 pr-15">
            <Heading level={3}>Усі коментарі</Heading>
            <Heading level={5}>Знайдено: {total}</Heading>
            {comments.data.data.length > 0 ?
                <div className="flex flex-col gap-3">
                    {filterAndSortComponent}
                    <div className="flex flex-col gap-3 mb-3">
                        {comments.data.data.map(comment => <CommentSuperadminCard key={comment.id} comment={comment}/>)}
                    </div>
                </div> : emptyDataComponent}
            {totalPages > 1 && <PaginationWithEclipses totalPages={totalPages} currentPage={page}/>}
        </section>
    )
}

export default AllComments