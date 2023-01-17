import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Cocktail, GetRandomCocktailResponse } from "../types/api";

type TProps = {
  children: JSX.Element;
};

type TDefaultValues = {
  // main data
  cocktailsData: Cocktail[];
};

const defaultValues = {
  // main data
  cocktailsData: [],
};

export const AppContext = createContext<TDefaultValues>(defaultValues);

export const AppContextProvider = ({ children }: TProps): JSX.Element => {
  // main data
  const [cocktailsData, setCocktailsData] = useState<Cocktail[]>([]);

  // get initial data
  useEffect(() => {
    getFiveRandomCocktails();
  }, []);

  const getRandomCocktail = async () => {
    const { data } = await axios.get<GetRandomCocktailResponse>(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );
    return data.drinks[0];
  };

  const getFiveRandomCocktails = async () => {
    try {
      // save only random cocktails, even if the API returns the same cocktail twice
      const cocktailsMap = new Map<string, Cocktail>();

      // to make sure at-least 5 random cocktails fetched
      while (cocktailsMap.size < 5) {
        const randomCocktail = await getRandomCocktail();
        if (randomCocktail) {
          cocktailsMap.set(randomCocktail.idDrink, randomCocktail);
        }
      }

      // update main data state
      setCocktailsData([...cocktailsMap.values()]);
    } catch (error) {
      // TODO: report to any error reporting platform
      console.log("error", error);
    }
  };

  // exports
  const context = {
    // main data
    cocktailsData,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
