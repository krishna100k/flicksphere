import Image from "next/image";
import { useRouter } from 'next/navigation'

const MovieCards:React.FC<any> = ({data}) => {

    const router = useRouter();

    const clickHandler = () => {
        router.push(`/${data?.id}?category=movie`)
    }

  return (
    <div onClick={clickHandler} key={data?.id} className="lg:min-w-52 md:min-w-40 lg:w-52 md:w-40 min-w-32 w-32 cursor-pointer rounded-md overflow-hidden">
        <Image className="h-full w-full rounded-md" loading="lazy" src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${data?.poster_path}`} alt="Poster"  width={500} height={500}  />
        <h1 className=" text-wrap pl-2 pt-4">
            {data?.title}
        </h1>
        <p className="text-sm text-slate-400 pl-2">{data?.release_date?.slice(0,4)}</p>
    </div>
  )
}

export default MovieCards