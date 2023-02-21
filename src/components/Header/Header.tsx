import { LanguageIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { FormattedMessage } from "react-intl";

import { Context } from "../Wrapper/Wrapper";

const TypeLang = {
  es: "es",
  en: "en",
};

export const Header = ({ changePokemon }: any) => {
  const context = useContext(Context);
  return (
    <div className="w-full flex space-x-1 justify-between px-2">
      <button
        onClick={changePokemon}
        className={`bg-blue-600 text-white w-44 py-2 my-3 rounded-xl capitalize`}
      >
        <FormattedMessage
          id="header.changePokemon"
          defaultMessage={"Change pokemon"}
        />
      </button>
      <div className="inline-flex space-x-2">
        <LanguageIcon
          onClick={() => {
            context.changeLang(
              context.locale === TypeLang.en ? TypeLang.es : TypeLang.en
            );
          }}
          className="h-6 w-6 text-gray-600 m-3 cursor-pointer"
        />
      </div>
    </div>
  );
};
