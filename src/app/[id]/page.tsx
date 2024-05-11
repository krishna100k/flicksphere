"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Series from "@/components/series";


const Show = () => {
  const { id } = useParams();

  const searchParams = useSearchParams();

  const category = searchParams.get("category");

  const apiKey = process.env.NEXT_PUBLIC_TMDB_AUTH;
  const [data, setData] = useState<any>();

  const fetchMovie = async () => {
    const url = `https://api.themoviedb.org/3/${category}/${id}?api_key=${apiKey}`;
    try {
      const res = await axios.get(url);
      setData(res?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  // console.log(data);

  return (
    <>
      <Header />
      <main className="pt-[7vh]">
        <div
          className=" relative w-full h-[40rem] "
          style={{
            backgroundImage: `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${data?.backdrop_path})`,
          }}
        >
          <div className="absolute top-0 w-full h-full bg-black/60 backdrop-blur-[1px]">
            <div className="w-full h-full flex justify-center items-start pt-20 gap-10">
              <div
                className=" bg-white w-80 h-[28rem] rounded-md"
                style={{
                  backgroundImage: `url(https://media.themoviedb.org/t/p/w300_and_h450_bestv2${data?.poster_path})`,
                }}
              ></div>
              <div className=" w-[40rem] h-auto flex flex-col gap-2">
                <h1 className="font-black text-2xl">
                  {data?.title || data?.name}
                </h1>
                <div className="flex gap-3 items-center">
                  <p className="text-sm">
                    {data?.release_date || data?.first_air_date}
                  </p>
                  <div className="bg-white rounded-full w-2 h-2"></div>
                  <p className="text-sm">
                    {data?.runtime || data?.number_of_episodes}
                    {category === "tv" ? (
                      <span> Episodes</span>
                    ) : (
                      <span>mins</span>
                    )}
                  </p>
                  <div className="bg-white rounded-full w-2 h-2"></div>
                  <p className="text-sm">{data?.vote_average}/10</p>
                  <div className="bg-white rounded-full w-2 h-2"></div>
                  <p className="text-sm">{data?.vote_count} votes</p>
                  <div className="bg-white rounded-full w-2 h-2"></div>
                  {data?.genres?.map((genre: any) => {
                    return <p className="text-sm">{genre?.name}</p>;
                  })}
                </div>
                <p className="font-bold">Overview</p>
                <p>{data?.overview}</p>
              </div>
            </div>
          </div>
        </div>
        {category === "movie" ? (
          <iframe
            className="w-[80vw] m-auto h-[80vh] my-36"
            src={`https://vidsrc.to/embed/movie/${id}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : <Series data={data} id={id} category={category} />}
      </main>
      <Footer />
    </>
  );
};

export default Show;
