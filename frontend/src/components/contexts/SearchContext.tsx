import { createContext } from "react";

export const SearchContext = createContext<{
  searchString: string;
  setSearchString: (value: string) => void;
}>({
  searchString: "",
  setSearchString: () => {},
});
