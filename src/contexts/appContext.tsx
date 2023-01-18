import axios from "axios";
import { createContext, useEffect, useState } from "react";
import {
  Cocktail,
  GetAllFavoritesResponse,
  GetRandomCocktailResponse,
} from "../types/api";

type TProps = {
  children: JSX.Element;
};

type TDefaultValues = {
  // main data
  cocktailsData: Cocktail[];

  // favorites data
  favoritesData: Cocktail[];
  favoriteIds: string[];
  addFavorite: (cocktail: Cocktail) => void;
  removeFavorite: (idDrink: string) => void;
};

const defaultValues = {
  // main data
  cocktailsData: [],

  // favorites data
  favoritesData: [],
  favoriteIds: [],
  addFavorite: () => undefined,
  removeFavorite: () => undefined,
};

export const AppContext = createContext<TDefaultValues>(defaultValues);

export const AppContextProvider = ({ children }: TProps): JSX.Element => {
  // main data
  const [cocktailsData, setCocktailsData] = useState<Cocktail[]>([]);

  // favorites data
  const [favoritesData, setFavoritesData] = useState<Cocktail[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  // get five random cocktails data
  useEffect(() => {
    getFiveRandomCocktails();
  }, []);

  // get all favorites data
  useEffect(() => {
    getAllFavorites();
  }, [favoriteIds.length]);

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

  const getAllFavorites = async () => {
    try {
      const { data } = await axios.get<GetAllFavoritesResponse>(
        "http://localhost:3004/favorites"
      );
      setFavoritesData(data);
      setFavoriteIds([...data.map((favorite) => favorite.idDrink)]);
    } catch (error) {
      // TODO: report to any error reporting platform
      console.log("error", error);
    }
  };

  const addFavorite = async (cocktail: Cocktail) => {
    try {
      await axios.post("http://localhost:3004/favorites", cocktail);
      setFavoriteIds((favoriteIds) => [...favoriteIds, cocktail.idDrink]);
    } catch (error) {
      // TODO: report to any error reporting platform
      console.log("error", error);
    }
  };

  const removeFavorite = async (idDrink: string) => {
    try {
      await axios.delete(`http://localhost:3004/favorites/${idDrink}`);
      setFavoriteIds((favoriteIds) => [
        ...favoriteIds.filter((favorite) => favorite !== idDrink),
      ]);
    } catch (error) {
      // TODO: report to any error reporting platform
      console.log("error", error);
    }
  };

  // exports
  const context = {
    // main data
    cocktailsData,

    // favorites data
    favoritesData,
    favoriteIds,
    addFavorite,
    removeFavorite,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
