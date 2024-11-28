import React from "react";
import { useParams } from "react-router-dom";
import MovieDetail from "../components/MovieDetail";

const Detail = () => {
  const { id } = useParams();

  return (
    <div>
      <MovieDetail id={id} />
    </div>
  );
};

export default Detail;
