import Header from "@/components/header";
import Footer from "@/components/footer";
import { fetchWithTimeout } from "@/lib/fetchWithTimeout";
import MainContent from "@/components/mainContent";

const apiKey = process.env.NEXT_PUBLIC_TMDB_AUTH;



const fetchTrendingMovies = async () => {
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;
  return fetchWithTimeout(url, { cache: "no-store" });
};

const fetchTrendingSeries = async () => {
  const url = `https://api.themoviedb.org/3/trending/tv/day?language=en-US&api_key=${apiKey}`;
  return fetchWithTimeout(url, { cache: "no-store" });
};

export default async function Home() {
  let trendingMovies;
  let trendingSeries;




  try {
    trendingMovies = await fetchTrendingMovies();
  } catch (error) {
    console.error('Failed to fetch trending movies:', error);
    trendingMovies = { results: [] };
  }

  try {
    trendingSeries = await fetchTrendingSeries();
  } catch (error) {
    console.error('Failed to fetch trending Series:', error);
    trendingSeries = { results: [] };
  }

  return (
    <main className=" overflow-hidden">
      {/* <Header user={session?.user as UserSession} /> */}
      <MainContent trendingMovies = {trendingMovies} trendingSeries = {trendingSeries}/>
      <Footer />
    </main>
  );
}
