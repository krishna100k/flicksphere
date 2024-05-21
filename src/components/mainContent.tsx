"use client"

import Slider from "@/components/slider";
import { useEffect, useState } from "react";
import axios from "axios";
import TrendingMovies from "./trendingMovies";

const MainContent:React.FC<any> = ({trendingMovies, trendingSeries}) => {

    const apiKey = process.env.NEXT_PUBLIC_TMDB_AUTH;
    const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
    const TVUrl = `https://api.themoviedb.org/3/trending/tv/day?language=en-US&api_key=${apiKey}`

    const [data, setData] = useState<any>();
    const [TV, setTV] = useState<any>();

    useEffect(()=>{
        const fetchData = async () => {
            if(trendingMovies?.results?.length === 0){
              try{
                const res = await axios.get(url);
                setData(res?.data)
              }catch(err){
                console.log(err);
              }
                
            }
        }

        const fetchTV = async () => {
          try{
            if(trendingSeries?.results?.length === 0){
              const res = await axios.get(TVUrl);
              setTV(res?.data);
            }
          }catch(err){
            console.log(err);
          }

        }

        fetchData();
        fetchTV();
    }, [])

    const movieData = trendingMovies?.results.length > 0 ? trendingMovies : data;
    const tvData = trendingSeries?.results?.length > 0 ? trendingSeries : data;

  return (
    <main className="">
      <Slider movieData={movieData} />
      <TrendingMovies type={"Movies"} data = {movieData} />
      <TrendingMovies type={"Series"} data={tvData} /> 
    </main>
  );
};

export default MainContent;
