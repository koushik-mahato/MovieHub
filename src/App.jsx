import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MoviesCategory from "./pages/MoviesCategory";
import TVShows from "./pages/TVShows";
import TVCategory from "./pages/TVCategory";
import NavBar from "./components/NavBar";
import MovieDetails from "./pages/MovieDetails";
import TVShowDetails from "./pages/TVShowDetails";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SavedListPage from "./pages/SavedListPage";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/movies/:category" element={<MoviesCategory />} />
          <Route path="/tv" element={<TVShows />} />
          <Route path="/tv/:id" element={<TVShowDetails />} />
          <Route path="/tv/:category" element={<TVCategory />} />
          <Route path="/saved" element={<SavedListPage />} />
          <Route
            path="*"
            element={
              <div className="p-4 text-center">
                <h2 className="text-xl">404: Page Not Found</h2>
                <p>
                  <a href="/" className="text-cyan-400 hover:underline">
                    Go back home
                  </a>
                </p>
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
