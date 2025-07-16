import { createContext, useContext, useEffect, useState } from "react";
import {
  fetchTrendingAll,
  fetchPopularTVShows,
  fetchGenres,
} from "../services/tmdb";

const MediaContext = createContext();

export const MediaProvider = ({ children }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTVShows, setTrendingTVShows] = useState([]);
  const [popularTVShows, setPopularTVShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAll = async () => {
      try {
        const allTrend = await fetchTrendingAll();
        setTrendingMovies(allTrend.filter((i) => i.media_type === "movie"));
        setTrendingTVShows(allTrend.filter((i) => i.media_type === "tv"));

        const popTV = await fetchPopularTVShows();
        setPopularTVShows(popTV);

        const g = await fetchGenres();
        setGenres(g);
      } catch (error) {
        console.error("MediaContext error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, []);

  return (
    <MediaContext.Provider
      value={{
        trendingMovies,
        trendingTVShows,
        popularTVShows,
        genres,
        loading,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = () => useContext(MediaContext);
