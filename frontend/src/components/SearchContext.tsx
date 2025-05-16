import { createContext, type SetStateAction } from "react";

export const SearchContext = createContext<{
  searchString: string;
  setSearchString: (value: SetStateAction<string>) => void;
}>({
  searchString: "",
  setSearchString: () => {},
});
