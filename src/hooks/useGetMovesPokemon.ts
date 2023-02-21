import axios from "axios";
import { useQuery } from "react-query";

async function fetchPokemonMoves({ pokemon, limit, offset }: any) {
  const moves = pokemon.moves.slice(offset, limit);
  const moveRequests = moves.map((move: any) => axios.get(move.move.url));
  const responses = await Promise.all(moveRequests);
  return responses.map((response) => response.data);
}

export const useGetMovesPokemon = ({ pokemon, limit, offset }: any) => {
  const { data, isLoading, isError } = useQuery(
    ["pokemonMoves", pokemon.name, limit, offset],
    async () => {
      const response = await fetchPokemonMoves({ pokemon, limit, offset });
      return response;
    },
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );
  return { data, isLoading, isError };
};
