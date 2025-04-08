"use client";

import { useState, useEffect } from "react";

interface Pokemon {
  id: number;
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
}

async function getPokemonJapaneseName(pokemonId: number): Promise<string> {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`
    );
    const data: Pokemon = await response.json();

    const japaneseName = data.names.find((name) => name.language.name === "ja");

    return japaneseName ? japaneseName.name : data.name;
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    return "";
  }
}

interface PokemonJapaneseNameProps {
  pokemonId: number;
}

export function PokemonJapaneseName({ pokemonId }: PokemonJapaneseNameProps) {
  const [japaneseName, setJapaneseName] = useState<string>("");

  useEffect(() => {
    async function fetchJapaneseName() {
      const name = await getPokemonJapaneseName(pokemonId);
      setJapaneseName(name);
    }

    fetchJapaneseName();
  }, [pokemonId]);

  return <span>{japaneseName}</span>;
}
