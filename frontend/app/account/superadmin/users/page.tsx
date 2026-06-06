import type {Metadata} from "next";
import Users from "@/src/components/views/superadmin/users/Users";
import {superadminUsersService} from "@/src/services/superadmin-users.service";
import {redirect} from "next/navigation";
import {getAccessCookie} from "@/src/services/server.service";

export const metadata: Metadata = {
    title: 'Усі користувачі'
};

type Props = {
    searchParams: Promise<Record<'page' | 'nameAndSurname' | 'limit', string | undefined>>
}

const UsersPage = async ({searchParams}: Props) => {
    let {page = 1, nameAndSurname = '', limit = 20} = await searchParams
    page = Number(page)
    limit = Number(limit)
    if(page < 1 || Number.isNaN(page) || limit < 1 || Number.isNaN(limit)){
        redirect('/account/superadmin/users')
    }
    const [name, surname] = nameAndSurname.split(' ')
    const accessCookie = await getAccessCookie()
    const response = await superadminUsersService.find({page, limit, name, surname}, {headers: {'Cookie': accessCookie}})
    if(!response.success){
        return <div>{response.data.message}</div>
    }
    return <Users users={response.data} page={page} limit={limit}/>
}

export default UsersPage;