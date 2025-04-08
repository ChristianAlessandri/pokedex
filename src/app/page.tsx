import PokemonList from "../components/PokemonList";

const Home = () => {
  return (
    <div className="bg-neutral-50 dark:bg-neutral-950">
      <main className="flex flex-col items-center justify-between">
        <div className="mt-20"></div>
        <PokemonList />
      </main>
    </div>
  );
};

export default Home;
