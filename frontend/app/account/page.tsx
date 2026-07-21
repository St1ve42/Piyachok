import ProfileView from "@/src/components/views/account/profile/ProfileView";
import {getUserFromHeaders} from "@/src/services/server.service";

const AccountPage = async () => {
    const user = await getUserFromHeaders()
    return <ProfileView user={user} type={'user'}/>
}

export default AccountPage