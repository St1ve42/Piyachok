import type {Metadata} from "next";
import {superadminUsersService} from "@/src/services/superadmin-users.service";
import {notFound} from "next/navigation";
import ProfileView from "@/src/components/views/account/profile/ProfileView";
import {getAccessCookie} from "@/src/services/server.service";

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const { id } = await params;
    if (!id) {
        notFound();
    }
    const accessCookie = await getAccessCookie();
    const response = await superadminUsersService.findById(id, {headers: {'Cookie': accessCookie}})
    return {
        title: response.success ? response.data.name + ' ' + response.data.surname : 'Користувач',
    };
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
    if(!response.success && (response.status === 404 || response.status === 400)){
        notFound()
    }
    if(!response.success){
        return <div>{response.data.message}</div>
    }
    return <ProfileView user={response.data} type={'superadmin'} id={id}/>
}

export default UserByIdPage;