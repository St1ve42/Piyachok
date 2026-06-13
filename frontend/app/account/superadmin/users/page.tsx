import type {Metadata} from "next";
import Users from "@/src/components/views/superadmin/users/Users";
import {superadminUsersService} from "@/src/services/superadmin-users.service";
import {redirect} from "next/navigation";
import {getAccessCookie} from "@/src/services/server.service";
import {IUsersQuery} from "@/src/interfaces/shared/IBaseQuery";
import {
  userQueryValidator,
  userQueryValidatorType,
} from "@/src/validators/user/user-query-validator";

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
    const {search, searchBy = 'name', ...restAwaitedParams} = value as userQueryValidatorType
    const accessCookie = await getAccessCookie()
    const query = (search && searchBy) ? {...restAwaitedParams, [searchBy]: search} : restAwaitedParams
    const response = await superadminUsersService.find(query, {headers: {'Cookie': accessCookie}})
    if(!response.success){
        return <div>{response.data.message}</div>
    }
    return <Users users={response.data} page={restAwaitedParams.page} limit={restAwaitedParams.limit} searchBy={searchBy}/>
}

export default UsersPage;