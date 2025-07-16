import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchMulti } from "../services/tmdb";

const SearchBar = ({ collapseMenu = () => {} }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        const results = await searchMulti(query);
        const filtered = results
          .filter(
            (item) =>
              ["movie", "tv", "person"].includes(item.media_type) &&
              (item.poster_path || item.profile_path || item.backdrop_path)
          )
          .slice(0, 6);
        setSuggestions(filtered);
      } catch (err) {
        console.error(err);
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  const handleSelect = (item) => {
    const isTV = item.media_type === "tv" || item.first_air_date;
    if (item.media_type === "person") {
      navigate(`/person/${item.id}`);
    } else {
      navigate(isTV ? `/tv/${item.id}` : `/movie/${item.id}`);
    }
    setQuery("");
    setSuggestions([]);
    setActive(false);
    collapseMenu();
  };

  return (
    <div className="relative w-full max-w-xs">
      <input
        type="text"
        placeholder="Search movies, shows, people..."
        className="w-full px-3 py-1 text-sm bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:border-sky-400"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setActive(true)}
        onBlur={() => setTimeout(() => setActive(false), 200)}
      />

      {active && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-gray-900 border border-gray-700 rounded shadow-lg max-h-80 overflow-y-auto">
          {suggestions.map((item) => (
            <li
              key={`${item.media_type}-${item.id}`}
              onClick={() => handleSelect(item)}
              className="flex items-center gap-3 px-3 py-2 hover:bg-gray-800 cursor-pointer"
            >
              <img
                src={`https://image.tmdb.org/t/p/w92${
                  item.poster_path || item.profile_path || item.backdrop_path
                }`}
                alt={item.title || item.name}
                className="w-8 h-12 object-cover rounded"
              />
              <div>
                <p className="text-sm text-white font-medium truncate w-40">
                  {item.title || item.name}
                </p>
                <p className="text-xs text-gray-400 capitalize">
                  {item.media_type === "person"
                    ? "Cast / Crew"
                    : item.media_type}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
