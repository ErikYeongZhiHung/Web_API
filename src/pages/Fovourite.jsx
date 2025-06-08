import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Favorite() {
  const [favorites, setFavorites] = useState([]);
  const [favData, setFavData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavs);

    if (storedFavs.length === 0) {
      setLoading(false);
      return;
    }

    // Fetch data for each favorite Pokémon
    Promise.all(
      storedFavs.map((name) =>
        axios
          .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
          .then((res) => res.data)
          .catch(() => null)
      )
    ).then((results) => {
      setFavData(results.filter((r) => r !== null));
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p className="text-white">Loading favorites…</p>;
  }

  if (favData.length === 0) {
    return <p className="text-white">No favorites yet.</p>;
  }

  return (
    <div className="w-full py-10 px-4 sm:px-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-[#08fbcf]  px-4 py-2 rounded-sm cursor-pointer"
      >
        Back
      </button>
      <h1 className="text-3xl text-white font-bold mb-8 text-center">
        Your Favorites
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-[70%] mx-auto">
        {favData.map((poke) => (
          <Link key={poke.name} to={`/detail/${poke.name}`}>
            <img
              src={poke.sprites.front_default}
              alt={poke.name}
              className="w-full h-auto rounded-lg bg-white p-4"
            />
            <p className="text-center mt-2 text-white font-medium capitalize">
              {poke.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Favorite;
