import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchLatestMovies,
  fetchTrendingAll,
} from "../services/tmdb";

import HorizontalSection from "../components/HorizontalSection";
import PosterCard from "../components/PosterCard";

const movieSections = [
  {
    key: "nowPlaying",
    title: "Now Playing",
    fetcher: fetchNowPlayingMovies,
    route: "now-playing",
  },
  {
    key: "upcoming",
    title: "Upcoming",
    fetcher: fetchUpcomingMovies,
    route: "upcoming",
  },
  {
    key: "popular",
    title: "Popular",
    fetcher: fetchPopularMovies,
    route: "popular",
  },
  {
    key: "topRated",
    title: "Top Rated",
    fetcher: fetchTopRatedMovies,
    route: "top-rated",
  },
  {
    key: "latest",
    title: "Latest Releases",
    fetcher: fetchLatestMovies,
    route: "latest",
  },
  {
    key: "trending",
    title: "Trending",
    fetcher: fetchTrendingAll,
    route: "trending",
  },
];

const Movies = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAll = async () => {
      try {
        const results = await Promise.all(
          movieSections.map(({ fetcher }) => fetcher())
        );

        const mapped = movieSections.reduce((acc, sec, i) => {
          if (sec.key === "trending") {
            acc.trending = results[i].filter(
              (item) => item.media_type === "movie"
            );
          } else {
            acc[sec.key] = results[i];
          }
          return acc;
        }, {});

        setData(mapped);
      } catch (err) {
        console.error("Error loading movie sections:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img src="/Loader.gif" alt="Loading..." className="w-34 h-34" />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-12">
      {movieSections.map(({ key, title, route }) => (
        <HorizontalSection
          key={key}
          title={`${title}`}
          items={data[key] || []}
          renderItem={(item) => <PosterCard key={item.id} item={item} />}
        >
          <Link
            to={`/movies/${route}`}
            className="text-sm text-cyan-400 hover:underline"
          >
            View All →
          </Link>
        </HorizontalSection>
      ))}
    </div>
  );
};

export default Movies;
