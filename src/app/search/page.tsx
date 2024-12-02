"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import MovieTile from "@/components/movietile";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Paginator from "@/components/paginator";



const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  //Query Params
  const query = searchParams.get("query");
  const categoryQuery: string = searchParams.get("category") as string;
  const pageNumber = searchParams.get("page");

  //States
  const [data, setData] = useState<any>(null);

  const categories = ["Movie", "TV", "Person"];

  const categorySwitch = (category: string) => {
    router.push(`/search?query=${query}&category=${category.toLocaleLowerCase()}&page=1`);
  };

  const convertQueryToUrl = (): string => {
    if (!query) return "Query String is Required!";
    let newQuery = ""
    for (let i = 0; i < query?.length; i++) {
      if (query[i] === " ") {
        newQuery += "%20"
      } else {
        newQuery += query[i];
      }
    }

    return newQuery;
  }

  const fetchData = async () => {
    const queryString = convertQueryToUrl();
    const category = categoryQuery?.toLowerCase();
    const authToken = process.env.NEXT_PUBLIC_TMDB_AUTH;

    const headers = {
      accept: 'application/json',
      Authorization: `Bearer ${authToken}`
    }
    const url = `https://api.themoviedb.org/3/search/${category}?query=${queryString}&include_adult=true&language=en-US&page=${pageNumber}&api_key=${authToken && authToken}`;
    try {
      const res = await axios.get(url, { headers });
      console.log("fetchedData", res)
      setData(res?.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData();
  }, [categoryQuery, query])


  return (
    <>
      <main className="pt-[15vh] pb-[19vh] items-start px-5 lg:px-0 lg:gap-y-16 gap-x-28 w-[98%] min-h-[78vh]">
        <div className="lg:w-[75%] w-full justify-self-end md:flex justify-between">
          <h1 className="md:mb-10 mb-2">
            Search Results for <b>{query}</b>.
          </h1>
          <p className="md:mb-10 text-sm">
            Total Results - {data?.total_results}
          </p>
        </div>
        <div className=" bg-black lg:w-[20vw] lg:h-80 rounded-sm overflow-hidden lg:mt-0 mt-5 lg:fixed left-10">
          <div className="bg-[#6D28D9] py-4 text-sm flex items-center pl-3">
            Select Category
          </div>
          {categories.map((category) => (
            <div
              key={category}
              onClick={() => categorySwitch(category)}
              className={`pl-3 py-4 cursor-pointer text-sm hover:bg-[#1F2937] transition-all 1s ${category.toLocaleLowerCase() === categoryQuery && " bg-[#1F2937] "
                }`}
            >
              {category}
            </div>
          ))}
        </div>

        <div className=" lg:justify-self-end lg:w-[75%] w-full rounded-md mt-10 lg:mt-0 ">
          {data?.results.length === 0 && <h1>There is no {categoryQuery?.toLowerCase()} that matched your query.</h1>}
          {
            data?.results.map((show: any) => {
              return <MovieTile data={show} category={categoryQuery} />
            })
          }
          <Paginator totalPages={data?.total_pages} query={query as string} category={categoryQuery} getContent={fetchData} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Search;
