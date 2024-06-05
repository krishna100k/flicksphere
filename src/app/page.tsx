import Header from "@/components/header";
import Footer from "@/components/footer";
import { fetchWithTimeout } from "@/lib/fetchWithTimeout";
import MainContent from "@/components/mainContent";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

const apiKey = process.env.NEXT_PUBLIC_TMDB_AUTH;





const fetchTrendingMovies = async () => {
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;
  return fetchWithTimeout(url, { cache: "no-store" });
};

const fetchTrendingSeries = async () => {
  const url = `https://api.themoviedb.org/3/trending/tv/day?language=en-US&api_key=${apiKey}`;
  return fetchWithTimeout(url, { cache: "no-store" });
};

const fetchContinueWatching = async (id : string) =>{
  const url = `${process.env.NEXTAUTH_URL}/api/continuewatching?id=${id}`
  try{
    const res = await fetch(url, {method: "GET" ,cache: "no-store"});
    const data = await res.json();
    return data;
  }catch(err){
    console.log(err)
  }
}

export default async function Home() {
  let trendingMovies;
  let trendingSeries;
  let continueWatching;

  const session = await getServerSession(authOptions);

  const userId = session?.user?.id;



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

  try{
    if(!userId){
      continueWatching = []
    }else{
      continueWatching = await fetchContinueWatching(userId);
    }
  }catch(err){
    console.log(err);
  }

  return (
    <main className=" overflow-hidden">
      {/* <Header user={session?.user as UserSession} /> */}
      <MainContent trendingMovies = {trendingMovies} trendingSeries = {trendingSeries} continueWatching = {continueWatching}/>
      <Footer />
    </main>
  );
}
