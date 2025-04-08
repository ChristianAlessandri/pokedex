"use client";

import { useEffect, useState } from "react";
import { EvolutionChain, fetchPokemonById } from "../app/pokemonService";
import { capitalize } from "@/app/utils";
import Image from "next/image";
import { typeColors } from "@/app/pokemonUtils";
import { PokemonJapaneseName } from "./PokemonJapaneseName";

interface Props {
  id: number;
}

const statNames: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

const getStatName = (apiName: string): string => {
  return statNames[apiName] || capitalize(apiName.replace("-", " "));
};

const PokemonCard = ({ id }: Props) => {
  const [pokemon, setPokemon] = useState<{
    id: number;
    name: string;
    imageUrl: string;
    evolutionStage: string;
    types: string[];
    height: number;
    weight: number;
    evolutionChain?: EvolutionChain[];
    stats?: {
      name: string;
      value: number;
    }[];
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<"info" | "evos" | "stats">(
    "info"
  );

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
      className="relative flex flex-col items-center justify-start rounded-xl w-96 h-[43rem] text-neutral-950 dark:text-neutral-50 bg-neutral-50 dark:bg-neutral-950 border border-neutral-600/10 dark:border-neutral-400/10"
    >
      {/* Upper band */}
      <div className="absolute top-0 flex justify-between items-start w-full text-neutral-50 dark:text-neutral-950 pointer-events-none">
        <div
          className="text-neutral-950 font-semibold rounded-tl-xl rounded-br-xl"
          style={{ backgroundColor: `${bgColor1}` }}
        >
          <p className="px-2">{pokemon.evolutionStage}</p>
        </div>

        <div className="flex flex-wrap gap-2 py-2 absolute top-0 left-1/2 transform -translate-x-1/2 pointer-events-none">
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
      <div className="absolute w-96 h-96 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${bgColor2} 0%, ${bgColor1} 50%, transparent 80%)`,
            filter: "blur(30px)",
            opacity: 0.7,
            zIndex: 0,
          }}
        ></div>
      </div>

      {/* Japanese Name */}
      <div className="absolute w-96 h-96 pointer-events-none">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-1/4 writing-mode-vertical-rl text-5xl font-semibold text-center opacity-50 pointer-events-none">
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
          className={`transition shadow-lg hover:shadow-none px-4 py-1 rounded-tl-xl rounded-bl-xl ${
            activeSection === "info" ? "ring-2 ring-black dark:ring-white" : ""
          }`}
          style={{ backgroundColor: `${bgColor1}` }}
          onClick={() => setActiveSection("info")}
        >
          Info
        </button>

        <button
          className={`transition shadow-lg hover:shadow-none px-4 py-1 ${
            activeSection === "evos" ? "ring-2 ring-black dark:ring-white" : ""
          }`}
          style={{ backgroundColor: `${bgColor1}` }}
          onClick={() => setActiveSection("evos")}
        >
          EVOs
        </button>

        <button
          className={`transition shadow-lg hover:shadow-none px-4 py-1 rounded-tr-xl rounded-br-xl ${
            activeSection === "stats" ? "ring-2 ring-black dark:ring-white" : ""
          }`}
          style={{ backgroundColor: `${bgColor1}` }}
          onClick={() => setActiveSection("stats")}
        >
          Stats
        </button>
      </div>

      <div className="w-full px-4 mt-8 text-neutral-950 dark:text-neutral-50">
        {activeSection === "info" && (
          <div id="info" className="flex flex-col gap-2">
            <span className="flex items-center gap-2">
              <p className="font-semibold">Height</p>
              <p>{pokemon.height / 10} m</p>
            </span>
            <span className="flex items-center gap-2">
              <p className="font-semibold">Weight</p>
              <p>{pokemon.weight / 10} Kg</p>
            </span>
          </div>
        )}

        {activeSection === "evos" && (
          <div id="evos" className="flex flex-col items-center gap-4">
            {pokemon.evolutionChain && pokemon.evolutionChain.length > 1 ? (
              <div className="flex items-center justify-center">
                {pokemon.evolutionChain.map((evo, index) => (
                  <div key={evo.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <img
                        src={evo.imageUrl}
                        alt={evo.name}
                        className={`w-16 h-16 ${
                          evo.id === pokemon.id
                            ? "ring-2 ring-yellow-400"
                            : "opacity-70"
                        }`}
                        style={{ imageRendering: "pixelated" }}
                      />
                      <p className="mt-2 text-sm">{capitalize(evo.name)}</p>
                    </div>
                    {index < pokemon.evolutionChain!.length - 1 && (
                      <span className="mx-2 mb-8 text-xl">-</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p>This Pokémon does not evolve.</p>
            )}
          </div>
        )}

        {activeSection === "stats" && (
          <div id="stats" className="w-full">
            {pokemon.stats?.map((stat) => (
              <div key={stat.name} className="mb-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-sm">
                    {getStatName(stat.name)}
                  </span>
                  <span className="text-xs">{stat.value}/255</span>
                </div>
                <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full"
                    style={{
                      width: `${(stat.value / 255) * 100}%`,
                      backgroundColor:
                        typeColors[pokemon.types[0]] || "#A8A77A",
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;
