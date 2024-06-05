"use client"

import { ContinueWatchingSchema } from "@/packages/types/continueWatching"

import CWCards from "./CWCards"

const ContinueWatching:React.FC<{data:ContinueWatchingSchema[]}> = ({data}) => {





  return (
    <>
    {data[0]?.userId && 
    <div className="my-9 px-7 relative">
        <h1 className='text-xl font-bold pb-5'>Continue Watching</h1>
        <div  className="flex items-start gap-3 flex-wrap">
        {data.map((CW) => {
            return <CWCards data={CW} type = {CW?.category} />
        })}
        </div>
    </div>
    }
    </>
  )
}

export default ContinueWatching