import axios from "axios";
import { handleAxiosError } from "./handleAxiosError";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const axiosClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});

const fetchList = async (path, extraParams = {}) => {
  try {
    const { data } = await axiosClient.get(path, { params: extraParams });
    return data.results;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const fetchTrendingAll = (page = 1) =>
  fetchList("/trending/all/week", { page });
  
export const fetchPopularMovies = (page = 1) =>
  fetchList("/movie/popular", { page });
export const fetchTopRatedMovies = (page = 1) =>
  fetchList("/movie/top_rated", { page });
export const fetchUpcomingMovies = (page = 1) =>
  fetchList("/movie/upcoming", { page });
export const fetchNowPlayingMovies = (page = 1) =>
  fetchList("/movie/now_playing", { page });

export const fetchPopularTVShows = (page = 1) =>
  fetchList("/tv/popular", { page });
export const fetchTopRatedTVShows = (page = 1) =>
  fetchList("/tv/top_rated", { page });
export const fetchOnTheAirTVShows = (page = 1) =>
  fetchList("/tv/on_the_air", { page });
export const fetchAiringTodayTVShows = (page = 1) =>
  fetchList("/tv/airing_today", { page });

export const fetchLatestMovies = (page = 1) =>
  fetchList("/discover/movie", { sort_by: "release_date.desc", page });
export const fetchLatestTVShows = (page = 1) =>
  fetchList("/discover/tv", { sort_by: "first_air_date.desc", page });

export const fetchMovieDetails = async (id) => {
  try {
    const { data } = await axiosClient.get(`/movie/${id}`);
    return data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const fetchTVShowDetails = async (id) => {
  try {
    const { data } = await axiosClient.get(`/tv/${id}`);
    return data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const fetchMovieVideos = (id) => fetchList(`/movie/${id}/videos`);
export const fetchTVShowVideos = (id) => fetchList(`/tv/${id}/videos`);

export const searchMulti = (query, page = 1) =>
  fetchList("/search/multi", { query, page });

export const fetchGenres = async () => {
  try {
    const { data } = await axiosClient.get("/genre/movie/list");
    return data.genres;
  } catch (error) {
    handleAxiosError(error);
  }
};
