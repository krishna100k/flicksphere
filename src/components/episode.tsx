import React from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation';

const Episode:React.FC<any> = ({data, season, id, category}) => {

    const router = useRouter();
    const searchParams = useSearchParams();

   const clickHandler = () => {
     router.push(`/${id}?category=${category}&season=${season}&ep=${data?.episode_number}`, {scroll: false})
    }

    const ep = searchParams.get('ep')

  return (
    <div onClick={clickHandler} className='w-[100%] min-h-[4rem] h-auto bg-[#1F2937] flex gap-2 items-center pl-5 border border-slate-600 text-xs cursor-pointer' style={{backgroundColor: ep == data?.episode_number ? '#6D28D9' : '#1F2937'}} >
        <p >{data?.episode_number}</p>
        <p>{data?.name}</p>
    </div>
  )
}

export default Episode