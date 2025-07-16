import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PosterCard from "../components/PosterCard";

const SavedListPage = () => {
  const { isLoggedIn, authLoading, savedList } = useAuth();

  if (authLoading) {
    return (
      <div className="text-center py-10 text-cyan-400 animate-pulse">
        Checking your session...
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <h1 className="text-3xl font-extrabold mb-6">
        Your Saved for Later
      </h1>

      {savedList.length === 0 ? (
        <p className="text-gray-400">
          You haven’t saved anything yet.{" "}
          <a href="/" className="text-sky-400 underline">
            Browse movies & shows
          </a>
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {savedList.map((item) => (
            <PosterCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedListPage;
