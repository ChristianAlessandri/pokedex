"use client";

import { useEffect, useState } from "react";
import { fetchPokemonById } from "../app/pokemonService";
import { capitalize } from "@/app/utils";
import Image from "next/image";
import { typeColors } from "@/app/pokemonUtils";
import { PokemonJapaneseName } from "./PokemonJapaneseName";

interface Props {
  id: number;
}

const PokemonCard = ({ id }: Props) => {
  const [pokemon, setPokemon] = useState<{
    id: number;
    name: string;
    imageUrl: string;
    evolutionStage: string;
    types: string[];
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPokemon = async () => {
      const data = await fetchPokemonById(id);
      setPokemon(data);
      setLoading(false);
    };

    getPokemon();
  }, [id]);

  if (loading || !pokemon)
    return <p className="text-neutral-950 dark:text-neutral-50">Loading...</p>;

  const bgColor1 = typeColors[pokemon.types[0]] || "#A8A77A";
  const bgColor2 = pokemon.types[1] ? typeColors[pokemon.types[1]] : bgColor1;

  return (
    <div
      key={pokemon.name}
      className="relative flex flex-col items-center justify-start rounded-xl w-96 h-[40rem] text-neutral-950 dark:text-neutral-50 bg-neutral-50 dark:bg-neutral-950 border border-neutral-600/10 dark:border-neutral-400/10"
    >
      {/* Upper band */}
      <div className="absolute top-0 flex justify-between items-start w-full text-neutral-50 dark:text-neutral-950">
        <div
          className="text-neutral-950 font-semibold rounded-tl-xl rounded-br-xl"
          style={{ backgroundColor: `${bgColor1}` }}
        >
          <p className="px-2">{pokemon.evolutionStage}</p>
        </div>

        <div className="flex flex-wrap gap-2 py-2 absolute top-0 left-1/2 transform -translate-x-1/2">
          {pokemon.types.map((type) => (
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
        <div
          className="text-neutral-950 font-semibold rounded-tr-xl rounded-bl-xl"
          style={{ backgroundColor: `${bgColor1}` }}
        >
          <p className="px-2">#{String(pokemon.id).padStart(4, "0")}</p>
        </div>
      </div>

      <div className="mt-10" />

      {/* Name */}
      <div className="flex w-full">
        <p className="ml-2 text-2xl font-semibold">
          {capitalize(pokemon.name)}
        </p>
      </div>

      {/* Background */}
      <div className="absolute w-96 h-96">
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
          style={{
            background: `radial-gradient(circle, ${bgColor2} 0%, ${bgColor1} 50%, transparent 80%)`,
            filter: "blur(30px)",
            opacity: 0.7,
            zIndex: 0,
          }}
        ></div>
      </div>

      {/* Japanese Name */}
      <div className="absolute w-96 h-96">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-1/4 writing-mode-vertical-rl text-5xl font-semibold text-center opacity-50">
          <PokemonJapaneseName pokemonId={id} />
        </div>
      </div>

      {/* Image */}
      <div className="flex justify-center items-center">
        <img
          src={pokemon.imageUrl}
          alt={pokemon.name}
          className="w-64 h-64 drop-shadow-2xl"
          style={{ imageRendering: "pixelated" }}
        />
      </div>

      <div className="mt-8" />

      {/* Buttons */}
      <div className="flex justify-center items-center w-full gap-4 text-neutral-950 font-semibold">
        <button
          className="px-4 py-1 rounded-tl-xl rounded-bl-xl"
          style={{ backgroundColor: `${bgColor1}` }}
        >
          Info
        </button>

        <button
          className="px-4 py-1"
          style={{ backgroundColor: `${bgColor1}` }}
        >
          EVOs
        </button>
        <button
          className="px-4 py-1 rounded-tr-xl rounded-br-xl"
          style={{ backgroundColor: `${bgColor1}` }}
        >
          Stats
        </button>
      </div>

      {/* Info */}
      <div id="info"></div>

      {/* Evolutions */}
      <div id="evos"></div>

      {/* Stats */}
      <div id="stats"></div>
    </div>
  );
};

export default PokemonCard;
