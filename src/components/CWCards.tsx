"use client"

import { ContinueWatchingSchema } from "@/packages/types/continueWatching";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { useSelector } from "react-redux";
import CancelIcon from '@mui/icons-material/Cancel';
import axios from "axios"

interface CWState {
  continueWatching : {data : ContinueWatchingSchema[]}
}

const CWCards:React.FC<any> = ({data, type}) => {

    const userId = data?.userId
    const CWData = useSelector((state : CWState) => state?.continueWatching?.data)

    const router = useRouter();

    const clickHandler = () => {
      if (userId) {
        if (type === "movie") {
          router.push(`/${data?.movieId}?category=movie`);
          return;
        } else if (type === "tv") {
          router.push(`/${data?.movieId}?category=tv&season=${data?.season}&ep=${data?.episode}`);
          return;
        }
      }
    };

    const deleteHandler = async (id : string) => {
      const confirmation = window.confirm("Are you sure you want to delete!");

      if(!confirmation){
        return null;
      }

      try{
        if(!id) return alert("Falied To Delete : ID Not Found!")
        const res = await axios.delete(`/api/continuewatching?id=${id}`)
      console.log(res)
      alert("Deleted Successfully!")
      router.refresh()

      }catch(err){
        console.log(err)
      }
    }
    

    const date = data?.release_date || data?.first_air_date

  return (
    <div className="relative hover:scale-105 transition-all duration-150">
    <button onClick={() => deleteHandler(data?.id)} className="absolute right-2 top-5 transition-all duration-200 hover:scale-150 "><CancelIcon style={{color: "white"}} /></button>
    <div onClick={clickHandler} key={data?.id} className="lg:min-w-52 md:min-w-44 lg:w-52 md:w-40 min-w-36 w-36 cursor-pointer rounded-md overflow-hidden py-4 ">
        <img className="h-full w-full rounded-md hover:ring-2 hover:ring-second/40 transition-all duration-200" src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${data?.poster_path || data?.imageUrl}`} alt="Poster"  width={500} height={500}  />
        <h1 className=" text-wrap pl-2 pt-4">
            {data?.title || data?.name || data?.contentName }
        </h1>
        <p className="text-sm text-slate-400 pl-2">{date?.slice(0,4) }</p>
    </div>
    </div>
  )
}

export default CWCards