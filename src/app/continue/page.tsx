"use client"

import ContinueWatching from "@/components/continuewatching";
import { ContinueWatchingSchema } from "@/packages/types/continueWatching";
import { useSelector } from "react-redux";

interface CWState {
  continueWatching : {data : ContinueWatchingSchema[]}
}

const Continue = () => {

    const CWData = useSelector((state : CWState) => state?.continueWatching?.data);

    console.log(CWData)

  return (
    <div className="pt-[64px]">
        <ContinueWatching data={CWData} />
        </div>
  )
}

export default Continue