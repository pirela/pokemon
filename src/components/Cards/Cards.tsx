import { useCallback, useContext, useMemo } from "react";
import { FormattedMessage } from "react-intl";

import { useGetRandomPokemon } from "../../hooks/useGetRandomPokemon";
import { useGetTypePokemons } from "../../hooks/useGetTypePokemons";

import { Context } from "../Wrapper/Wrapper";

import { TableMoves, TableType } from "../Table/Table";
import { randomIdPokemon } from "../utils/utils";
import { ListButtons } from "../Buttons/Buttons";

export const CardIlustration = ({ pokemon }: any) => {
  const context = useContext(Context);

  const findName = useCallback(
    (names: any[]) => {
      const typeLang = names.find(
        (name) => name.language.name === context.locale
      );
      return typeLang?.name;
    },
    [context.locale]
  );

  return (
    <div>
      <div>
        <div className="text-4xl text-center text-neutral-400 w-full truncate mb-2 capitalize">
          {findName(pokemon?.names)}
        </div>
      </div>
      <div className="container flex max-w-lg">
        <div className="flex-col my-auto">
          <img
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt={pokemon?.name}
            className="rounded-full border-4 border-blue-300 w-64 text-center shadow-xl "
          />
        </div>
        <section className="flex ml-8 w-64 h-64 ">
          {Object.keys(pokemon?.sprites.other["official-artwork"]).map(
            (key: string) => (
              <img
                key={key}
                className="w-0 grow object-cover opacity-85 transition ease duration-200 hover:w-full hover:opacity-100"
                src={pokemon?.sprites.other["official-artwork"][key]}
                alt={`${pokemon?.name}-${key}`}
              />
            )
          )}
        </section>
      </div>
    </div>
  );
};

export const CardPokemon = ({ pokemon }: any) => {
  const {
    data,
    isError: errorTypePokemons,
    isLoading: loadingTypePokemons,
  } = useGetTypePokemons({
    types: pokemon?.types,
  });

  const otherP = useMemo(() => {
    let firstNamePokemon = { name: "" };
    let secondNamePokemon = { name: "" };
    let thirdNamePokemon = { name: "" };
    const firstTypeName = pokemon?.types?.[0]?.type?.name;
    const secondTypeName = pokemon?.types?.[1]?.type?.name;
    if (data) {
      if (Object.keys(data || {})?.length) {
        const firstRandomIndex = randomIdPokemon(
          data?.[firstTypeName]?.pokemon?.length
        );
        firstNamePokemon =
          data?.[firstTypeName]?.pokemon?.[firstRandomIndex]?.pokemon;

        const secondRandomIndex = randomIdPokemon(
          data?.[firstTypeName]?.pokemon?.length
        );
        secondNamePokemon =
          data?.[firstTypeName]?.pokemon?.[secondRandomIndex]?.pokemon;

        if (Object.keys(data || {})?.length === 2) {
          const thirdRandomIndex = randomIdPokemon(
            data?.[pokemon?.types[1]?.type?.name]?.pokemon?.length
          );
          thirdNamePokemon =
            data?.[secondTypeName]?.pokemon?.[thirdRandomIndex]?.pokemon;
        } else {
          const thirdRandomIndex = randomIdPokemon(
            data?.[firstTypeName]?.pokemon?.length
          );
          thirdNamePokemon =
            data?.[firstTypeName]?.pokemon?.[thirdRandomIndex]?.pokemon;
        }
      }
    }
    return {
      firstNamePokemon: firstNamePokemon?.name,
      secondNamePokemon: secondNamePokemon?.name,
      thirdNamePokemon: thirdNamePokemon?.name,
    };
  }, [data, pokemon]);

  const {
    pokemon: firstPokemon,
    //isError: errorFirstPokemon,
    isLoading: loadingFirstPokemon,
  } = useGetRandomPokemon(otherP.firstNamePokemon);

  const {
    pokemon: secondPokemon,
    //isError: errorSecondPokemon,
    isLoading: loadingSecondPokemon,
  } = useGetRandomPokemon(otherP.secondNamePokemon);

  const {
    pokemon: thirdPokemon,
    //isError: errorThirdPokemon,
    isLoading: loadingThirdPokemon,
  } = useGetRandomPokemon(otherP.thirdNamePokemon);

  if (
    loadingTypePokemons ||
    loadingFirstPokemon ||
    loadingSecondPokemon ||
    loadingThirdPokemon
  )
    return <FormattedMessage id="loading" defaultMessage={"Loading..."} />;

  if (errorTypePokemons)
    return (
      <FormattedMessage id="error2" defaultMessage={"2Ha ocurrido un error"} />
    );

  return (
    <div>
      <div className="mx-auto max-w-lg my-8 p-8 border-2 rounded-3xl shadow-xl">
        <CardIlustration pokemon={pokemon} />
        <TableType pokemon={pokemon} pokemonType={data} />
        <TableMoves pokemon={pokemon} />
      </div>
      <div className="lg:flex">
        <div className="mx-auto max-w-lg my-8 p-8 border-2 rounded-3xl shadow-xl">
          <CardIlustration pokemon={firstPokemon} />
          <ListButtons pokemon={firstPokemon} />
        </div>
        <div className="mx-auto max-w-lg my-8 p-8 border-2 rounded-3xl shadow-xl">
          <CardIlustration pokemon={secondPokemon} />
          <ListButtons pokemon={secondPokemon} />
        </div>
        <div className="mx-auto max-w-lg my-8 p-8 border-2 rounded-3xl shadow-xl">
          <CardIlustration pokemon={thirdPokemon} />
          <ListButtons pokemon={thirdPokemon} />
        </div>
      </div>
    </div>
  );
};
