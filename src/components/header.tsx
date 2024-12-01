"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoIosSearch } from "react-icons/io";
import { useRouter } from "next/navigation";
import { FormEvent, Ref, useState } from "react";
import { useEffect } from "react";
import { GrClose } from "react-icons/gr";
import Button from "./button";
import { UserSession } from "@/packages/types/user";
import { useRef } from "react";
import { signOut } from "next-auth/react";
import axios from "axios";
import { ContinueWatchingSchema } from "@/packages/types/continueWatching";
import { UseDispatch, useDispatch } from "react-redux";
import { addCW } from "@/app/redux/slices/continueWatchingSlice";
import Link from "next/link";

const Header: React.FC<{ user?: UserSession }> = ({ user }) => {
  const [search, setSearch] = useState<string>("");
  const [smallScreen, setSmallScreen] = useState<boolean>(false);
  const [popOver, setPopOver] = useState<boolean>(false);
  const [toggleSearch, setToggleSearch] = useState<boolean>(false);



  const popRef = useRef(null);
  const avatarRef = useRef(null)


  const dispatch = useDispatch();

  const fetchCW = async (id : string) => {
    try{
      const url = `/api/continuewatching?id=${id}`;
      const res = await axios.get(url);

      dispatch(addCW(res?.data));

    }catch(err){
      console.log(err)
    }
  }

  useEffect( () => {

    if(user){
       fetchCW(user?.id)
    }
    
  }, [user])

  useEffect(() => {
    const handleResize = () => {
      setSmallScreen(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setToggleSearch(false);
      }
    };

    window.addEventListener("resize", handleResize);
  }, []);
  
  useEffect(() => {
    const handleOpen = () => {
      setPopOver(true);
    }

    const handleClose = () => {
      setPopOver(false);
    }

    const element : any = popRef?.current;
    const avatar : any = avatarRef?.current;
    if (element) {
      element.addEventListener("mouseover", handleOpen);
      element.addEventListener("mouseout", handleClose);
      avatar.addEventListener("mouseover", handleOpen);
      avatar.addEventListener("mouseout", handleClose);
    }

    return () => {
      if (element) {
        avatar.removeEventListener("mouseover", handleOpen);
        avatar.removeEventListener("mouseout", handleClose);
      }
    }

  })




  const router = useRouter();
  const searchHandler = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/search?query=${search}&category=movie&page=1`);
  };

  const name = user?.name as string

  return (
    <header className="w-full h-16 border-b border-slate-700 bg-black/35 flex items-center justify-between px-7 fixed z-50 backdrop-blur-sm ">
      {toggleSearch ? (
        <form
          onSubmit={searchHandler}
          className=" w-full flex justify-between items-center gap-3"
        >
          <input
            value={search}
            onChange={(e) => setSearch(e?.target?.value)}
            type="text"
            placeholder="Search Movies & TV Shows"
            className="bg-[#030712] border border-[#595959] text-sm pl-2 pr-10 rounded-sm text-[595959] h-10  "
          />
          <div className="flex gap-5">
            <button type="submit">
              <IoIosSearch className="text-2xl cursor-pointer " />
            </button>
            <button onClick={() => setToggleSearch(false)}>
              <GrClose className="text-xl cursor-pointer " />
            </button>
          </div>
        </form>
      ) : (
        <>
          <h1
            onClick={() => router.replace("/")}
            className=" font-black text-xl cursor-pointer"
          >
            Flick<span className=" text-[#6D28D9] ">Sphere</span>
          </h1>
          <div className="flex justify-center items-center gap-5 ">
            <form
              onSubmit={searchHandler}
              className="flex justify-center items-center gap-3"
            >
              <input
                value={search}
                onChange={(e) => setSearch(e?.target?.value)}
                type="text"
                placeholder="Search Movies & TV Shows"
                className="bg-[#030712] border border-[#595959] text-sm pl-2 pr-10 rounded-sm text-[595959] h-10 hidden sm:block "
              />
              <button type="submit">
                <IoIosSearch className="text-2xl cursor-pointer hidden sm:block " />
              </button>
            </form>
            <button onClick={() => setToggleSearch(true)}>
              <IoIosSearch className="text-2xl cursor-pointer block sm:hidden" />
            </button>
            {user ? (
              <>
              <Avatar ref={avatarRef} className=" cursor-pointer">
                <AvatarImage src={user?.image} />
                <AvatarFallback>{name[0]}</AvatarFallback>
              </Avatar>
              <div ref={popRef} className={` flex flex-col justify-start gap-4 pt-5 items-center absolute top-14 right-10 rounded-md bg-[#01050F] overflow-hidden ${popOver ? " h-52 w-40" : "h-0 w-0"} transition-all duration-200 ease-in-out`}>
                <Link href={"/continue"} className="transition-all duration-200 hover:bg-white/20 px-5 py-1 rounded-md text-center text-sm text-wrap">Continue Watching</Link>
                <Link href={"/changepassword"} className="transition-all duration-200 hover:bg-white/20 px-5 py-1 rounded-md text-center text-sm text-wrap">Change <br />Password</Link>
                <button onClick={() => signOut()} className="  transition-all duration-200 hover:bg-white/20 px-5 py-1 rounded-md  text-sm">Logout</button>
              </div>
              </>
            ) : (
              <div className="flex justify-center items-center gap-3">
                <button
                  onClick={() => router.push("/login")}
                  className="text-sm"
                >
                  Login
                </button>
                <button className = "bg-[#F9FAFB] text-sm text-black py-2 px-3 rounded-sm" onClick={() => router.push("/signup")}>Signup</button>
              </div>
            )}
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
