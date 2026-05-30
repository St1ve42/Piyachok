import type {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Усі заклади'
};

type Props = {
    params: Promise<unknown>,
    searchParams: Promise<unknown>
}

const SuperadminFoodAndDrinksPage = async ({params, searchParams}: Props) => {
    return (
        <div>
            Усі заклади
        </div>
    );
}

export default SuperadminFoodAndDrinksPage;