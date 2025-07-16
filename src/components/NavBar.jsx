import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaFilm,
  FaTv,
  FaHeart,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleNav = (to) => {
    navigate(to);
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login");
  };

  const navItems = [
    { label: "Movies", path: "/movies", icon: <FaFilm /> },
    { label: "TV Shows", path: "/tv", icon: <FaTv /> },
    { label: "Saved for Later", path: "/saved", icon: <FaHeart /> },
  ];

  const navButtonStyle =
    "flex items-center gap-2 px-2 py-1 text-white hover:text-sky-400 transition relative " +
    "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-sky-400 " +
    "after:transition-all after:duration-300 hover:after:w-full after:w-0";

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-extrabold text-sky-400 cursor-pointer hover:opacity-90 transition"
        >
          MovieHub
        </h1>

        <div className="hidden md:flex items-center gap-4 whitespace-nowrap">
          <div className="w-56 lg:w-64 xl:w-72">
            <SearchBar />
          </div>

          {navItems.map(({ label, path, icon }) => (
            <button
              key={path}
              onClick={() => handleNav(path)}
              className={navButtonStyle}
            >
              {icon}
              <span>{label}</span>
            </button>
          ))}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-3 py-1 text-red-400 border border-red-400 rounded hover:bg-red-500 hover:text-white transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => handleNav("/login")}
              className="px-3 py-1 text-sky-400 border border-sky-400 rounded hover:bg-sky-500 hover:text-white transition"
            >
              Login / Signup
            </button>
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-sky-400 text-2xl"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4">
          <SearchBar collapseMenu={() => setIsOpen(false)} />

          {navItems.map(({ label, path, icon }) => (
            <button
              key={path}
              onClick={() => handleNav(path)}
              className={navButtonStyle}
            >
              {icon}
              <span>{label}</span>
            </button>
          ))}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-full px-3 py-1 text-red-400 border border-red-400 rounded hover:bg-red-500 hover:text-white transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => handleNav("/login")}
              className="w-full px-3 py-1 text-sky-400 border border-sky-400 rounded hover:bg-sky-500 hover:text-white transition"
            >
              Login / Signup
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
