"use client"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const paginator: React.FC<{ totalPages: number, query: string, category: string, getContent: Function }> = ({ totalPages, query, category, getContent }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pageNumber = searchParams.get("page") as string;
    const [firstMount , setFirstMount] = useState<boolean>(false)

    const changePageNumber = async (page: number) => {
        router.push(`/search?query=${query}&category=${category.toLocaleLowerCase()}&page=${page}`);
    };

    useEffect(() => {
        if(firstMount == true){
            getContent();
        }else{
            setFirstMount(true)
        }
    }, [pageNumber])

    const maxVisibleButtons = 10; 
    const currentPage = parseInt(pageNumber);

    const startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return (
        <div className="flex gap-2 flex-wrap items-center">
            <button
                className="px-3 py-1 h-10 bg-gray-700 text-white rounded-sm cursor-pointer disabled:opacity-50"
                onClick={() => currentPage > 1 && changePageNumber(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &#8592;
            </button>

            {startPage > 1 && (
                <>
                    <div
                        className="w-10 h-10 rounded-sm flex justify-center items-center bg-gray-800 text-white cursor-pointer"
                        onClick={() => changePageNumber(1)}
                    >
                        1
                    </div>
                    <span className="text-white">...</span>
                </>
            )}

            {pageNumbers.map((page) => (
                <div
                    key={page}
                    style={{ background: currentPage === page ? "#180E39" : "#1E293B" }}
                    className="w-10 h-10 rounded-sm flex justify-center items-center cursor-pointer"
                    onClick={() => changePageNumber(page)}
                >
                    {page}
                </div>
            ))}

            {endPage < totalPages && (
                <>
                    <span className="text-white">...</span>
                    <div
                        className="w-10 h-10 rounded-sm flex justify-center items-center bg-gray-800 text-white cursor-pointer"
                        onClick={() => changePageNumber(totalPages)}
                    >
                        {totalPages}
                    </div>
                </>
            )}

            <button
                className="px-3 py-1 h-10 bg-gray-700 text-white rounded-sm cursor-pointer disabled:opacity-50"
                onClick={() => currentPage < totalPages && changePageNumber(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &#8594;
            </button>
        </div>
    );
}

export default paginator