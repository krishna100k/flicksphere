"use client"

import React, { FormEvent, useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';

const Signup = () => {

    const router = useRouter();

    const [fullname, setFullname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault();

        if(fullname === ""){
            return alert("Please enter FullName!");
        }else if (email === ""){
            return alert("Please enter Email!");
        }else if (password === ""){
            return alert("please enter password! ")
        }

        const data = {
            name : fullname,
            email : email.toLowerCase(),
            password
        }

        try{
            setLoading(true);
            const res = await axios.post(`/api/auth/register`, data);
            if(!res.data) return;

        //    const signin =  await signIn("credentials", {
        //         redirect: false,
        //         email: email,
        //         password: password
        //     });
            

        //     if(!signin?.ok) console.log(signin?.error);
        //     console.log(signin)
        //     setLoading(false);

            alert("Registration Successfull!")
            router.push("/login");
            router.refresh();
        }catch(err : any){
            setLoading(false);
            console.log(err);
            if(err?.response?.data?.name === "ZodError"){
                return alert("Invalid Email Format!")
            }
            alert(`Registration Failed`);
        }


    }

  return (
    <main className='w-full h-screen ' style={{backgroundImage:`url(/Images/background.jpg)`}} >
        <div className='w-full h-full bg-[#030712]/70 backdrop-blur-[1px] flex justify-center items-center '>
            <form onSubmit={handleSubmit} className='bg-[#09090B] min-w-full min-h-full sm:min-w-[27rem] sm:min-h-[30rem] h-auto rounded-md flex flex-col gap-24'>
                <div onClick={() => router.push("/")} className='flex justify-center items-center font-black text-4xl mt-10 cursor-pointer'>
                    <h1 className='text-[#F9FAFB]'>F</h1>
                    <h1 className='text-[#6D28D9]'>S</h1>
                </div>
                <div className='flex flex-col gap-4 px-10'>
                    <input onChange={(e) =>setFullname(e?.target?.value) } value={fullname} className='bg-[#1F2937] p-3 rounded-sm text-[#F9FAFB] text-sm ' placeholder='Full Name' type="text" />
                    <input onChange={(e) =>setEmail(e?.target?.value) } value={email}  className='bg-[#1F2937] p-3 rounded-sm text-[#F9FAFB] text-sm' placeholder='Email' type="text" />
                    <input onChange={(e) => setPassword(e?.target?.value)} value={password} className='bg-[#1F2937] p-3 rounded-sm text-[#F9FAFB] text-sm' placeholder='Password' type="password" />
                    <div className='w-full h-full flex items-end justify-end mt-5 gap-4 flex-col-reverse'>
                        <h1 className='text-sm h-full'>Already have an account? <Link href={"/login"}>Login.</Link></h1>
                        <button disabled={loading ? true : false} type='submit' className="bg-[#6D28D9] w-28 h-9  rounded-sm flex justify-center items-center">{loading ? <CircularProgress style={{color: "white", width:"25px", height: "25px"}} /> : "Signup"}</button>
                    </div>
                    <div className='flex items-center justify-center gap-1 mt-5'>
                        <div className='h-[1px] w-full bg-[#F9FAFB]'></div>
                        <h1>Or</h1>
                        <div className='h-[1px] w-full bg-[#F9FAFB]'></div>
                    </div>
                    <button type='button' onClick={() => signIn("google")} className='w-full py-2 bg-[#F9FAFB] rounded-sm flex justify-center items-center mb-12'>
                        <FcGoogle className='text-2xl' />
                    </button>
                </div>
            </form>
        </div>
    </main>
  )
}

export default Signup