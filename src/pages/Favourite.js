import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const FavouritesScreen = () => {
  const [favourites, setFavourites] = useState([]);
  const [isGridView, setIsGridView] = useState(true);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchFavourites = async () => {
      const user = localStorage.getItem("user");
      if (user) {
        try {
          const parsedUser = JSON.parse(user);

          if (!parsedUser || !parsedUser._id) {
            alert("Invalid user data. Please log in again.");
            navigate("/login");
            return;
          }

          const response = await axios.get(
            `${apiUrl}/api/auth/getfav/${parsedUser._id}`
          );
          setFavourites(response.data.favourites || []);
        } catch (error) {
          console.error("Error fetching favourites:", error);
          alert("Error fetching favourites. Please try again later.");
        }
      } else {
        alert("You need to be logged in to view your favourites.");
        navigate("/login");
      }
    };

    fetchFavourites();
  }, [apiUrl, navigate]);

  return (
    <div>
      <div className="flex justify-end">
        <Link
          to="/"
          className=" text-blue-600 font-semibold mr-4 hover:text-blue-800"
        >
          Home
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4 text-center">Your Favourites</h1>

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
        {favourites.length > 0 ? (
          favourites.map((favourite) => (
            <div
              key={favourite._id}
              className="border p-4 flex flex-col items-center justify-between h-100"
            >
              <Link to={`/detail/${favourite.movieId}`}>
                <img
                  src={favourite.movieData}
                  alt={favourite.name}
                  className="mb-2 object-contain h-32 w-full"
                />
                <h2 className="text-lg font-semibold text-center">
                  {favourite.name}
                </h2>
                <p className="text-gray-600 text-center">
                  {favourite.genreName}
                </p>
                <p className="text-gray-800">${favourite.price}</p>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No favourites added yet.</p>
        )}
      </div>
    </div>
  );
};

export default FavouritesScreen;
