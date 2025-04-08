import PokemonCard from "@/components/PokemonCard";
import PokemonList from "../components/PokemonList";
import { PokemonProvider } from "@/context/PokemonContext";

const Home = () => {
  return (
    <PokemonProvider>
      <main className="flex flex-col items-center justify-between min-h-screen bg-neutral-50 dark:bg-neutral-950">
        <div className="flex w-full">
          <div className="w-full lg:w-2/3 justify-center mt-20 flex flex-col items-center">
            <h1 className="text-neutral-950 dark:text-neutral-50 mb-8 text-5xl font-semibold">
              Pokédex
            </h1>
            <PokemonList />
          </div>
          <div className="lg:w-1/3">
            <div className="fixed top-1/2 right-0 -translate-x-1/3 -translate-y-1/2">
              <PokemonCard />
            </div>
          </div>
        </div>
      </main>
    </PokemonProvider>
  );
};

export default Home;
