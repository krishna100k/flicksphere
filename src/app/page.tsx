import Header from "@/components/header";
import Footer from "@/components/footer";
import Slider from "@/components/slider";

const apiKey = process.env.NEXT_PUBLIC_TMDB_AUTH;

const fetchTrendingMovies = async () => {
  try{
    const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`)
    const data = await res.json();
    return data;
  }catch(err){
    console.log(err);
  }
}

export default async function Home() {
  const trendingMovies = await fetchTrendingMovies();
  return (
    <main className="">
            <Header />
            <main className=" pt-[6.5vh] ">
              <Slider movieData = {trendingMovies} />
            </main>
            <Footer />
    </main>
  );
}
