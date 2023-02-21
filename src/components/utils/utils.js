const MAX_ID_POKEMON = 1008;

export const randomIdPokemon = (initial = MAX_ID_POKEMON) =>
  Math.floor(Math.random() * initial) + 1;

export const TypeTheme = {
  light: "LIGHT",
  dark: "DARK",
};
/*
export const TypeLang = {
  es: "es",
  en: "en",
};
*/