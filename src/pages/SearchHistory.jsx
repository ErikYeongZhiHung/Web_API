// src/pages/SearchHistory.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SearchHistory() {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("searchHistory")) || [];
    if (stored.length === 0) {
      setHistoryData([]);
      setLoading(false);
      return;
    }

    // Fetch details for each name
    Promise.all(
      stored.map((name) =>
        axios
          .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
          .then((res) => res.data)
          .catch(() => null)
      )
    ).then((results) => {
      // Filter out any failed fetches
      setHistoryData(results.filter((r) => r !== null));
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="text-white">Loading history…</p>;
  if (historyData.length === 0)
    return (
      <div className="h-screen p-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 bg-[#08fbcf] cursor-pointer px-4 py-2 rounded-sm "
        >
          Back
        </button>
        <p className="text-white w-full flex items-center  justify-center text-2xl">
          No search history yet.
        </p>
      </div>
    );

  return (
    <div className="w-full py-10 px-4 sm:px-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-[#08fbcf] cursor-pointer px-4 py-2 rounded-sm "
      >
        Back
      </button>
      <h1 className="text-3xl text-white font-bold mb-8 text-center">
        Search History
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-[70%] mx-auto">
        {historyData.map((poke) => (
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
