"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Show = () => {
  const { id } = useParams();
  const apiKey = process.env.NEXT_PUBLIC_TMDB_AUTH
  const [data, setData] = useState<any>();

  const fetchMovie = async () => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
    try{
        const res = await axios.get(url);
        setData(res?.data)
    }catch(err){
        console.log(err);
    }
  }

  useEffect(() => {
    fetchMovie();
  }, [])

  console.log(data);

  

  return (
    <>
    <Header />
    <main className="pt-[7vh]">
        <div className=' relative w-full h-[40rem] ' style={{ backgroundImage: `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${data?.backdrop_path})` }}>
            <div className="absolute w-full h-full bg-black opacity-70 backdrop-blur-3xl"></div>
        </div>
        <iframe
        className="w-[80vw] m-auto h-[80vh] my-36"
        src={`https://vidsrc.to/embed/movie/${id}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </main>
    <Footer />
    </>
  );
};

export default Show;
