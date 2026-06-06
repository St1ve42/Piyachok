import {FC} from "react";
import {IUserListData} from "@/src/interfaces/users/IUserListData";
import UserCard from "@/src/components/features/superadmin/users/card/UserCard";
import PaginationWithEclipses from "@/src/components/ui/pagination/PaginationWithEclipses";
import {Heading} from "@heroui/react";
import UsersSearch from "@/src/components/features/superadmin/users/search/UsersSearch";
import { redirect } from "next/navigation";
import Limit from "@/src/components/ui/limitation/Limit";

type PropsType = {
    users: IUserListData
    page: number
    limit: number
}

const Users: FC<PropsType> = ({users, page, limit}) => {
    const {data, total, totalPages} = users
    if((page > totalPages && totalPages !== 0) || limit > 20){
      redirect('/account/superadmin/users')
    }
    return (
        <section className="flex flex-col gap-4">
            <Heading level={3}>Усі користувачі</Heading>
            <Heading level={5}>Знайдено: {total}</Heading>
            <div className="flex justify-between">
              <Limit currentLimit={limit}/>
              <div className="flex gap-3">
                <UsersSearch/>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-3">
                {data.map(user => <UserCard key={user.id} user={user}/>)}
            </div>
            {totalPages > 1 && <PaginationWithEclipses totalPages={totalPages} currentPage={page}/>}
        </section>
    )
}

export default Users