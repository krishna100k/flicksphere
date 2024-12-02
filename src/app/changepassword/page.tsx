"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserSession } from "@/packages/types/user";
import { CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import Footer from "@/components/footer";
import axios from "axios"

const ChangePassword = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const [currPassword, setCurrPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [nullPassword, setNullPassword] = useState<boolean>(false);

    const router = useRouter();
    const session  = useSession();

    const user = session.data?.user as UserSession
    const userName = user?.name
    const FirstLetter = user?.name?.slice(0,1) as string

    let isButtonDisabled : boolean = loading || currPassword.trim() == "" || newPassword.trim() == "" || confirmPassword.trim() == ""

    useEffect(() => {
        if(!session){
            router.replace("/")
        }
    }, [session])

    const handleSubmit = async (e : FormEvent) => {
        e.preventDefault();

        if(newPassword !== confirmPassword){
            return alert("Passwords do not match!")
        }

        const body = {
            userId : user && user?.id,
            currPassword:  nullPassword ? null : currPassword,
            newPassword:  newPassword,
        }

        try{
            const res = await axios.put(`/api/changepassword`, body);
            console.log(res);
            alert("Password Changed Successfully!")

        }catch(err : any){
            alert(err?.response?.data?.error)
            console.log(err)
        }
    }

  return (
    <div className="pt-[64px]">
        <div className='w-full h-32 ' style={{backgroundImage:`url(/Images/background.jpg)`}} >
        <div className='w-full h-full bg-[#030712]/70 backdrop-blur-[1px] flex justify-center items-center gap-4 '>
        <Avatar className="">
                <AvatarImage src={user?.image} />
                <AvatarFallback>{FirstLetter}</AvatarFallback>
              </Avatar>
              <h1>Hi, {userName}</h1>
        </div>
    </div>
    <div className="sm:my-[9rem] my-[3rem] w-full mx-auto flex flex-col justify-center items-center sm:gap-5 gap-10 ">
        <div className=" w-full sm:w-[27rem]" >
            <h1 className=" font-extrabold text-lg text-center sm:text-start">Change Password</h1>
        </div>
    <form onSubmit={handleSubmit} className="bg-[#09090B] w-full  sm:w-[27rem] h-[30rem] rounded-md flex flex-col justify-center items-center gap-5 border " >

            <div className="min-w-[16rem] flex justify-start items-center gap-3">
                <input onChange={(e) => setNullPassword(e?.target?.checked)} type="checkbox" />
                <p>I don't have a password.</p>
            </div>
            <input onChange={(e) => setCurrPassword(e?.target?.value)} value={currPassword} className="bg-[#1F2937] min-w-[16rem] p-3 rounded-sm text-[#F9FAFB] text-sm" disabled={nullPassword} placeholder="Current Password" type="password" />
            <input onChange={(e) => setNewPassword(e?.target?.value)} value={newPassword} className="bg-[#1F2937] min-w-[16rem] p-3 rounded-sm text-[#F9FAFB] text-sm" placeholder="New Password" type="password" />
            <input onChange={(e) => setConfirmPassword(e?.target?.value)} value={confirmPassword} className="bg-[#1F2937] min-w-[16rem] p-3 rounded-sm text-[#F9FAFB] text-sm" placeholder="Confirm New Password"  type="password" />
            <button disabled={isButtonDisabled} className={`py-2  mt-4 min-w-[16rem] rounded-sm cursor-pointer transition-colors duration-150 ${isButtonDisabled ? 'bg-slate-800 text-slate-500 hover:bg-slate-600' : 'bg-[#6D28D9] hover:bg-[#7f40e6]'} `} type="submit">Submit</button>

        </form>
    </div>
    <Footer />
    </div>
  )
}

export default ChangePassword