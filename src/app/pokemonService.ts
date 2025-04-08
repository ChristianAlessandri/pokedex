import axios from "axios";

interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  evolutionStage: string;
  types: string[];
}

const POKEMON_LIMIT = 1025;

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

export const fetchPokemonById = async (id: number): Promise<Pokemon | null> => {
  if (id < 1 || id > POKEMON_LIMIT) {
    console.warn(
      `Invalid Pokémon ID: ${id}. It must be between 1 and ${POKEMON_LIMIT}.`
    );
    return null;
  }

  try {
    const pokemonDetails = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
    const pokemonName = pokemonDetails.data.name;

    const speciesUrl = pokemonDetails.data.species.url;
    const speciesDetails = await axios.get(speciesUrl);

    const evolutionChainUrl = speciesDetails.data.evolution_chain.url;
    const evolutionChain = await axios.get(evolutionChainUrl);

    const evolutionStage = getEvolutionStage(
      evolutionChain.data.chain,
      pokemonName
    );

    const types = pokemonDetails.data.types.map((t: any) => t.type.name);

    return {
      id: pokemonDetails.data.id,
      name: pokemonName,
      imageUrl: pokemonDetails.data.sprites.front_default,
      evolutionStage,
      types,
    };
  } catch (error) {
    console.error(`Error fetching Pokémon with ID ${id}:`, error);
    return null;
  }
};
