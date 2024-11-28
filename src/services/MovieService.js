import axios from "axios";

const ITUNES_API_URL = "https://itunes.apple.com/search";

export const fetchMovies = async (term = "star") => {
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
