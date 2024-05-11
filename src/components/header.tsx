"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoIosSearch } from "react-icons/io";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const Header = () => {

  const [search, setSearch] = useState<string>("");

  const router = useRouter();
  const searchHandler = (e : FormEvent) => {
    e.preventDefault();
    router.push(`/search?query=${search}&category=movie`);
  }

  return (
    <header className="w-screen h-16 border-b border-slate-700 bg-black/35 flex items-center justify-between px-7 fixed z-50 backdrop-blur-sm">
      <h1 onClick={() => router.replace("/")} className=" font-black text-xl cursor-pointer">
        Giga<span className=" text-[#6D28D9] ">Nigga</span>
      </h1>
      <div className="flex justify-center items-center gap-5 ">
        <form onSubmit={searchHandler} className="flex justify-center items-center gap-3">
        <input value={search} onChange={(e) => setSearch(e?.target?.value)} type="text" placeholder="Search Movies & TV Shows" className="bg-[#030712] border border-[#595959] text-sm pl-2 pr-10 rounded-sm text-[595959] h-10 hidden sm:block " />
        <button type="submit">
        <IoIosSearch className="text-2xl cursor-pointer hidden sm:block " />
        </button>
        </form>
        <IoIosSearch className="text-2xl cursor-pointer block sm:hidden" />
        <Avatar className=" cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>K</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
