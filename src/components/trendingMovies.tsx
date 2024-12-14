import React, { useState, useRef } from 'react'
import MovieCards from './moviecards'
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { Switch } from './ui/switch';
import MovieGrid from './MovieGrid/MovieGrid';

const TrendingMovies: React.FC<{ data: any, type: String }> = ({ data, type }) => {


  const [index, setIndex] = useState<number>(0);
  const [showGridViewFlag, setShowGridViewFlag] = useState<boolean>(false);

  return (
    <div className='my-9 px-7 relative'>

      <div className='flex justify-between'>
        <h1 className='text-xl font-bold pb-5'>Trending {type}</h1>
        <div className='flex gap-3 items-end flex-col sm:flex-row sm:items-center'>
          <div className="flex items-center space-x-2 mr-2">
            <label htmlFor="airplane-mode">Grid View</label>
            <Switch onCheckedChange={(checked) => {setShowGridViewFlag(checked); setIndex(0)}} />
          </div>
          {
            !showGridViewFlag && 
            <div className='flex gap-3 mr-2 sm:mr-0'>
            <FaArrowCircleLeft onClick={() => setIndex((prev) => prev > 0 ? prev - 1 : prev - 0)} className='text-2xl cursor-pointer drop-shadow-2xl' />
            <FaArrowCircleRight onClick={() => setIndex((prev) => prev < 12 ? prev + 1 : prev + 0)} className='text-2xl cursor-pointer drop-shadow-2xl' />
            </div>
          }

        </div>
      </div>
      <div className='flex justify-start items-start gap-3 no-scrollbar transition-all ease-in-out duration-500' style={{ transform: `translateX(-${index * 210}px)` }}>
        {
          showGridViewFlag ? <MovieGrid showsData={data?.results} type={type} /> :
            data?.results?.map((movieData: any) => {
              return <MovieCards key={movieData?.id} data={movieData} type={type} />
            })
        }
      </div>
    </div>
  )
}

export default TrendingMovies