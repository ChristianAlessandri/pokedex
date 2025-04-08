import axios from "axios";

interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  evolutionStage: string;
  types: string[];
}

const getEvolutionStage = (
  chain: any,
  pokemonName: string,
  stage = 0
): string => {
  if (chain.species.name === pokemonName) {
    return stage === 0 ? "Base" : stage === 1 ? "Stage 1" : "Stage 2";
  }

  for (const evolves of chain.evolves_to) {
    const result = getEvolutionStage(evolves, pokemonName, stage + 1);
    if (result) return result;
  }

  return "Unknown";
};

export const fetchPokemonList = async (): Promise<Pokemon[]> => {
  const POKEMON_LIMIT = 1025;

  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=" + POKEMON_LIMIT
    );
    const pokemonList = response.data.results;

    const detailedPokemonList = await Promise.all(
      pokemonList.map(async (pokemon: { name: string; url: string }) => {
        const pokemonDetails = await axios.get(pokemon.url);
        const speciesUrl = pokemonDetails.data.species.url;
        const speciesDetails = await axios.get(speciesUrl);
        const evolutionChainUrl = speciesDetails.data.evolution_chain.url;
        const evolutionChain = await axios.get(evolutionChainUrl);

        const evolutionStage = getEvolutionStage(
          evolutionChain.data.chain,
          pokemon.name
        );

        const types = pokemonDetails.data.types.map((t: any) => t.type.name);

        return {
          id: pokemonDetails.data.id,
          name: pokemon.name,
          imageUrl: pokemonDetails.data.sprites.front_default,
          evolutionStage,
          types,
        };
      })
    );

    return detailedPokemonList;
  } catch (error) {
    console.error("Error in retrieving Pokémon data: ", error);
    return [];
  }
};
