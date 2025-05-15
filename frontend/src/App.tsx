import BookGallery from "./components/BookGallery.tsx";
import type { book } from "./types/book/book.ts";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import DetailView from "./components/DetailView.tsx";
import EditAddBookForm from "./components/AddBookForm.tsx";

function App() {
  const [books, setBooks] = useState<book[]>([]);

  const getAllBooks = useCallback(() => {
    axios
      .get<book[]>("/api")
      .then((response) => setBooks(response.data))
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    getAllBooks();
  }, [getAllBooks]);

  return (
    <Routes>
      <Route path={"/"} element={<BookGallery bookList={books} />} />
      <Route
        path={"/newBook"}
        element={<EditAddBookForm getAllBooksCallback={getAllBooks} />}
      />
      <Route path={"/:isbn"} element={<DetailView />} />
      <Route
        path={"/:isbn/edit"}
        element={<EditAddBookForm getAllBooksCallback={getAllBooks} />}
      />
    </Routes>
  );
}

export default App;
