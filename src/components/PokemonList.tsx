"use client";

import { useEffect, useState } from "react";
import { fetchPokemonList } from "../app/pokemonService";
import { capitalize } from "@/app/utils";
import Image from "next/image";
import { typeColors } from "@/app/pokemonUtils";

const PokemonList = () => {
  const [pokemon, setPokemon] = useState<
    {
      id: number;
      name: string;
      imageUrl: string;
      evolutionStage: string;
      types: string[];
    }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPokemon = async () => {
      const data = await fetchPokemonList();
      setPokemon(data);
      setLoading(false);
    };

    getPokemon();
  }, []);

  if (loading)
    return <p className="text-neutral-950 dark:text-neutral-50">Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 p-4">
      {pokemon.map((p) => {
        const bgColor1 = typeColors[p.types[0]] || "#A8A77A";
        const bgColor2 = p.types[1] ? typeColors[p.types[1]] : bgColor1;

        return (
          <div
            key={p.name}
            className="relative flex flex-col items-center justify-between rounded-xl w-64 lg:w-56 xl:w-64 h-40 text-neutral-950 dark:text-neutral-50 shadow-lg dark:shadow-none bg-neutral-50 dark:bg-neutral-950 border border-neutral-600/10 dark:border-neutral-400/10"
          >
            {/* Background */}
            <div className="absolute rounded-xl w-64 lg:w-56 xl:w-64 h-40 overflow-hidden">
              <div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-40 h-40 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${bgColor2} 0%, ${bgColor1} 50%, transparent 80%)`,
                  filter: "blur(30px)",
                  opacity: 0.7,
                  zIndex: 0,
                }}
              ></div>
            </div>

            {/* Image */}
            <div className="flex items-center justify-center z-10">
              <img
                src={p.imageUrl}
                alt={p.name}
                className="absolute -top-24 translate-y-4 w-40 h-40 drop-shadow-2xl"
                style={{ imageRendering: "pixelated" }}
              />
            </div>

            {/* Name */}
            <div className="flex flex-col items-center justify-center text-center mt-2">
              <p className="text-neutral-600 dark:text-neutral-400 text-sm font-semibold">
                #{String(p.id).padStart(4, "0")}
              </p>

              <p className="text-lg font-semibold text-neutral-950 dark:text-neutral-50">
                {capitalize(p.name)}
              </p>

              {/* Types */}
              <div className="flex flex-wrap gap-2 mt-2 mb-2">
                {p.types.map((type) => (
                  <div
                    key={type}
                    className="w-6 h-6 rounded-full relative"
                    style={{ backgroundColor: typeColors[type] || "#A8A77A" }}
                    title={capitalize(type)}
                  >
                    <Image
                      src={`/images/types/${type}.svg`}
                      alt={type}
                      fill
                      className="object-cover p-1"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PokemonList;
