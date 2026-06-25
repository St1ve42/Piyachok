"use client";

import { useCallback, useEffect, useState } from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import { Input, Pagination} from "@heroui/react";

type PropsType = {
    totalPages: number,
    currentPage: number
}

function PaginationWithEclipses({totalPages, currentPage}: PropsType) {
    const [page, setPage] = useState(1);
    const [inputPageValue, setInputPageValue] = useState<string>(`${currentPage}`)
    console.log('Input page value: ', inputPageValue)
    console.log('Current page value: ', currentPage)
    const router = useRouter();
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

    useEffect(() => {
        setInputPageValue(currentPage.toString())
    }, [currentPage]);

    useEffect(() => {
      const timer = setTimeout(() => router.push(pathname + '?' + createQueryString('page', inputPageValue), {scroll: false}), 500)
      return () => clearTimeout(timer)
    }, [inputPageValue]);

    const getPageNumbers = () => {
        const pages: (number | "ellipsis")[] = [];

        pages.push(1);

        if (page > 3) {
            pages.push("ellipsis");
        }

        const start = Math.max(2, page - 1);
        const end = Math.min(totalPages - 1, page + 1);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (page < totalPages - 2) {
            pages.push("ellipsis");
        }

        pages.push(totalPages);

        return pages;
    };


    return (
        <div className="w-full max-w-2xs sm:max-w-full mb-5">
            <Pagination className="justify-center">
                <div className="flex items-center gap-3">
                  <p>Сторінка: </p>
                  <Input value={inputPageValue} type='text' className="w-[40px] h-[30px]" onChange={(e) => setInputPageValue(e.target.value)}/>
                  <p>з</p>
                  <p>{totalPages}</p>
                </div>
                <Pagination.Content>
                    <Pagination.Item>
                        <Pagination.Previous isDisabled={page === 1} onPress={() => setPage((p) => p - 1)} onClick={() => router.push(pathname + '?' + createQueryString('page', `${page-1}`), {scroll: false})
                        }>
                            <Pagination.PreviousIcon />
                        </Pagination.Previous>
                    </Pagination.Item>
                    {getPageNumbers().map((p, i) =>
                        p === "ellipsis" ? (
                            <Pagination.Item key={`ellipsis-${i}`}>
                                <Pagination.Ellipsis />
                            </Pagination.Item>
                        ) : (
                            <Pagination.Item key={p}>
                                <Pagination.Link isActive={p === currentPage} onPress={() => setPage(p)} onClick={() => router.push(pathname + '?' + createQueryString('page', `${p}`), {scroll: false})}>
                                    {p}
                                </Pagination.Link>
                            </Pagination.Item>
                        ),
                    )}
                    <Pagination.Item>
                        <Pagination.Next isDisabled={page === totalPages} onPress={() => setPage((p) => p + 1)} onClick={() => router.push(pathname + '?' + createQueryString('page', `${page+1}`), {scroll: false})}>
                            <Pagination.NextIcon />
                        </Pagination.Next>
                    </Pagination.Item>
                </Pagination.Content>
            </Pagination>
        </div>
    );
}
export default PaginationWithEclipses