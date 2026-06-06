import type {Metadata} from "next";
import {superadminUsersService} from "@/src/services/superadmin-users.service";
import {notFound} from "next/navigation";
import Profile from "@/src/components/features/account/profile/Profile";
import {getAccessCookie} from "@/src/services/server.service";

export const metadata: Metadata = {
    title: 'Користувач за айді'
};

type Props = {
    params: Promise<Record<'id', string | undefined>>,
}

const UserByIdPage = async ({params}: Props) => {
    const {id} = await params
    if(!id){
        notFound()
    }
    const accessCookie = await getAccessCookie()
    const response = await superadminUsersService.findById(id, {headers: {'Cookie': accessCookie}})
    if(!response.success && response.status === 404){
        notFound()
    }
    if(!response.success){
        return <div>{response.data.message}</div>
    }
    return <Profile user={response.data} type={'superadmin'} id={id}/>
}

export default UserByIdPage;