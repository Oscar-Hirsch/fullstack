import { type ChangeEvent } from "react";
import { formstyle } from "./pages/EditAddBookForm.tsx";

type SearchbarProperties = {
  setSearchString: (search: string) => void;
  searchString: string;
};

export default function Searchbar({
  setSearchString,
  searchString,
}: SearchbarProperties) {
  function handleOnClick(e: ChangeEvent<HTMLInputElement>) {
    setSearchString(e.target.value);
  }

  return (
    <input
      value={searchString}
      onChange={handleOnClick}
      className={formstyle + " w-1/2"}
      placeholder="Suchen"
    />
  );
}
