"use client";

import {useCallback, useEffect, useState } from "react";
import { Input, Pagination } from "@heroui/react";
import {useURL} from "@/src/hooks/shared/useURL";

type PropsType = {
    totalPages: number,
    currentPage?: number,
    isPageInput?: boolean
}

function PaginationWithEclipses({totalPages, currentPage = 1, isPageInput = true}: PropsType) {
    const [page, setPage] = useState(1);
    const [inputPageValue, setInputPageValue] = useState<string>(`${currentPage}`)
    const {router, createQueryString, pathname} = useURL()

    useEffect(() => {
        setInputPageValue(currentPage.toString())
    }, [currentPage]);

    const addPageQuery = useCallback((page: string) => {
        if(page === '1'){
            router.push(pathname + '?' + createQueryString('page', undefined, 'delete'), {scroll: false})
        }
        else{
            router.push(pathname + '?' + createQueryString('page', page), {scroll: false})
        }
    }, [])

    useEffect(() => {
      const timer = setTimeout(() => {
          if(inputPageValue === '1'){
              router.push(pathname + '?' + createQueryString('page', undefined, 'delete'), {scroll: false})
          }
          else{
              router.push(pathname + '?' + createQueryString('page', inputPageValue), {scroll: false})
          }
      }, 500)
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
            <Pagination className="justify-center flex  max-md:items-center max-md:flex-col">
                {isPageInput && <div className="flex items-center gap-3 max-sm:self-center">
                  <p>Сторінка: </p>
                  <Input value={inputPageValue} type='text' className="w-[40px] h-[30px]" onChange={(e) => setInputPageValue(e.target.value)}/>
                  <p>з</p>
                  <p>{totalPages}</p>
                </div>}
                <Pagination.Content className="max-sm:self-center">
                    <Pagination.Item>
                        <Pagination.Previous isDisabled={page === 1} onPress={() => setPage((p) => p - 1)} onClick={() => addPageQuery(`${page-1}`)
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
                                <Pagination.Link isActive={p === currentPage} onPress={() => setPage(p)} onClick={() => addPageQuery(`${p}`)}>
                                    {p}
                                </Pagination.Link>
                            </Pagination.Item>
                        ),
                    )}
                    <Pagination.Item>
                        <Pagination.Next isDisabled={page === totalPages} onPress={() => setPage((p) => p + 1)} onClick={() => addPageQuery(`${page+1}`)}>
                            <Pagination.NextIcon />
                        </Pagination.Next>
                    </Pagination.Item>
                </Pagination.Content>
            </Pagination>
        </div>
    );
}
export default PaginationWithEclipses