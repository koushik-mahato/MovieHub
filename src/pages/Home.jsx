import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  fetchLatestMovies,
  fetchLatestTVShows,
  fetchTrendingAll,
} from "../services/tmdb";

import HorizontalSection from "../components/HorizontalSection";
import PosterCard from "../components/PosterCard";
import HeroPosterCarousel from "../components/HeroPosterCarousel";

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [trendingMovies, setTM] = useState([]);
  const [trendingTV, setTT] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHome = async () => {
      const [latestM, latestTV] = await Promise.all([
        fetchLatestMovies(),
        fetchLatestTVShows(),
      ]);

      const allTrend = await fetchTrendingAll();
      const movies = allTrend.filter((i) => i.media_type === "movie");
      const tvShows = allTrend.filter((i) => i.media_type === "tv");

      const slides = [...latestM, ...latestTV]
        .filter((i) => i.backdrop_path || i.poster_path)
        .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
        .slice(0, 6);

      setFeatured(slides);
      setTM(movies);
      setTT(tvShows);
      setLoading(false);
    };

    loadHome();
  }, []);

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center text-cyan-400 animate-pulse">
        Loading home…
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <HeroPosterCarousel />

      <div className="px-4">
        <HorizontalSection
          title="Trending Movies"
          items={trendingMovies}
          renderItem={(item) => <PosterCard key={item.id} item={item} />}
        >
          <Link to="/movies" className="text-sm text-cyan-400 hover:underline">
            View All →
          </Link>
        </HorizontalSection>
      </div>

      <div className="px-4 pb-10">
        <HorizontalSection
          title="Trending TV Shows"
          items={trendingTV}
          renderItem={(item) => <PosterCard key={item.id} item={item} />}
        >
          <Link to="/tv" className="text-sm text-cyan-400 hover:underline">
            View All →
          </Link>
        </HorizontalSection>
      </div>
    </div>
  );
};

export default Home;
