import PokemonCard from "@/components/PokemonCard";
import PokemonList from "../components/PokemonList";
import { PokemonProvider } from "@/context/PokemonContext";
import Disclaimer from "@/components/Disclaimer";

const Home = () => {
  return (
    <PokemonProvider>
      <main className="flex flex-col items-center justify-between min-h-screen bg-neutral-50 dark:bg-neutral-950">
        <Disclaimer />
        <div className="flex w-full">
          <div className="w-full lg:w-3/5 xl:w-2/3 justify-center mt-20 flex flex-col items-center">
            <h1 className="text-neutral-950 dark:text-neutral-50 mb-8 text-5xl font-semibold">
              Pokédex
            </h1>
            <PokemonList />
          </div>
          <div className="w-full hidden lg:block lg:w-2/5 xl:w-1/3">
            <div className="fixed top-1/2 right-0 lg:-translate-x-12 xl:-translate-x-1/3 -translate-y-1/2">
              <PokemonCard />
            </div>
          </div>
        </div>
      </main>
    </PokemonProvider>
  );
};

export default Home;
