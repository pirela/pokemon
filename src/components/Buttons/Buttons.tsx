const colorsButtonBG = [
  "bg-violet-200",
  "bg-cyan-200",
  "bg-lime-200",
  "bg-fuchsia-200",
  "bg-amber-200",
];

export const ListButtons = ({ pokemon }: any) => {
  return (
    <div className="container max-w-lg text-center mt-4">
      {pokemon?.types.map((type: any, index: number) => {
        return (
          <button
            key={type.type.name}
            className={`${colorsButtonBG[index]} w-24 px-4 py-2 ml-3 rounded-xl capitalize`}
          >
            <span> {type.type.name} </span>
          </button>
        );
      })}
    </div>
  );
};
