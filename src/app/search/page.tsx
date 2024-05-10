"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import MovieTile from "@/components/movietile";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  //Query Params
  const query = searchParams.get("query");
  const categoryQuery:string = searchParams.get("category") as string;

  //States
  const [data, setData] = useState<any>(null);

  const categories = ["Movie", "TV", "Person"];

  const categorySwitch = (category: string) => {
    router.push(`/search?query=${query}&category=${category}`);
  };

  const convertQueryToUrl = ():string => {
    if (!query) return "Query String is Required!";
    let newQuery = ""
    for(let i = 0 ; i < query?.length; i++){
      if(query[i] === " "){
        newQuery += "%20"
      }else{
        newQuery += query[i];
      }
    }

    return newQuery;
  }

    const fetchData = async () => {
    const queryString = convertQueryToUrl();
    const category = categoryQuery?.toLowerCase();
    const authToken = process.env.NEXT_PUBLIC_TMDB_AUTH;

    const headers =  {
      accept: 'application/json',
      Authorization: `Bearer ${authToken}`
    }
    const url = `https://api.themoviedb.org/3/search/${category}?query=${queryString}&include_adult=true&language=en-US&page=1&api_key=${authToken && authToken}`;
    try{
      const res = await axios.get(url, {headers});
      setData(res?.data)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData();
  }, [categoryQuery, query])

  console.log(data)

  return (
    <>
      <Header />
      <main className="pt-[15vh] pb-[19vh] grid grid-rows-[1fr, auto] lg:grid-cols-[20vw] items-start px-5 lg:px-0 lg:gap-y-16 gap-x-28 ">
        <h1 className=" justify-self-center row-span-1 col-span-2">
          Search Results for <b>{query}</b>.
        </h1>
        <div className=" lg:justify-self-end row-span-1 col-span-2 lg:col-span-1 bg-black lg:w-56 h-80 rounded-md overflow-hidden lg:mt-0 mt-10">
          <div className="bg-[#6D28D9] h-14 flex items-center pl-3">
            Search Results
          </div>
          {categories.map((category) => (
            <div
              key={category}
              onClick={() => categorySwitch(category)}
              className={`pl-3 mb-3 py-3 cursor-pointer text-sm ${
                category === categoryQuery && " bg-[#1F2937] "
              }`}
            >
              {category}
            </div>
          ))}
        </div>
        <div className=" col-span-2 lg:col-span-1 row-span-1 lg:w-[70%] rounded-md ">
            {data?.results.length === 0 && <h1>There is no {categoryQuery?.toLowerCase()} that matched your query</h1>}
            {
              data?.results.map((show : any) => {
                return <MovieTile data={show} category = {categoryQuery} />
              })
            }

        </div>
      </main>
      <Footer />
    </>
  );
};

export default Search;
