"use client"

import ContinueWatching from "@/components/continuewatching";
import { ContinueWatchingSchema } from "@/packages/types/continueWatching";
import { useSelector } from "react-redux";
import Footer from "@/components/footer";

interface CWState {
  continueWatching : {data : ContinueWatchingSchema[]}
}





const Continue = () => {

    const CWData = useSelector((state : CWState) => state?.continueWatching?.data);

  return (
    <div className="pt-[64px] w-full ">
        <div className="min-h-[40rem]">
        {CWData.length === 0 ? <h1 className="w-full flex justify-center h-screen items-center ">Your List is Empty!</h1> : <ContinueWatching data={CWData} /> }
        </div>
        <Footer />
        </div>
  )
}

export default Continue