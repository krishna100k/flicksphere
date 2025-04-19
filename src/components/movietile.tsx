"use client"

import { imageFallback } from "@/lib/appConstants";
import { ContinueWatchingSchema } from "@/packages/types/continueWatching";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

interface CWState {
  continueWatching : {data : ContinueWatchingSchema[]}
}

const MovieTile: React.FC<{ data: any, category: string }> = ({ data, category }) => {
  const {id, title, overview, release_date, poster_path, original_name, profile_path, known_for_department  } = data;
  const router = useRouter();

  const CWData = useSelector((state : CWState) => state?.continueWatching?.data)
  let description = category === 'person' ? known_for_department : overview?.slice(0, 90) + "...";

  const routeHandler = () => {
    if(category === "tv"){
      
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

    }else{
    router.push(`/${id}?category=${category.toLowerCase()}`)
    }
  }

  return (
    <div onClick={routeHandler} className=" bg-slate-900/60 hover:bg-[#180E39] transition-colors duration-300 w-full min-h-36 rounded-md flex gap-8 mb-5 items-center cursor-pointer">
      <div className=" w-[120px] h-full rounded-sm overflow-hidden">
        <img
          className=" h-full object-cover ml-2 md:m-0 "
          src={`https://image.tmdb.org/t/p/w94_and_h141_bestv2${poster_path && poster_path || profile_path && profile_path}`}
          alt="Image Not Available"
          onError={(e) => e.currentTarget.src = imageFallback} 
          width={100}  
        />
      </div>
      <div className=" w-full flex flex-col gap-1 my-2">
        <h1 className="text-md font-bold">{title || original_name}</h1>
        <p className="text-xs text-[#9CA3AF]">{release_date}</p>
        <p className="text-sm pt-5">{description}</p>
      </div>
    </div>
  );
};

export default MovieTile;
