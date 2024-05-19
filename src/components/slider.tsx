"use client";

import Image from "next/image";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { IoPlayCircleSharp } from "react-icons/io5";
import { useState } from "react";
import {useRouter} from "next/navigation"


const Slider: React.FC<any> = ({ movieData }) => {
  const data: [any] = movieData?.results?.slice(0, 5);



  const router = useRouter();
  
  const [index, setIndex] = useState<number>(0);

  const playMovie = (id:string) => {
    router.push(`/${id}?category=movie`)
  }


  return (
    <div className="w-full h-auto relative mt-10">
      <div className=" top-[50%] absolute z-[2] w-full flex justify-between items-center">
        <button onClick={() => setIndex((prev) => prev >= 0 ? prev - 1 : 4)}>
          <FaArrowCircleLeft className=" text-3xl ml-5" />
        </button>
        <button onClick={() => setIndex((prev) => prev < 4 ? prev + 1 : 0)}>
          <FaArrowCircleRight className=" text-3xl mr-5" />
        </button>
      </div>
      <div className=" w-full h-auto bg-slate-700 flex overflow-x-scroll overflow-y-hidden relative no-scrollbar ">
        {data?.map((data) => {
          return (
            <div className="min-w-[100vw] h-auto  bg-cover bg-center transition-all ease-in-out duration-1000" style={{ backgroundImage: `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${data?.backdrop_path})`, transform: `translateX(-${index * 100}%)`}}>
            <div className="w-full h-full md:py-20 py-5 px-5 bg-black/60 backdrop-blur-[1px] flex flex-col md:flex-row justify-center items-center md:items-start gap-10">
              <img className="rounded-md " src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${data?.poster_path}`} alt="Poster" width={250} height={100}/>
                      <div className="md:w-[50%] flex flex-col gap-5 md:bg-transparent">
                        <div>
                      <h1 className="font-black text-xl md:text-2xl md:text-start text-center">
                          {data?.title || data?.name}
                      </h1>
                            <div className="flex gap-1 md:gap-3 items-center flex-wrap md:justify-start justify-center">
                              <p className="text-sm">
                                {data?.release_date }
                              </p>
                              <div className="bg-white rounded-full w-2 h-2"></div>
                              <p className="text-sm">{data?.vote_average}/10</p>
                              <div className="bg-white rounded-full w-2 h-2"></div>
                              <p className="text-sm">{data?.vote_count} votes</p>
                              {data?.genres?.map((genre: any) => {
                                return <p className="text-sm">{genre?.name}</p>;
                              })}
                            </div>
                            </div>
                            <button className=" w-full h-12 md:self-start self-center bg-[#F8FAFC] font-bold text-sm text-black md:w-32 md:h-10 rounded-md" onClick={() => playMovie(data?.id)}>
                              Watch Now
                            </button>
                            <div className="flex flex-col md:items-start justify-center items-center">
                              {/* <p className="font-bold">Overview</p> */}
                              <p className=" md:text-start text-justify">{data?.overview}</p> 
                            </div>
                      </div>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
