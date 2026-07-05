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
import {UserSearchByEnum} from "@/src/enums/user/user.search.by";

type PropsType = {
    users: IUserListData
    page: number
    limit: number
    searchBy: UserSearchByEnum
}

const Users: FC<PropsType> = ({users, page, limit, searchBy}) => {
    const {data, total, totalPages} = users
    if((page > totalPages && totalPages !== 0) || limit > 20){
      redirect('')
    }
    return (
        <section className="flex flex-col gap-4 h-full">
            <Heading level={3}>Усі користувачі</Heading>
            <Heading level={5}>Знайдено: {total}</Heading>
            <div className="flex justify-between">
              <Limit currentLimit={limit}/>
              <div className="flex gap-3 items-center">
                <UserSort/>
                <UserFilter/>
                <UsersSearch searchBy={searchBy}/>
              </div>
            </div>
            {data.length !== 0 ? <div className="grid grid-cols-3 gap-4 mb-3">
                {data.map(user => <UserCard key={user.id} user={user}/>)}
            </div> : <NoResults/>}
            {totalPages > 1 && <PaginationWithEclipses totalPages={totalPages} currentPage={page}/>}
        </section>
    )
}

export default Users