import BookCard from "../BookCard.tsx";
import type { book } from "../../types/book/book.ts";
import { useState } from "react";
import PageWrapper from "../layout/PageWrapper.tsx";
import { SearchContext } from "../contexts/SearchContext.tsx";

type galleryProps = {
  bookList: book[];
};

export default function BookGallery({ bookList }: galleryProps) {
  const [searchString, setSearchString] = useState<string>("");
  const filteredList = bookList.filter((book) =>
    book.title.toLowerCase().includes(searchString.toLowerCase()),
  );
  const divStyle = "md:grid gap-5 md:grid-cols-3 flex flex-col";

  return (
    <SearchContext.Provider value={{ searchString, setSearchString }}>
      <PageWrapper>
        <div className={divStyle}>
          {filteredList.map((book) => (
            <BookCard book={book} key={book.isbn} />
          ))}
        </div>
      </PageWrapper>
    </SearchContext.Provider>
  );
}
