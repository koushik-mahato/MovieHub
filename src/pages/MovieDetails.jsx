import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieDetails, fetchMovieVideos } from "../services/tmdb";
import { useAuth } from "../context/AuthContext";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, toggleSave, isSaved } = useAuth();

  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      try {
        setLoading(true);
        const [details, videos] = await Promise.all([
          fetchMovieDetails(id),
          fetchMovieVideos(id),
        ]);

        setMovie(details);
        const trailer = videos.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );
        setTrailerUrl(
          trailer ? `https://www.youtube.com/embed/${trailer.key}` : ""
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-10 text-cyan-400 animate-pulse">
        Loading movie details...
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-400">{error}</div>;
  }

  const handleSave = () => {
    if (!isLoggedIn) return navigate("/login");
    toggleSave(movie);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 text-white">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full max-w-xs rounded shadow-md"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-yellow-400">{movie.title}</h1>
          <p className="mt-2 text-sm text-gray-400">
            {new Date(movie.release_date).toLocaleDateString()} • ⭐{" "}
            {movie.vote_average}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {movie.genres.map((g) => (
              <span
                key={g.id}
                className="bg-cyan-700 text-white text-xs px-2 py-1 rounded-full"
              >
                {g.name}
              </span>
            ))}
          </div>
          <p className="mt-4 text-gray-300 leading-relaxed">{movie.overview}</p>

          <button
            onClick={handleSave}
            className={`mt-6 px-5 py-2 rounded-lg transition ${
              isSaved(movie.id)
                ? "bg-red-500 hover:bg-red-600"
                : "bg-sky-500 hover:bg-sky-600"
            }`}
          >
            {isSaved(movie.id) ? "Remove from Saved ❤️" : "Save for Later 🤍"}
          </button>
        </div>
      </div>

      {trailerUrl && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-3">Trailer</h2>
          <iframe
            className="w-full aspect-video rounded shadow-lg"
            src={trailerUrl}
            allowFullScreen
            title="Trailer"
          />
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
