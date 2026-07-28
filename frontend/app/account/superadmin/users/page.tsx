import type {Metadata} from "next";
import AllUsersView from "@/src/components/views/superadmin/AllUsersView";
import {superadminUsersService} from "@/src/services/superadmin-users.service";
import {redirect} from "next/navigation";
import {getAccessCookie} from "@/src/services/server.service";
import {
  userQueryValidator,
  userQueryValidatorType,
} from "@/src/validators/user/user-query-validator";
import {UserSearchByEnum} from "@/src/enums/user/user-search-by.enum";

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
    const {search, searchBy = UserSearchByEnum.NAME, ...restAwaitedParams} = value as userQueryValidatorType
    const accessCookie = await getAccessCookie()
    const query = (search && searchBy) ? {...restAwaitedParams, [searchBy]: search} : restAwaitedParams
    const response = await superadminUsersService.find(query, {headers: {'Cookie': accessCookie}})
    if(!response.success){
        return <div>{response.data.message}</div>
    }
    return <AllUsersView users={response.data} page={restAwaitedParams.page} limit={restAwaitedParams.limit} searchBy={searchBy}/>
}

export default UsersPage;