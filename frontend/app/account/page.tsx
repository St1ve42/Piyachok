import Profile from "@/src/components/views/account/profile/Profile";
import {getUserFromHeaders} from "@/src/services/server.service";

const AccountPage = async () => {
    const user = await getUserFromHeaders()
    return <Profile user={user} type={'user'}/>
}

export default AccountPage