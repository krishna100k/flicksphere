import axios from "axios";
import { useEffect, useState } from "react";
import MovieGrid from "./Grids/MovieGrid";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface PersonDetailsProps {
  data: any,
  category: string,
  id: any
}

const PersonDetails: React.FC<PersonDetailsProps> = ({ data, category, id }) => {

  const [movie, setMovie] = useState([]);
  const [tv, setTV] = useState([]);
  const [contentType, setContentType] = useState("Movies");

  const apiKey = process.env.NEXT_PUBLIC_TMDB_AUTH;

  const getGender = (genderNumber: number) => {
    return genderNumber == 0 ? "Not Specified" : genderNumber == 1 ? "Female" : genderNumber == 2 && "Male"
  }

  const calculateAge = (birthDate: string) => {
    let birth = new Date(birthDate).getFullYear();
    let current = new Date().getFullYear();
    return current - birth
  }

  const getCredits = async (id: string, category: string, contentType: string) => {
    const url = `https://api.themoviedb.org/3/${category}/${id}/${contentType}_credits?api_key=${apiKey}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }

  const onContentTypeSelect = (value : any) => {
    setContentType(value);
  }

  useEffect(() => {
    Promise.all([
      getCredits(id, category, "movie"),
      getCredits(id, category, "tv")
    ])
      .then(([movieData, tvData]) => {
        setMovie(movieData.cast);
        setTV(tvData.cast);
        console.log(tvData);
      })
      .catch((err) => console.error("Error fetching credits:", err));
  }, [id, category])

  return (
    <div className="pt-16">
      <div className=" w-full h-auto">
        <div className="w-full h-full  bg-cover bg-center  " style={{ backgroundImage: `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${data?.profile_path})` }}>
          <div className="w-full h-full py-[5rem] px-5 bg-black/70 backdrop-blur-[3px] flex flex-col md:flex-row justify-center items-center md:items-start gap-10">
            <img className="rounded-md " src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${data?.profile_path}`} alt="Poster" width={250} height={100} />
            <div className="md:w-[50%] flex flex-col gap-5 md:bg-transparent">
              <div>
                <h1 className="font-black text-xl md:text-2xl md:text-start text-center">
                  {data?.title || data?.name}
                </h1>
                <div className="flex gap-1 md:gap-3 items-center flex-wrap md:justify-start justify-center">
                  <p className="text-sm">
                    {data?.birthday} ({calculateAge(data?.birthday)} years old)
                  </p>
                  <div className="bg-white rounded-full w-2 h-2"></div>
                  <p className="text-sm">{data?.place_of_birth}</p>
                  <div className="bg-white rounded-full w-2 h-2"></div>
                  <p className="text-sm">
                    {data?.known_for_department}
                  </p>
                  <div className="bg-white rounded-full w-2 h-2"></div>
                  <p className="text-sm">{getGender(data?.gender)}</p>
                </div>
              </div>
              <div className="flex flex-col md:items-start justify-center items-center">
                <p className=" md:text-start text-justify">{data?.biography}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col justify-center items-center gap-5 md:p-20">
        <div className="w-full flex justify-between items-center">
        <p>{contentType}</p>
        <Select onValueChange={onContentTypeSelect}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Movies" />
          </SelectTrigger>
          <SelectContent >
            <SelectItem value="Movies">Movies</SelectItem>
            <SelectItem value="Series">Tv Series</SelectItem>
          </SelectContent>
        </Select>
        </div>
        {(contentType == "Movies" && movie.length > 0) && <MovieGrid showsData={movie} type={'Movies'} />}
        {(contentType == "Series" && movie.length > 0) && <MovieGrid showsData={tv} type={'Series'} />}
      </div>

    </div>
  )
}

export default PersonDetails