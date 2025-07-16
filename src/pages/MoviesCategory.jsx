import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchLatestMovies,
  fetchTrendingAll,
} from "../services/tmdb";

import PosterCard from "../components/PosterCard";

const categoryConfig = {
  "now-playing": { title: "Now Playing", fetcher: fetchNowPlayingMovies },
  upcoming: { title: "Upcoming", fetcher: fetchUpcomingMovies },
  popular: { title: "Popular", fetcher: fetchPopularMovies },
  "top-rated": { title: "Top Rated", fetcher: fetchTopRatedMovies },
  latest: { title: "Latest Releases", fetcher: fetchLatestMovies },
  trending: {
    title: "Trending",
    fetcher: fetchTrendingAll,
    filter: (i) => i.media_type === "movie",
  },
};

const MoviesCategory = () => {
  const { category } = useParams();
  const config = categoryConfig[category];

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!config) return;

    const load = async () => {
      try {
        let data = await config.fetcher();
        if (config.filter) data = data.filter(config.filter);
        setItems(data);
      } catch (e) {
        console.error("Error loading category:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [config]);

  if (!config) {
    return <div className="p-4">Unknown category: {category}</div>;
  }

  if (loading) {
    return <div className="p-4 text-center">Loading {config.title}…</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{config.title} Movies</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {items.map((item) => (
          <PosterCard key={item.id} item={item} />
        ))}
      </div>
      <div className="mt-4">
        <Link to="/movies" className="text-cyan-400 hover:underline">
          ← Back to Movies
        </Link>
      </div>
    </div>
  );
};

export default MoviesCategory;
