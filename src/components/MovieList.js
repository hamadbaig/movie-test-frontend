import React, { useEffect, useState } from "react";
import { fetchMovies } from "../services/MovieService";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaginatedMovieList = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(10);
  const [isGridView, setIsGridView] = useState(true);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies("star");
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    loadMovies();
  }, []);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const addToFavourites = async (movie) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      try {
        const parsedUser = JSON.parse(user); // Parse the user object

        if (!parsedUser || !parsedUser._id) {
          alert("Invalid user data. Please log in again.");
          navigate("/login");
          return;
        }

        // Extract the user ID
        const userId = parsedUser._id;

        // Log all values being sent
        const requestData = {
          movieId: movie.trackId,
          movieData: movie.artworkUrl100,
          name: movie.trackName,
          price: movie.trackPrice,
          genreName: movie.primaryGenreName,
        };

        console.log(
          "Request URL:",
          `${process.env.REACT_APP_API_URL}/api/auth/addfav/${userId}`
        );
        console.log("Request Data:", requestData);

        // Make the POST request
        const response = await axios.post(
          `${apiUrl}/api/auth/addfav/${userId}`,
          requestData
        );

        console.log("Response from server:", response.data);
        alert("Movie added to favourites!");
      } catch (error) {
        console.error("Error adding movie to favourites:", error);
        alert("Error adding movie to favourites.");
      }
    } else {
      alert("You need to be logged in to add to favourites.");
      navigate("/login");
    }
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <label className="mr-2">Grid View</label>
        <input
          type="checkbox"
          checked={isGridView}
          onChange={() => setIsGridView(!isGridView)}
        />
      </div>

      <div
        className={`${
          isGridView
            ? "grid grid-cols-2 gap-4 md:grid-cols-4"
            : "flex flex-col space-y-4"
        }`}
      >
        {currentMovies.map((movie) => (
          <div
            key={movie.trackId}
            className="border p-4 flex flex-col items-center justify-between h-100"
          >
            <Link to={`/detail/${movie.trackId}`}>
              <img
                src={movie.artworkUrl100}
                alt={movie.trackName}
                className="mb-2 object-contain h-32 w-full"
              />
              <h2 className="text-lg font-semibold text-center ">
                {movie.trackName}
              </h2>
              <p className="text-gray-600 text-center">
                {movie.primaryGenreName}
              </p>
              <p className="text-gray-800">${movie.trackPrice}</p>
            </Link>
            <button
              onClick={() => addToFavourites(movie)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add to Favourites
            </button>
          </div>
        ))}
      </div>

      <Pagination
        totalMovies={movies.length}
        moviesPerPage={moviesPerPage}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

const Pagination = ({ totalMovies, moviesPerPage, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center space-x-2 mt-4">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`px-4 py-2 rounded ${
            currentPage === number
              ? "bg-blue-500 text-white font-bold"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default PaginatedMovieList;
