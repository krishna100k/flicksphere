"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

const MovieTile: React.FC<{ data: any, category: string }> = ({ data, category }) => {
  const {id, title, overview, release_date, poster_path, original_name, profile_path } = data;
  const router = useRouter();

  const routeHandler = () => {
    router.push(`/${id}?category=${category.toLowerCase()}`)
  }

  return (
    <div onClick={routeHandler} className="bg-[#180E39] w-full h-36 rounded-lg flex gap-10 mb-10 items-center cursor-pointer">
      <div className=" w-[120px] h-full rounded-sm overflow-hidden">

        <Image
        className=" h-full object-cover"
          src={`https://image.tmdb.org/t/p/w94_and_h141_bestv2${poster_path || profile_path}`}
          alt="Image Not Available"
          width={100}  
          height={100}
        />
      </div>
      <div className=" w-full flex flex-col gap-1 ">
        <h1 className="text-md font-bold">{title || original_name}</h1>
        <p className="text-xs text-[#9CA3AF]">{release_date}</p>
        <p className="text-sm pt-5">{overview?.slice(0, 90)}...</p>
      </div>
    </div>
  );
};

export default MovieTile;
