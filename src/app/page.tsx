import Header from "@/components/header";
import Footer from "@/components/footer";
import Slider from "@/components/slider";

const apiKey = process.env.NEXT_PUBLIC_TMDB_AUTH;

const fetchTrendingMovies = async () => {

    const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`, {cache: "no-store"});
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = await res.json();
    return data;

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
