import axios from "axios";

import { useQuery } from "react-query";
import { randomIdPokemon } from "../components/utils/utils";

async function fetchPokemonNames({ pokemonId }: any) {
  const pokemonRequest: any = [];
  pokemonRequest.push(
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
  );
  /*
  pokemonRequest.push(
    axios.get(`https://pokeapi.co/api/v2/pokemon-species/pikachu`)
  );
  */
  const responses = await Promise.all(pokemonRequest);

  return {
    ...responses[0].data,
    names: [
      { language: { name: "es" }, name: responses[0].data.name },
      { language: { name: "en" }, name: responses[0].data.name },
    ],
  };
}

export const useGetRandomPokemon = (idNamePokemon?: any) => {
  const { data, isLoading, isError } = useQuery(
    ["randomPokemon", idNamePokemon],
    async () => {
      const pokemonId = idNamePokemon ? idNamePokemon : randomIdPokemon();
      const response: any = fetchPokemonNames({ pokemonId });
      return response;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return { pokemon: data, isLoading, isError };
};
