import React, { useState, useRef } from 'react'
import MovieCards from './moviecards'
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

const TrendingMovies:React.FC<{data: any, type: String}> = ({data, type}) => {


    const [index, setIndex] = useState<number>(0);

  return (
    <div className='mt-9 px-7 relative'>

        <div className='flex justify-between'>
        <h1 className='text-xl font-bold pb-5'>Trending {type}</h1>
        <div className='flex gap-3'>
        <FaArrowCircleLeft onClick={() => setIndex((prev) => prev > 0 ? prev - 1 : prev - 0)} className='text-2xl cursor-pointer drop-shadow-2xl' />
        <FaArrowCircleRight onClick={() => setIndex((prev) => prev < 12 ? prev + 1 : prev + 0)} className='text-2xl cursor-pointer drop-shadow-2xl' />
        </div>
        </div>
        <div className='flex justify-start items-start gap-3 no-scrollbar transition-all ease-in-out duration-500' style={{transform: `translateX(-${index * 210}px)`}}>
        {
            data?.results?.map((movieData : any) => {
                return <MovieCards key={movieData?.id} data = {movieData} type={type} />
            })
        }
        </div>
    </div>
  )
}

export default TrendingMovies