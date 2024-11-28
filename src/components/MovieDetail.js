import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactPlayer from "react-player";

const ITUNES_API_URL = "https://itunes.apple.com/search";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async (term = "star") => {
    const response = await axios.get(ITUNES_API_URL, {
      params: {
        term,
        country: "au",
        media: "movie",
        all: "",
        limit: 200,
      },
    });
    return response.data.results;
  };

  useEffect(() => {
    const getMovieDetail = async () => {
      setLoading(true);
      try {
        const movies = await fetchMovies();
        const foundMovie = movies.find(
          (movie) => movie.trackId === parseInt(id)
        );
        setMovie(foundMovie || null);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    getMovieDetail();
  }, [id]);

  if (loading)
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  if (!movie)
    return (
      <div className="text-center text-lg text-red-500 font-semibold">
        Movie not found.
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto my-8 px-4">
      {/* Movie Title */}
      <h1 className="text-4xl font-bold text-blue-600 text-center mb-4">
        {movie.trackName}
      </h1>

      {/* Description */}
      <p className="text-gray-700 text-lg mb-6 leading-relaxed">
        {movie.longDescription || "Description not available."}
      </p>

      {/* Video Player */}
      <div className="relative pb-[56.25%] h-0 mb-6">
        <ReactPlayer
          url={movie.previewUrl}
          controls
          width="100%"
          height="100%"
          className="absolute top-0 left-0"
        />
      </div>

      {/* Movie Info */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Genre</h2>
            <p className="text-gray-600">{movie.primaryGenreName}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Release Date
            </h2>
            <p className="text-gray-600">
              {new Date(movie.releaseDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
