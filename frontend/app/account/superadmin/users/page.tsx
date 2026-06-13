import type {Metadata} from "next";
import Users from "@/src/components/views/superadmin/users/Users";
import {superadminUsersService} from "@/src/services/superadmin-users.service";
import {redirect} from "next/navigation";
import {getAccessCookie} from "@/src/services/server.service";
import {IUsersQuery} from "@/src/interfaces/shared/IBaseQuery";
import {userQueryValidator} from "@/src/validators/user/user-query-validator";

export const metadata: Metadata = {
    title: 'Усі користувачі'
};

type Props = {
    searchParams: Promise<Record<'page' | 'nameAndSurname' | 'limit' | 'sortBy' | 'searchBy', string | undefined> & {sort?: 'asc' | 'desc'}>
}

const UsersPage = async ({searchParams}: Props) => {
    const awaitedSearchParams = await searchParams
    const {error, value} = userQueryValidator.validate(awaitedSearchParams)
    if(error){
      redirect("/account/superadmin/users");
    }
    const {nameAndSurname, searchBy, ...restAwaitedParams} = value as Omit<IUsersQuery, 'name' | 'surname'> & {nameAndSurname?: string, searchBy?: string}
    const [name, surname] = nameAndSurname ? nameAndSurname.split(' ') : [undefined, undefined]
    const accessCookie = await getAccessCookie()
    const response = await superadminUsersService.find({...restAwaitedParams, name, surname}, {headers: {'Cookie': accessCookie}})
    if(!response.success){
        return <div>{response.data.message}</div>
    }
    return <Users users={response.data} page={restAwaitedParams.page ?? 1} limit={restAwaitedParams.limit ?? 20}/>
}

export default UsersPage;