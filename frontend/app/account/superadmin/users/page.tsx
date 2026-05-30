import type {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Усі користувачі'
};

type Props = {
    params: Promise<unknown>,
    searchParams: Promise<unknown>
}

const UsersPage = async ({params, searchParams}: Props) => {
    return (
        <div>
            Users
        </div>
    );
}

export default UsersPage;