import { type ChangeEvent } from "react";

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
    <>
      <input
        value={searchString}
        onChange={handleOnClick}
        className="border"
        placeholder="Suchen"
      />
    </>
  );
}
