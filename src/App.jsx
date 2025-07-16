import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import NavBar from "./components/NavBar";

const Home = lazy(() => import("./pages/Home"));
const Movies = lazy(() => import("./pages/Movies"));
const MoviesCategory = lazy(() => import("./pages/MoviesCategory"));
const TVShows = lazy(() => import("./pages/TVShows"));
const TVCategory = lazy(() => import("./pages/TVCategory"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));
const TVShowDetails = lazy(() => import("./pages/TVShowDetails"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const SavedListPage = lazy(() => import("./pages/SavedListPage"));

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="mt-4">
        <Suspense
          fallback={
            <div className="flex justify-center items-center min-h-screen">
              <img src="/Loader.gif" alt="Loading..." className="w-34 h-34" />
            </div>
          }
        >
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
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
