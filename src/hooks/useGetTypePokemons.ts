import axios from "axios";
import { useQuery } from "react-query";

async function fechTypePokemons({ types = [] }: any) {
  const typeRequests = types.map((type: any) => axios.get(type.type.url));
  const responses: any = await Promise.all(typeRequests);

  const data = responses
    .map((response: any) => response.data)
    .reduce((acc: any, el: any) => {
      acc[el.name] = el;
      return acc;
    }, {});
  return data;
}

export const useGetTypePokemons = ({ types }: any) => {
  const { data, isLoading, isError } = useQuery(
    ["typePokemons", types.map( (type: any) => type.url).join('')],
    async () => {
      const response = await fechTypePokemons({ types });
      return response;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  return { data, isLoading, isError };
};
