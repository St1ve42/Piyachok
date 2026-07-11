import {Metadata} from "next";
import MyReviews from "@/src/components/views/account/MyReviews";
import { FC } from "react";
import {redirect} from "next/navigation";

export const metadata: Metadata = {
    title: 'Мої відгуки'
}

type PropsType = {
    searchParams: Promise<{page?: string}>,
}

const ReviewsPage: FC<PropsType> = async ({ searchParams }) => {
    let { page = 1} = await searchParams;
    page = Number(page);
    if (isNaN(page) || page < 1) {
    redirect("/account/reviews");
    }
    return <MyReviews page={page} />;
};

export default ReviewsPage