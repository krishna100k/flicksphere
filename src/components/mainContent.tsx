"use client"

import Slider from "@/components/slider";
import { useEffect, useState } from "react";
import axios from "axios";

const MainContent:React.FC<any> = ({trendingMovies}) => {

    const apiKey = process.env.NEXT_PUBLIC_TMDB_AUTH;
    const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`

    const [data, setData] = useState<any>();

    useEffect(()=>{
        const fetchData = async () => {
            if(trendingMovies?.results?.length === 0){
                const res = await axios.get(url);
                setData(res?.data)
                trendingMovies = data;
            }
        }

        fetchData();
    }, [])

    const movieData = trendingMovies?.results.length > 0 ? trendingMovies : data

  return (
    <main className="pt-[6.5vh]">
      <Slider movieData={movieData} />
    </main>
  );
};

export default MainContent;
