"use client";

import Image from "next/image";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { IoPlayCircleSharp } from "react-icons/io5";
import { useState } from "react";
import {useRouter} from "next/navigation"

const Slider: React.FC<any> = ({ movieData }) => {
  const data: [any] = movieData?.results.slice(0, 5);

  const router = useRouter();
  
  const [index, setIndex] = useState<number>(0);

  const playMovie = (id:string) => {
    router.push(`/${id}?category=movie`)
  }


  return (
    <div className="w-full h-[45rem] relative">
      <div className=" top-[50%] absolute z-[2] w-full flex justify-between items-center">
        <button onClick={() => setIndex((prev) => prev >= 0 ? prev - 1 : 4)}>
          <FaArrowCircleLeft className=" text-3xl ml-5" />
        </button>
        <button onClick={() => setIndex((prev) => prev < 4 ? prev + 1 : 0)}>
          <FaArrowCircleRight className=" text-3xl mr-5" />
        </button>
      </div>
      <div className=" w-full h-[45rem] bg-slate-700 flex overflow-x-scroll overflow-y-hidden relative no-scrollbar ">
        {data.map((movie) => {
          return (
            <div className={`relative min-w-full h-full overflow-y-hidden transition-all ease-in-out duration-1000`} style={{transform: `translateX(-${index * 100}%)`}}  >
              <div className=" w-full h-full z-[1] absolute flex">
                <div className="w-[40%] h-full  flex justify-end items-start mt-[10vh] lg:mt-28 ml-3 mr-5 lg:mr-20">
                  <Image
                    className="rounded-md"
                    src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`}
                    alt="Profile"
                    width={300}
                    height={450}
                  />
                </div>
                <div className="w-[60%] h-full gap-5 lg:gap-10 flex justify-start mt-[10vh] lg:mt-28 items-start flex-col z-10">
                  <h1 className="font-black lg:text-xl z-[4]">
                    {movie?.original_title}
                  </h1>
                  <p className="w-[95%] lg:w-[50%] text-sm z-[4]">{movie?.overview?.slice(0,100)} ...</p>
                  <button onClick={() => playMovie(movie?.id)} >
                    <IoPlayCircleSharp className="text-white text-5xl z-20" />
                  </button>
                </div>
              </div>
              <div className="absolute top-0 w-full h-full bg-black/60 backdrop-blur-[1px]"></div>
              <img
                className="h-full w-full object-cover object-top"
                src={`https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie?.backdrop_path}`}
                alt="Cover"
                width={1920}
                height={0}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
