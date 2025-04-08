"use client";

import { createContext, useContext, useState } from "react";

interface PokemonContextType {
  selectedPokemonId: number;
  setSelectedPokemonId: (id: number) => void;
}

const PokemonContext = createContext<PokemonContextType>({
  selectedPokemonId: 1,
  setSelectedPokemonId: () => {},
});

export const PokemonProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedPokemonId, setSelectedPokemonId] = useState<number>(1);

  return (
    <PokemonContext.Provider
      value={{ selectedPokemonId, setSelectedPokemonId }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = () => useContext(PokemonContext);
