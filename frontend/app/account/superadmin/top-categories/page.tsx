import type { Metadata } from "next";
import TopCategoriesView from "@/src/components/views/superadmin/TopCategoriesView";

export const metadata: Metadata = {
  title: "Топ категорії",
};

type Props = {
    searchParams: Promise<unknown>;
};

const TopCategoriesPage = async ({ searchParams }: Props) => {
    return <TopCategoriesView/>
};

export default TopCategoriesPage;
