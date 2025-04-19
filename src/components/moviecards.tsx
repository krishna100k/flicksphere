"use client"

import { imageFallback } from "@/lib/appConstants";
import { IProps, movieClickHandler } from "@/lib/MovieClickHandler";
import { ContinueWatchingSchema } from "@/packages/types/continueWatching";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { useSelector } from "react-redux";

export interface CWState {
  continueWatching : {data : ContinueWatchingSchema[]}
}

const MovieCards:React.FC<any> = ({data, type}) => {

    const router = useRouter()
    const CWData = useSelector((state : CWState) => state?.continueWatching?.data)
    // const clickHandler = () => {
    
    //   if (type === "Movies") {
    //     router.push(`/${data?.id}?category=movie`);
    //     return;
    //   } else if (type === "Series") {
    //     if (CWData.length > 0) {
    //       const item = CWData.find((item: ContinueWatchingSchema) => data?.id == item?.movieId);
    //       if (item) {
    //         router.push(`/${item?.movieId}?category=tv&season=${item?.season}&ep=${item?.episode}`);
    //       } else {
    //         router.push(`/${data?.id}?category=tv&season=1&ep=1`);
    //       }
    //     } else {
    //       router.push(`/${data?.id}?category=tv&season=1&ep=1`);
    //     }
    //   }
    // };
    

    const date = data?.release_date || data?.first_air_date

    let clickHandlerArguements : IProps = {
      type,
      router,
      data,
      CWData
    }

  return (
    <div onClick={() => movieClickHandler(clickHandlerArguements)} key={data?.id} className="lg:min-w-52 md:min-w-40 lg:w-52 md:w-40 min-w-32 w-32 cursor-pointer rounded-md overflow-hidden py-4 hover:scale-105 transition-all duration-150">
        <img 
        className="h-full w-full rounded-md hover:ring-2 hover:ring-second/40 transition-all duration-200" 
        src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${data?.poster_path || data?.imageUrl}`} 
        onError={(e) => e.currentTarget.src = imageFallback} 
        alt="Poster"  
        width={500} 
        height={500}  />
        <h1 className=" text-wrap pl-2 pt-4">
            {data?.title || data?.name || data?.contentName }
        </h1>
        <p className="text-sm text-slate-400 pl-2">{date?.slice(0,4) }</p>
    </div>
  )
}

export default MovieCards