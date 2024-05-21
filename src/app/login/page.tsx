"use client"

import React from 'react'
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Login = () => {

    const router = useRouter();

  return (
    <main className='w-full h-screen ' style={{backgroundImage:`url(/Images/background.jpg)`}} >
        <div className='w-full h-full bg-[#030712]/70 backdrop-blur-[1px] flex justify-center items-center '>
            <form className='bg-[#09090B] min-w-full min-h-full sm:min-w-[27rem] sm:min-h-[30rem] h-auto rounded-md flex flex-col gap-24'>
                <div onClick={() => router.push("/")} className='flex justify-center items-center font-black text-4xl mt-10 cursor-pointer'>
                    <h1 className='text-[#F9FAFB]'>F</h1>
                    <h1 className='text-[#6D28D9]'>S</h1>
                </div>
                <div className='flex flex-col gap-4 px-10'>
                    <input className='bg-[#1F2937] p-3 rounded-sm text-[#F9FAFB] text-sm' placeholder='Email' type="text" />
                    <input className='bg-[#1F2937] p-3 rounded-sm text-[#F9FAFB] text-sm' placeholder='Password' type="text" />
                    <div className='w-full h-full flex items-end justify-end mt-5 gap-4 flex-col-reverse'>
                        <h1 className='text-sm h-full'>New User? <Link href={"/signup"}>Create an account.</Link></h1>
                        <button type='submit' className="bg-[#6D28D9] w-28 h-9  rounded-sm">Login</button>
                    </div>
                    <div className='flex items-center justify-center gap-1 mt-5'>
                        <div className='h-[1px] w-full bg-[#F9FAFB]'></div>
                        <h1>Or</h1>
                        <div className='h-[1px] w-full bg-[#F9FAFB]'></div>
                    </div>
                    <button className='w-full py-2 bg-[#F9FAFB] rounded-sm flex justify-center items-center mb-12'>
                        <FcGoogle className='text-2xl' />
                    </button>
                </div>
            </form>
        </div>
    </main>
  )
}

export default Login