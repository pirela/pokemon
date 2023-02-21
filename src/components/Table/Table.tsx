import { useCallback, useContext, useState } from "react";
import { FormattedMessage } from "react-intl";

import { Context } from "../Wrapper/Wrapper";

import { useGetMovesPokemon } from "../../hooks/useGetMovesPokemon";
import { usePagination } from "../../hooks/usePagination";

const colorsButtonBG = [
  "bg-blue-200",
  "bg-purple-200",
  "bg-cyan-200",
  "bg-violet-200",
  "bg-amber-200",
];

const TableFooter = ({
  totalRows = 0,
  changeOffset,
  changeRecords,
  currentPage,
  goToFirstPag,
  goToLastPag,
  records,
}: any) => {
  return (
    <div className="w-full">
      <div className="flex space-x-1 mt-2 justify-between ">
        <div>
          <div className=" flex ">
            <FormattedMessage
              id="tableFooter.pageOf"
              defaultMessage={"Pag. {currentPage} of {of}"}
              values={{ currentPage, of: Math.ceil(totalRows / records) }}
            />
          </div>
        </div>
        <div>
          <button
            className="bg-transparent ml-2 min-w-10 bg-slate-100 w-8"
            onClick={() => goToFirstPag()}
          >
            {`<<`}
          </button>
          <button
            className="bg-transparent ml-2 min-w-10 bg-slate-100 w-8 "
            onClick={() => changeOffset(false)}
          >
            {`<`}
          </button>

          <select
            name="selectCurrent"
            id="selectCurrent"
            className="bg-transparent ml-2 min-w-10 text-center bg-slate-100 w-8"
            onChange={changeRecords}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>

          <button
            className="bg-transparent ml-2 min-w-10 bg-slate-100 w-8"
            onClick={() => changeOffset(true)}
          >
            {`>`}
          </button>
          <button
            className="bg-transparent ml-2 min-w-10 bg-slate-100 w-8"
            onClick={() => goToLastPag()}
          >
            {`>>`}
          </button>
        </div>
      </div>
    </div>
  );
};

export const TableType = ({ pokemon = {}, pokemonType = {} }: any) => {
  const [currentType, setCurrentType] = useState(pokemon.types[0].type.name);
  const context = useContext(Context);
  const {
    changeOffset,
    changeRecords,
    currentPage,
    goToFirstPag,
    goToLastPag,
    limit,
    offset,
    records,
  } = usePagination(pokemonType?.[currentType]?.pokemon.length);

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
      <div className="container max-w-lg text-center mt-4">
        {Object.keys(pokemonType)?.map((key: any) => {
          return (
            <button
              key={pokemonType[key]?.name}
              className={`${colorsButtonBG[0]} w-24 px-4 py-2 ml-3 rounded-xl capitalize`}
              onClick={() => setCurrentType(pokemonType[key]?.name)}
            >
              <span> {findName(pokemonType[key]?.names)} </span>
            </button>
          );
        })}
      </div>
      <div className="text-xl text-neutral-400 my-2">
        <FormattedMessage
          id="tableType.pokemonSametype"
          defaultMessage={"Pokemons of the same type"}
        />
      </div>
      <table className="table-auto max-w-lg w-full ">
        <thead className=" border-2 border-blue-600">
          <tr>
            <th>
              <FormattedMessage
                id="tableType.pokemon"
                defaultMessage={"Pokemon"}
              />
            </th>
          </tr>
        </thead>
        <tbody className="border-2 border-blue-600 ">
          {pokemonType?.[currentType]?.pokemon
            ?.slice(offset, limit)
            .map(({ pokemon }: any, index: number) => {
              return (
                <tr
                  className={`${index % 2 ? "" : "bg-blue-200"}`}
                  key={pokemon.name}
                >
                  <td className="capitalize">{pokemon.name}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <TableFooter
        totalRows={pokemonType?.[currentType]?.pokemon.length}
        changeOffset={changeOffset}
        changeRecords={changeRecords}
        goToFirstPag={goToFirstPag}
        goToLastPag={goToLastPag}
        currentPage={currentPage}
        records={records}
      />
    </div>
  );
};

export const TableMoves = ({ pokemon }: any) => {
  const context = useContext(Context);

  const {
    changeOffset,
    changeRecords,
    currentPage,
    goToFirstPag,
    goToLastPag,
    limit,
    offset,
    records,
  } = usePagination(pokemon.moves.length);

  const { data: dataMoves = [], isLoading: isLoadingMoves } =
    useGetMovesPokemon({
      pokemon,
      limit,
      offset,
    });

  const findName = useCallback(
    (names: any[]) => {
      const typeLang = names.find(
        (name) => name.language.name === context.locale
      );
      return typeLang?.name;
    },
    [context.locale]
  );

  if (isLoadingMoves)
    return (
      <FormattedMessage
        id="tableMoves.loadingMoves"
        defaultMessage={"Loading Moves"}
      />
    );

  return (
    <div>
      <div className="text-xl text-neutral-400 my-2 ">
        <FormattedMessage
          id="tableMoves.pokemonMoves"
          defaultMessage={"Pokemon moves"}
        />
      </div>
      <table className="table-auto max-w-lg w-full ">
        <thead className=" border-2 border-blue-600">
          <tr>
            <th scope="col" className="w-1/4">
              <FormattedMessage
                id="tableMoves.nameMove"
                defaultMessage={"Name"}
              />
            </th>
            <th scope="col" className="w-1/4">
              <FormattedMessage
                id="tableMoves.accuracy"
                defaultMessage={"Accuracy"}
              />
            </th>
            <th scope="col" className="w-1/4">
              <FormattedMessage
                id="tableMoves.power"
                defaultMessage={"Power"}
              />
            </th>
            <th scope="col" className="w-1/4">
              <FormattedMessage
                id="tableMoves.costo"
                defaultMessage={"Costo"}
              />
            </th>
          </tr>
        </thead>
        <tbody className="border-2 border-blue-600 rounded">
          {dataMoves.map(
            ({ names, id, accuracy, power, pp }: any, index: number) => {
              return (
                <tr
                  className={`${index % 2 ? "" : "bg-blue-200"}`}
                  key={`${findName(names)}-${id}`}
                >
                  <td className="capitalize ">{findName(names)}</td>
                  <td className="capitalize text-right">{accuracy}</td>
                  <td className="capitalize text-right">{power}</td>
                  <td className="capitalize text-right">{pp}</td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
      <TableFooter
        totalRows={pokemon.moves.length}
        changeOffset={changeOffset}
        changeRecords={changeRecords}
        goToFirstPag={goToFirstPag}
        goToLastPag={goToLastPag}
        currentPage={currentPage}
        records={records}
      />
    </div>
  );
};
