import Profile from "@/src/components/features/account/profile/Profile";
import {getUserFromHeaders} from "@/src/services/server.service";

const AccountPage = async () => {
    const user = await getUserFromHeaders()
    return <Profile user={user}/>
}

export default AccountPage