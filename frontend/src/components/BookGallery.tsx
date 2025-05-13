import BookCard from "./BookCard.tsx";
import type { book } from "../types/book/book.ts";
import Searchbar from "./Searchbar.tsx";
import { useState } from "react";
import ButtonComponent from "./ButtonComponent.tsx";

type galleryProps = {
  bookList: book[];
};

export default function BookGallery({ bookList }: galleryProps) {
  const [searchString, setSearchString] = useState<string>("");
  const filteredList = bookList.filter((book) =>
    book.title.includes(searchString),
  );
  const divStyle = "grid grid-cols-3 gap-5";

  return (
    <>
      <Searchbar
        setSearchString={setSearchString}
        searchString={searchString}
      />
      <div className={divStyle}>
        {filteredList.map((book) => (
          <BookCard book={book} key={book.isbn} />
        ))}
      </div>
      <ButtonComponent
        onClick={() => console.log("button gedrückt")}
        label="Buch hinzufügen"
      />
    </>
  );
}
