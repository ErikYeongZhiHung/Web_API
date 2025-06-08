// src/pages/Detail.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function CartoonDetail() {
  const { name } = useParams();
  const navigate = useNavigate();

  const {
    data: pokemon,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      return data;
    },
    enabled: !!name, // only run once `name` is defined
  });

  if (isLoading) {
    return <p className="text-white">Loading CartoonDetails...</p>;
  }
  if (isError) {
    return <p className="text-red-500">Error: {error.message}</p>;
  }

  // Helper to capitalize
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="w-full px-4 py-10 sm:px-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-[#08fbcf]  px-4 py-2 rounded-sm"
      >
        Back
      </button>

      <div className="max-w-md mx-auto   bgye">
        <h1 className="text-2xl font-bold text-center mb-4 text-white">
          {capitalize(pokemon.name)}
        </h1>
        <div className="flex justify-center mb-4">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-[60%] "
          />
        </div>
      </div>

      <div className="text-white w-full flex flex-col items-center ">
        <ul className="space-y-2">
          <li>
            <strong>Type:</strong>{" "}
            {pokemon.types.map((t) => capitalize(t.type.name)).join(", ")}
          </li>
          <li>
            <strong>Species:</strong> {capitalize(pokemon.species.name)}
          </li>
          <li>
            <strong>Height:</strong> {pokemon.height / 10} m
          </li>
          <li>
            <strong>Weight:</strong> {pokemon.weight / 10} kg
          </li>
          {pokemon.stats.map((stat) => (
            <li key={stat.stat.name}>
              <strong>
                {stat.stat.name.toUpperCase().replace("-", ". ")}:
              </strong>{" "}
              {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CartoonDetail;
