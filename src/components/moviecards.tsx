import Image from "next/image";
import { useRouter } from 'next/navigation'

const MovieCards:React.FC<any> = ({data, type}) => {

    const router = useRouter();

    const clickHandler = () => {
      if(type === "Movies"){
        router.push(`/${data?.id}?category=movie`)
      }else if(type === "Series"){
        router.push(`/${data?.id}?category=tv&season=1&ep=1`)
      }
    }

    const date = data?.release_date || data?.first_air_date

  return (
    <div onClick={clickHandler} key={data?.id} className="lg:min-w-52 md:min-w-40 lg:w-52 md:w-40 min-w-32 w-32 cursor-pointer rounded-md overflow-hidden">
        <img className="h-full w-full rounded-md" src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${data?.poster_path}`} alt="Poster"  width={500} height={500}  />
        <h1 className=" text-wrap pl-2 pt-4">
            {data?.title || data?.name}
        </h1>
        <p className="text-sm text-slate-400 pl-2">{date?.slice(0,4) }</p>
    </div>
  )
}

export default MovieCards