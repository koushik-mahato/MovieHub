import { useNavigate } from "react-router-dom";

const PosterCard = ({ item }) => {
  const navigate = useNavigate();
  const img = item.poster_path || item.backdrop_path;
  const isTV = item.media_type === "tv" || item.first_air_date;

  const handleClick = () => {
    const path = isTV ? `/tv/${item.id}` : `/movie/${item.id}`;
    navigate(path);
  };

  return (
    <div
      onClick={handleClick}
      className="w-32 sm:w-40 lg:w-48 my-2 cursor-pointer hover:scale-105 transition-transform duration-300"
    >
      <div className="relative h-[240px]">
        {img ? (
          <img
            src={`https://image.tmdb.org/t/p/w342${img}`}
            alt={item.title || item.name}
            className="rounded-lg w-full h-full object-cover shadow-md"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-300 rounded-lg text-sm">
            No Image
          </div>
        )}
      </div>

      <h3 className="mt-1 text-sm font-light text-gray-200 text-center leading-tight">
        {item.title || item.name}
      </h3>

      <div className="flex justify-center gap-2 mt-0.5 text-[10px] text-gray-400">
        {item.vote_average && (
          <span className="bg-cyan-700 text-white px-1.5 py-0.5 rounded-full">
            ⭐ {item.vote_average.toFixed(1)}
          </span>
        )}
        {(item.release_date || item.first_air_date) && (
          <span>{(item.release_date || item.first_air_date).slice(0, 4)}</span>
        )}
      </div>
    </div>
  );
};

export default PosterCard;
