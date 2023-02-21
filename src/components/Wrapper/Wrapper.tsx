import { createContext, useState } from "react";
import { FormattedMessage, IntlProvider } from "react-intl";

import { useGetRandomPokemon } from "../../hooks/useGetRandomPokemon";

import { CardPokemon } from "../Cards/Cards";
import { Header } from "../Header/Header";

import { randomIdPokemon } from "../utils/utils";

import Spanish from "../../lang/es.json";
import English from "../../lang/en.json";

export const WrapperPokemon = () => {
  const [idNamePokemon, setIdNamePokemon] = useState<number>();

  const changePokemon = () => {
    setIdNamePokemon(randomIdPokemon());
  };

  const {
    pokemon,
    isError: errorPokemon,
    isLoading: loadingPokemon,
  } = useGetRandomPokemon(idNamePokemon);

  if (loadingPokemon)
    return <FormattedMessage id="loading" defaultMessage={"Loading"} />;

  if (errorPokemon)
    return (
      <FormattedMessage id="error1" defaultMessage={"Ha ocurrido un error1"} />
    );

  return (
    <div>
      <Header changePokemon={changePokemon} />
      {pokemon && !loadingPokemon && <CardPokemon pokemon={pokemon} />}
    </div>
  );
};

export const Context = createContext({
  locale: "es",
  changeLang: (_value: string) => {},
});

const local = navigator.language;

let lang: any;

if (local.includes("es")) {
  lang = Spanish;
} else {
  lang = English;
}

export const WrapperLang = ({ children }: any) => {
  const [locale, setLocale] = useState<any>("es");
  const [messages, setMessages] = useState(lang);

  const selectLang = (value: any) => {
    setLocale(value);
    if (value.includes("es")) {
      setMessages(Spanish);
    } else {
      setMessages(English);
    }
  };
  return (
    <Context.Provider
      value={{ locale, changeLang: (value) => selectLang(value) }}
    >
      <IntlProvider messages={messages} locale={locale} defaultLocale="en">
        {children}
      </IntlProvider>
    </Context.Provider>
  );
};
