"use client"

import ContinueWatching from "@/components/continuewatching";
import { ContinueWatchingSchema } from "@/packages/types/continueWatching";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import Footer from "@/components/footer";

interface CWState {
  continueWatching : {data : ContinueWatchingSchema[]}
}





const Continue = () => {

    const CWData = useSelector((state : CWState) => state?.continueWatching?.data);
    console.log(CWData)

  return (
    <div className="pt-[64px] w-full">
        {CWData.length === 0 ? <h1 className="w-full flex justify-center h-screen items-center ">Your List is Empty!</h1> : <ContinueWatching data={CWData} /> }
        <Footer />
        </div>
  )
}

export default Continue