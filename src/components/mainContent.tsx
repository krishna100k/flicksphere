"use client"

import Slider from "@/components/slider";
import { useEffect, useState } from "react";
import axios from "axios";
import TrendingMovies from "./trendingMovies";
import { ContinueWatchingSchema } from "@/packages/types/continueWatching";
import ContinueWatching from "./continuewatching";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

interface CWState {
  continueWatching : {data : ContinueWatchingSchema[]}
}

interface Props {
  trendingMovies: any;
  trendingSeries: any;
  // continueWatching: ContinueWatchingSchema[] ;
}

const MainContent:React.FC<Props> = ({trendingMovies, trendingSeries}) => {

  const CWData = useSelector((state : CWState) => state?.continueWatching?.data)


    const apiKey = process.env.NEXT_PUBLIC_TMDB_AUTH;
    const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
    const TVUrl = `https://api.themoviedb.org/3/trending/tv/day?language=en-US&api_key=${apiKey}`

    const [data, setData] = useState<any>();
    const [TV, setTV] = useState<any>();

    const router = useRouter();

    useEffect(() => {
      router.refresh();
    }, [])

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
    const tvData = trendingSeries?.results?.length > 0 ? trendingSeries : TV;

  return (
    <main className="">
      <Slider movieData={movieData} />
      <TrendingMovies type={"Movies"} data = {movieData} />
      <TrendingMovies type={"Series"} data={tvData} /> 
      <ContinueWatching data={CWData.slice(0,16)} />
    </main>
  );
};

export default MainContent;
