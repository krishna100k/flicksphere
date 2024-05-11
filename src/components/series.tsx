import { useEffect, useState } from "react";
import Episode from "./episode";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const Series: React.FC<any> = ({ data, id, category }) => {
  const seasons: [any] = data?.seasons;
  const [episodes, setEpisodes] = useState<any>(null);

  const apiKey = process.env.NEXT_PUBLIC_TMDB_AUTH;

  const router = useRouter();
  const searchParams = useSearchParams();

  const seasonNumberQuery = searchParams.get("season");
  const epNumberQuery = searchParams.get("ep");

  // console.log(episodes);

  const fetchData = async (seasonNumber: string) => {
    try {
      router.push(`/${id}?category=${category}&season=${seasonNumber}&ep=${epNumberQuery}`, {
        scroll: false,
      });
      const url = `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=${apiKey}`;
      const res = await axios.get(url);
      setEpisodes(res.data.episodes);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDataInitially = async (seasonNumber: string) => {
    try {
      const url = `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=${apiKey}`;
      const res = await axios.get(url);
      setEpisodes(res.data.episodes);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (seasonNumberQuery) {
      fetchDataInitially(seasonNumberQuery);
    }
  }, []);

  return (
    <div className="bg-[#180E39] w-full h-[80vh] my-36 flex flex-row overflow-hidden">
      <div className="w-[25rem] flex flex-col gap-5 overflow-y-scroll">
        <p className="pt-5 ml-5 text-sm">List Of Episodes</p>
        <select
          onChange={(e) => fetchData(e?.target?.value)}
          className=" w-[85%] h-10 rounded-sm color-black bg-[#030712] border border-slate-600 ml-5 text-sm pl-1"
          name="seasons"
        >
          <option disabled selected>
            Select a season
          </option>
          {seasons?.map((season) => {
            return (
              <option
                selected={
                  seasonNumberQuery == season?.season_number ? true : false
                }
                value={season?.season_number}
              >{`${season?.name}`}</option>
            );
          })}
        </select>
        <div>
          {episodes?.map((episode: any) => {
            return <Episode data={episode} season={seasonNumberQuery} id={id} category={category} />;
          })}
        </div>
      </div>
      <iframe
        className="w-full"
        src={`https://vidsrc.to/embed/tv/${id}/${seasonNumberQuery}/${epNumberQuery}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Series;
