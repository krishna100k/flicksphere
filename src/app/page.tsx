import Header from "@/components/header";
import Footer from "@/components/footer";
import { fetchWithTimeout } from "@/lib/fetchWithTimeout";
import MainContent from "@/components/mainContent";

const apiKey = process.env.NEXT_PUBLIC_TMDB_AUTH;

const fetchTrendingMovies = async () => {
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;
  return fetchWithTimeout(url, { cache: "no-store" });
};

export default async function Home() {
  let trendingMovies;
  try {
    trendingMovies = await fetchTrendingMovies();
  } catch (error) {
    console.error('Failed to fetch trending movies:', error);
    trendingMovies = { results: [] };
  }

  return (
    <main className="">
      <Header />
      <MainContent trendingMovies = {trendingMovies} />
      <Footer />
    </main>
  );
}
