import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  fetchOnTheAirTVShows,
  fetchAiringTodayTVShows,
  fetchPopularTVShows,
  fetchTopRatedTVShows,
  fetchLatestTVShows,
  fetchTrendingAll,
} from "../services/tmdb";

import HorizontalSection from "../components/HorizontalSection";
import PosterCard from "../components/PosterCard";

const tvSections = [
  {
    key: "onTheAir",
    title: "On The Air",
    fetcher: fetchOnTheAirTVShows,
    route: "on-the-air",
  },
  {
    key: "airingToday",
    title: "Airing Today",
    fetcher: fetchAiringTodayTVShows,
    route: "airing-today",
  },
  {
    key: "popular",
    title: "Popular",
    fetcher: fetchPopularTVShows,
    route: "popular",
  },
  {
    key: "topRated",
    title: "Top Rated",
    fetcher: fetchTopRatedTVShows,
    route: "top-rated",
  },

  {
    key: "trending",
    title: "Trending",
    fetcher: fetchTrendingAll,
    route: "trending",
  },
  {
    key: "latest",
    title: "Latest Releases",
    fetcher: fetchLatestTVShows,
    route: "latest",
  },
];

const TVShows = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAll = async () => {
      try {
        const results = await Promise.all(
          tvSections.map(({ fetcher }) => fetcher())
        );

        const mapped = tvSections.reduce((acc, sec, i) => {
          if (sec.key === "trending") {
            acc.trending = results[i].filter(
              (item) => item.media_type === "tv"
            );
          } else {
            acc[sec.key] = results[i];
          }
          return acc;
        }, {});

        setData(mapped);
      } catch (err) {
        console.error("Error loading TV sections:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, []);

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center text-cyan-400 animate-pulse">
        Loading TV shows…
      </div>
    );
  }

  return (
    <div className="p-4 space-y-12">
      {tvSections.map(({ key, title, route }) => (
        <HorizontalSection
          key={key}
          title={`${title}`}
          items={data[key] || []}
          renderItem={(item) => <PosterCard key={item.id} item={item} />}
        >
          <Link
            to={`/tv/${route}`}
            className="text-sm text-cyan-400 hover:underline"
          >
            View All →
          </Link>
        </HorizontalSection>
      ))}
    </div>
  );
};

export default TVShows;
