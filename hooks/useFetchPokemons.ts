import Pokemon from "../models/PokemonModel";
import Sprites from "../models/SpritesModel";

const useFetchPokemons = (maxAmountPerRequest: number) => {
  const baseUrl = "https://pokeapi.co/api/v2/";

  const fetchPokemons = async () => {
    var pokemons: Pokemon[] = [];
    try {
      var pokemonUrls = await getPokemonUrlList();
      var pokemonsFromApi = await getAllPokemons(pokemonUrls);

      for (var index in pokemonsFromApi) {
        pokemons.push(convertPokemonFromApiModel(pokemonsFromApi[index]));
      }
    } catch (error) {
      throw error;
    }
    return pokemons;
  };

  const getPokemonUrlList = async (
    url: string = `${baseUrl}pokemon?limit=${maxAmountPerRequest}`
  ): Promise<string[]> => {
    var output: string[] = [];
    var jsonResult = await (await fetch(url)).json();
    output.push(...jsonResult.results.map((r) => r.url));
    if (jsonResult.next != null) {
      output.push(...(await getPokemonUrlList(jsonResult.next)));
    }
    return output;
  };

  const getAllPokemons = async (pokeUrls: string[]): Promise<Pokemon[]> => {
    var output: Pokemon[] = [];
    for (const index in pokeUrls) {
      const newPokemon = await getOnePokemon(pokeUrls[index]);
      output.push(newPokemon);
    }
    return output;
  };

  const getOnePokemon = async (pokemonUrl: string): Promise<Pokemon> => {
    const result = await fetch(pokemonUrl);
    const jsonResult = await result.json();
    return jsonResult;
  };

  const convertPokemonFromApiModel = (apiModel): Pokemon => {
    return new Pokemon(
      apiModel.name,
      new Sprites(
        apiModel.sprites.front_default,
        apiModel.sprites.front_shiny,
        apiModel.sprites.front_female,
        null
      ),
      apiModel.species,
      apiModel.types,
      apiModel.weight,
      apiModel.moves,
      apiModel.stats,
      apiModel.id
    );
  };

  return {
    fetchPokemons,
  };
};

export default useFetchPokemons;
