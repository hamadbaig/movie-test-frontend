
import React from 'react';

const Favorites = () => {
  const [favorites, setFavorites] = React.useState([]);

  React.useEffect(() => {
    const fetchFavorites = async () => {
      const response = await fetch('/api/favorites');
      const data = await response.json();
      setFavorites(data);
    };
    fetchFavorites();
  }, []);

  return (
    <div className="p-4">
      <h1>Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {favorites.map((movie) => (
            <div key={movie.trackId} className="p-4 border">
              <img src={movie.artworkUrl100} alt={movie.trackName} />
              <h3>{movie.trackName}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
