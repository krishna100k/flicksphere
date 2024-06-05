"use client"

import { ContinueWatchingSchema } from "@/packages/types/continueWatching"
import MovieCards from "./moviecards"
import { useDispatch } from "react-redux"
import { addCW } from "@/app/redux/slices/continueWatchingSlice"
import { useEffect } from "react"

const ContinueWatching:React.FC<{data:ContinueWatchingSchema[]}> = ({data}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(addCW(data))
    }, [data])


  return (
    <>
    {data[0]?.userId && 
    <div className="my-9 px-7 relative">
        <h1 className='text-xl font-bold pb-5'>Continue Watching</h1>
        <div  className="flex items-center gap-3">
        {data.map((CW) => {
            return <MovieCards data={CW} type = {CW?.category} />
        })}
        </div>
    </div>
    }
    </>
  )
}

export default ContinueWatching