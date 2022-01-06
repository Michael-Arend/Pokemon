import Pokemon from "../models/PokemonModel";
import useFetchPokemons from "../hooks/useFetchPokemons";
import { useEffect, useState } from "react";
import PokemonItem from "../components/PokemonItem";
import Pagination from "../components/Pagination";

const maxAmountPerRequest = 1200;
const amountPerPage = 16;

const IndexPage: React.FC<{ allPokemons: string }> = (props) => {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [shownPokemon, setShownPokemon] = useState<Pokemon[]>([]);
  const [selectedPokemonId, setselectedPokemonId] = useState<number>(0);
  const [currentPage, setcurrentPage] = useState<number>(1);

  //Converts the provided Json-string to the allPokemon State at first Render
  useEffect(() => {
    var jsonObject = JSON.parse(props.allPokemons);
    setAllPokemon(jsonObject);
    setFilteredPokemon(jsonObject);
    setShownPokemon(jsonObject.slice(0, amountPerPage));
  }, []);

  const pokemonSelectedHandler = (id: number) => {
    selectedPokemonId === id
      ? setselectedPokemonId(0)
      : setselectedPokemonId(id);
  };

  const nameFilterHandler = (event: React.FormEvent<HTMLInputElement>) => {
    var filtered =
      event.currentTarget.value.length < 3
        ? allPokemon
        : allPokemon.filter((p) =>
            p.name
              .toLowerCase()
              .includes(event.currentTarget.value.toLowerCase())
          );
    setcurrentPage(1);
    setFilteredPokemon(filtered);
    setShownPokemon(filtered.slice(0, amountPerPage));
  };

  const pageChangedHandler = (page: number) => {
    setcurrentPage(page);
    setShownPokemon(
      filteredPokemon.slice((page - 1) * amountPerPage, page * amountPerPage)
    );
    setselectedPokemonId(0);
  };

  return (
    <>
      <input
        className="filter-input"
        type="text"
        onChange={nameFilterHandler}
        placeholder="Search for your Pokemon (min. 3 chars)"
      />

      {shownPokemon.length > 0 ? (
        <div>
          <ul className="pokemon-list">
            {shownPokemon.map((p) => (
              <PokemonItem
                key={p.id}
                pokemon={p}
                selected={p.id === selectedPokemonId}
                pokemonSelected={pokemonSelectedHandler}
              />
            ))}
          </ul>
          <Pagination
            currentPage={currentPage}
            amountPerPage={amountPerPage}
            pokemonCount={filteredPokemon.length}
            pageChanged={pageChangedHandler}
          />
        </div>
      ) : (
        <h5 className="nofound">no pokemons found</h5>
      )}
    </>
  );
};

export async function getStaticProps() {
  const { fetchPokemons } = useFetchPokemons(maxAmountPerRequest);
  var pokemons = await fetchPokemons();
  var pokemonsJson: string = JSON.stringify(pokemons);
  return {
    props: {
      allPokemons: pokemonsJson,
    },
    revalidate: 86400,
  };
}

export default IndexPage;
