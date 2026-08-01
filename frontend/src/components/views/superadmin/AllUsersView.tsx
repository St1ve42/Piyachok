import {FC} from "react";
import {IUserListData} from "@/src/interfaces/users/IUserListData";
import UserCard from "@/src/components/features/users/card/UserCard";
import PaginationWithEclipses from "@/src/components/shared/components/pagination/PaginationWithEclipses";
import {Heading} from "@heroui/react";
import UsersSearch from "@/src/components/features/users/search/UsersSearch";
import { redirect } from "next/navigation";
import Limit from "@/src/components/shared/components/limitation/Limit";
import UserSort from "@/src/components/features/users/sort/UserSort";
import NoResults from "@/src/components/shared/ui/NoResults";
import UserFilter from "@/src/components/features/users/filter/UserFilter";
import {UserSearchByEnum} from "@/src/enums/user/user-search-by.enum";
import {SortEnum} from "@/src/enums/shared/SortEnum";

type PropsType = {
    users: IUserListData
    page: number
    limit: number
    searchBy: UserSearchByEnum,
    initialSearch?: string,
    sortBy?: string,
    sort?: SortEnum
}

const AllUsersView: FC<PropsType> = ({users, page, limit, searchBy, sort, sortBy, initialSearch}) => {
    const {data, total, totalPages} = users
    if((page > totalPages && totalPages !== 0) || limit > 20){
      redirect('/account/superadmin/users')
    }
    return (
        <section className="flex flex-col gap-4 max-sm:gap-2 h-full">
            <Heading level={3} className="max-sm:text-lg">Усі користувачі</Heading>
            <Heading level={5} className="max-sm:text-base">Знайдено: {total}</Heading>
            <div className="flex flex-col md:flex-row justify-between gap-3 max-sm:gap-2">
              <Limit currentLimit={limit}/>
              <div className="flex flex-wrap gap-3 max-sm:gap-2 items-center">
                <UserSort initialSort={sort} initialSortBy={sortBy}/>
                <UserFilter searchBy={searchBy}/>
                <UsersSearch initialSearch={initialSearch}/>
              </div>
            </div>
            {data.length !== 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-sm:gap-2 mb-3">
                {data.map(user => <UserCard key={user.id} user={user}/>)}
            </div> : <NoResults isButtonClearFilters={false}/>}
            {totalPages > 1 && <PaginationWithEclipses totalPages={totalPages} currentPage={page}/>}
        </section>
    )
}

export default AllUsersView