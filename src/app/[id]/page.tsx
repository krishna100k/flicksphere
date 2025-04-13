"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Series from "@/components/series";
import Image from "next/image"
import { useSession } from "next-auth/react";
import { ContinueWatchingSchema } from "@/packages/types/continueWatching";
import Button from "@/components/button";
import { Button as MatButton } from "@mui/material";
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Modal } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import TrendingMovies from "@/components/trendingMovies";



const Show = () => {
  const { id } = useParams();

  const session = useSession();
  const user = session?.data?.user;

  const searchParams = useSearchParams();

  const category = searchParams.get("category");
  const season = searchParams.get("season");
  const episode = searchParams.get("ep")

  const apiKey = process.env.NEXT_PUBLIC_TMDB_AUTH;
  const [data, setData] = useState<any>();
  const [similarContentData, setSimilarContentData] = useState<any>();
  const [credits, setCredits] = useState<any>();
  const [trailerKey, setTrailerKey] = useState<string>();

  const [isAddedToContinueWatching, setIsAddedToContinueWatching] = useState<boolean>(false)
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState<boolean>(false);

  const fetchMovie = async () => {
    const url = `https://api.themoviedb.org/3/${category}/${id}?api_key=${apiKey}`;
    try {
      const res = await axios.get(url);
      console.log(res);
      setData(res?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCredits = async () => {
    const url = `https://api.themoviedb.org/3/${category}/${id}/credits?api_key=${apiKey}`
    try {
      const res = await axios.get(url);
      setCredits(res?.data);
    } catch (err) {
      console.log(err);
    }
  }

  const fetchTrailer = async () => {
    const url = `https://api.themoviedb.org/3/${category}/${id}/videos?api_key=${apiKey}`
    try {
      const res = await axios.get(url);
      let videos: any[] = res?.data?.results;
      console.log("trailers", videos);
      videos.some((video) => {
        if (video.official && video.site == "YouTube" && video.type == "Trailer") {
          return setTrailerKey(video.key);
        }
      })
      console.log("trailerKey", trailerKey);

    } catch (err) {
      console.log(err);
    }
  }

  const fetchSimilarContent = async () => {
    const url = `https://api.themoviedb.org/3/${category}/${id}/similar?language=en-US&page=1&api_key=${apiKey}`;
    try {
      const res = await axios.get(url);
      setSimilarContentData(res.data);
      console.log("fetchSimilarContent", res);
    } catch (err) {
      console.log(err);
    }
  }

  const onTrailerModalClose = (event: any, reason: string) => {
    setIsTrailerModalOpen(false);
  };


  const addToContinueWatching = async () => {

    if (!user) {
      return alert("User Not Found!")
    } else if (!category) {
      return alert("Category Not Found!")
    }

    const body: ContinueWatchingSchema = {
      userId: user?.id,
      movieId: data && data?.id.toString(),
      contentName: data && data?.title || data?.original_name,
      category: category && category,
      season: season ? season : undefined,
      episode: episode ? episode : undefined,
      imageUrl: data && data?.poster_path
    }

    try {
      const res = await axios.post(`/api/continuewatching`, body, { withCredentials: true });
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    fetchMovie();
    fetchCredits();
    fetchTrailer()
    fetchSimilarContent();
  }, []);

  useEffect(() => {
    if (category === 'person') return;
    if (session.status === "authenticated" && data && !isAddedToContinueWatching) {
      const timeoutId = setTimeout(() => {
        addToContinueWatching();
        setIsAddedToContinueWatching(true);
      }, 20000);

      return () => clearTimeout(timeoutId);
    }
  }, [session, data, season, episode]);

  useEffect(() => {
    setIsAddedToContinueWatching(false);
  }, [season, episode])


  return (
    <>
      {
        category != 'person' ?
          <main className="pt-[64px] overflow-hidden">
            <div className=" w-full h-auto">
              <div className="w-full h-full  bg-cover bg-center  " style={{ backgroundImage: `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${data?.backdrop_path})` }}>
                <div className="w-full h-full py-[5rem] px-5 bg-black/70 backdrop-blur-[3px] flex flex-col md:flex-row justify-center items-center md:items-start gap-10">
                  <img className="rounded-md " src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${data?.poster_path}`} alt="Poster" width={250} height={100} />
                  <div className="md:w-[50%] flex flex-col gap-5 md:bg-transparent">
                    <div>
                      <h1 className="font-black text-xl md:text-2xl md:text-start text-center">
                        {data?.title || data?.name}
                      </h1>
                      <div className="flex gap-1 md:gap-3 items-center flex-wrap md:justify-start justify-center">
                        <p className="text-sm">
                          {data?.release_date || data?.first_air_date}
                        </p>
                        <div className="bg-white rounded-full w-2 h-2"></div>
                        <p className="text-sm">
                          {data?.runtime || data?.number_of_episodes}
                          {category === "tv" ? (
                            <span> Episodes</span>
                          ) : (
                            <span> mins</span>
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
                    </div>
                    <div className="flex flex-col md:items-start justify-center items-center">
                      {/* <p className="font-bold">Overview</p> */}
                      <p className=" md:text-start text-justify">{data?.overview}</p>
                    </div>

                    <div className="w-full flex md:justify-start gap-5 justify-center flex-wrap">
                      {credits?.crew?.slice(0, 4).map((cast: any) => {
                        return (
                          <div>
                            <h1 className="font-bold">{cast?.name}</h1>
                            <p className="text-sm">{cast?.known_for_department}</p>
                          </div>
                        )
                      })}
                    </div>
                    <div >
                      <Button action={() => setIsTrailerModalOpen(true)}> <YouTubeIcon color="error" />  Watch Trailer</Button>
                      <Modal
                        open={isTrailerModalOpen}
                        onClose={onTrailerModalClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        className="flex justify-center items-center"
                      >
                        <div className="flex flex-col items-end gap-2">
                          <MatButton onClick={() => setIsTrailerModalOpen(false)} >
                            <CloseIcon className=" text-white" />
                          </MatButton>
                          <iframe width="1280" height="720" src={`https://www.youtube.com/embed/${trailerKey}`}
                            title="Trailer"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
                          </iframe>
                        </div>
                      </Modal>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            {category === "movie" ? (
              <iframe
                className=" w-[100%] h-auto md:w-[80vw] m-auto min-h-[32rem] md:min-h-[40rem] lg:min-h-[1080px] py-10"
                // src={`https://vidsrc.to/embed/movie/${id}`}
                src={`https://vidsrc.xyz/embed/movie/${id}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : <Series data={data} id={id} category={category} />}

            <TrendingMovies type={category == "movie" ? "Movies" : "Series"} data={similarContentData} contentType={"similar"} />
          </main> :
          <>
          
          </>
      }

      <Footer />
    </>
  );
};

export default Show;
