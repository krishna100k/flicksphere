"use client"

import { ContinueWatchingSchema } from "@/packages/types/continueWatching"

import CWCards from "./CWCards"
import { Switch } from "./ui/switch"
import { useState } from "react"
import CWGrid from "./Grids/CWGrid"

const ContinueWatching: React.FC<{ data: ContinueWatchingSchema[] }> = ({ data }) => {
  const [isGridViewFlag, setisGridViewFlag] = useState<boolean>(false);
  return (
    <>
      {data[0]?.userId &&
        <div className="my-9 px-7 relative">
          <div className="w-full flex justify-between items-center pb-5">
            <div className="flex flex-col gap-3">
              <h1 className='text-xl font-bold'>Continue Watching</h1>
              <div className=" sm:hidden flex items-center gap-4">
                <p>Grid View</p>
                <Switch onCheckedChange={(checked) => setisGridViewFlag(checked)} />
              </div>
            </div>
            <div className=" hidden sm:flex items-center gap-2 sm:gap-4">
              <p>Grid View</p>
              <Switch onCheckedChange={(checked) => setisGridViewFlag(checked)} />
            </div>
          </div>
          <div className="flex items-start gap-3 flex-wrap justify-center">

            {!isGridViewFlag && data.map((CW) => {
              return <CWCards key={CW.id} data={CW} type={CW?.category} />
            })}
            {
              isGridViewFlag && <CWGrid showsData={data} />
            }
          </div>
        </div>
      }
    </>
  )
}

export default ContinueWatching