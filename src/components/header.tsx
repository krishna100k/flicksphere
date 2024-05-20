"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoIosSearch } from "react-icons/io";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useEffect } from "react";
import { GrClose } from "react-icons/gr";

const Header = () => {
  const [search, setSearch] = useState<string>("");
  const [smallScreen, setSmallScreen] = useState<boolean>(false);

  const [toggleSearch, setToggleSearch] = useState<boolean>(false);

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
      if(window.innerWidth >= 640){
        setToggleSearch(false);
      }
    };

    window.addEventListener("resize", handleResize);

  }, [])


  const router = useRouter();
  const searchHandler = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/search?query=${search}&category=movie`);
  };

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
            <Avatar className=" cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>K</AvatarFallback>
            </Avatar>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
