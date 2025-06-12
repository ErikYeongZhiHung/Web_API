import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { BsHeart, BsHeartFill } from "react-icons/bs";

function Home() {
  // State for input and search trigger
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);

 
  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavs);
  }, []);

  // Fetch the list of Pokémon
  const {
    data: pokemons = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["pokemons"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=100"
      );
      return data.results;
    },
  });

  // Filter client-side by the search term (case-insensitive)
  const filtered = pokemons.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search button click (and store term in localStorage)
  const handleSearch = () => {
    const term = inputValue.trim().toLowerCase();
    if (!term) return;

    setSearchTerm(term);

    // Save to localStorage for search history
    const existingHistory =
      JSON.parse(localStorage.getItem("searchHistory")) || [];
    // Prevent duplicates and keep newest first
    const updatedHistory = [term, ...existingHistory.filter((t) => t !== term)];
    // (Optional) Limit to 10 entries:
    // const updatedHistory = [term, ...existingHistory.filter((t) => t !== term)].slice(0, 10);

    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  // Toggle favorite status and persist
  const toggleFavorite = (name) => {
    let updated;
    if (favorites.includes(name)) {
      updated = favorites.filter((f) => f !== name);
    } else {
      updated = [...favorites, name];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="w-full py-10 px-4 sm:px-10">
      {/* Header Section */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl text-white font-bold text-center sm:text-left">
          Pokemon <br /> Finder
        </h1>
        <div className="flex space-x-4">
          <Link
            to="/favourite"
            className="bg-[#08fbcf] text-black font-semibold py-3 px-6 rounded-md"
          >
            Favorites
          </Link>
          <Link
            to="/search-history"
            className="bg-[#08fbcf] text-black font-semibold py-3 px-6 rounded-md"
          >
            Search History
          </Link>
        </div>
      </div>

      {/* Search Input */}
      <div className="w-full flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by name…"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-[40%] bg-white p-3 rounded-md text-black"
        />
        <button
          onClick={handleSearch}
          className="ml-4 bg-[#08fbcf] px-6 py-3 rounded-xl text-black font-semibold"
        >
          Search
        </button>
      </div>

      {/* Results Grid */}
      <div className="w-full flex justify-center pt-10">
        {isLoading ? (
          <p className="text-white">Loading...</p>
        ) : isError ? (
          <p className="text-red-500">Error: {error.message}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-[70%]">
            {filtered.length > 0 ? (
              filtered.map((item) => {
                const match = item.url.match(/\/pokemon\/(\d+)\//);
                const id = match ? match[1] : "";
                const isFav = favorites.includes(item.name);
                return (
                  <div key={item.name} className="relative">
                    <button
                      onClick={() => toggleFavorite(item.name)}
                      className="absolute top-2 right-2 z-10 text-xl"
                    >
                      {isFav ? <BsHeartFill /> : <BsHeart />}
                    </button>
                    <Link to={`/detail/${item.name}`}>
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                        alt={item.name}
                        className="w-full h-auto rounded-lg bg-white p-4"
                      />
                      <p className="text-center mt-2 text-white font-medium capitalize">
                        {item.name}
                      </p>
                    </Link>
                  </div>
                );
              })
            ) : (
              <p className="text-white">No Pokémon found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
