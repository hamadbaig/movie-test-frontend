import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PaginatedMovieList from "../components/MovieList";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check localStorage for token and user on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!token && !!user);
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 relative">
      <div className="absolute top-4 right-4">
        {isLoggedIn ? (
          <>
            <Link
              to="/favourite"
              className="text-blue-600 font-semibold mr-4 hover:text-blue-800"
            >
              Favourites
            </Link>
            <button
              onClick={handleLogout}
              className="text-blue-600 font-semibold hover:text-blue-800"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-blue-600 font-semibold mr-4 hover:text-blue-800"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-blue-600 font-semibold hover:text-blue-800"
            >
              Signup
            </Link>
          </>
        )}
      </div>

      <h1 className="text-5xl font-bold text-center text-blue-600 mb-8">
        Explore Movies
      </h1>

      <PaginatedMovieList />
    </div>
  );
};

export default Home;
