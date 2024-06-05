"use client"

import { ContinueWatchingSchema } from "@/packages/types/continueWatching";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { useSelector } from "react-redux";

export interface CWState {
  continueWatching : {data : ContinueWatchingSchema[]}
}

const MovieCards:React.FC<any> = ({data, type}) => {

    // const userId = data?.userId
    const CWData = useSelector((state : CWState) => state?.continueWatching?.data)

    const router = useRouter();

    const clickHandler = () => {
      // if (userId) {
      //   if (type === "movie") {
      //     router.push(`/${data?.movieId}?category=movie`);
      //     return;
      //   } else if (type === "tv") {
      //     router.push(`/${data?.movieId}?category=tv&season=${data?.season}&ep=${data?.episode}`);
      //     return;
      //   }
      // }
    
      if (type === "Movies") {
        router.push(`/${data?.id}?category=movie`);
        return;
      } else if (type === "Series") {
        if (CWData.length > 0) {
          const item = CWData.find((item: ContinueWatchingSchema) => data?.id == item?.movieId);
          if (item) {
            router.push(`/${item?.movieId}?category=tv&season=${item?.season}&ep=${item?.episode}`);
          } else {
            router.push(`/${data?.id}?category=tv&season=1&ep=1`);
          }
        } else {
          router.push(`/${data?.id}?category=tv&season=1&ep=1`);
        }
      }
    };
    

    const date = data?.release_date || data?.first_air_date

  return (
    <div onClick={clickHandler} key={data?.id} className="lg:min-w-52 md:min-w-40 lg:w-52 md:w-40 min-w-32 w-32 cursor-pointer rounded-md overflow-hidden py-4">
        <img className="h-full w-full rounded-md" src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${data?.poster_path || data?.imageUrl}`} alt="Poster"  width={500} height={500}  />
        <h1 className=" text-wrap pl-2 pt-4">
            {data?.title || data?.name || data?.contentName }
        </h1>
        <p className="text-sm text-slate-400 pl-2">{date?.slice(0,4) }</p>
    </div>
  )
}

export default MovieCards