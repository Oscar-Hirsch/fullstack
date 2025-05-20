import BookGallery from "./components/pages/BookGallery.tsx";
import type { book } from "./types/book/book.ts";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import DetailView from "./components/pages/DetailView.tsx";
import EditAddBookForm from "./components/pages/EditAddBookForm.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

function App() {
  const [books, setBooks] = useState<book[]>([]);
  const [username, setUsername] = useState<string | undefined | null>(
    undefined,
  );

  const loadUser = useCallback(() => {
    axios
      .get("/api/auth/me")
      .then((response) =>
        response.data.length < 39
          ? setUsername(response.data)
          : setUsername(null),
      )
      .catch(() => setUsername(null));
  }, []);

  const getAllBooks = useCallback(() => {
    axios
      .get<book[]>("/api")
      .then((response) => setBooks(response.data))
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    getAllBooks();
    loadUser();
  }, [getAllBooks, loadUser]);

  return (
    <Routes>
      <Route path={"/"} element={<BookGallery bookList={books} />} />
      <Route path={"/:isbn"} element={<DetailView />} />
      <Route element={<ProtectedRoute username={username} />}>
        <Route
          path={"/newBook"}
          element={<EditAddBookForm getAllBooksCallback={getAllBooks} />}
        />
        <Route
          path={"/:isbn/edit"}
          element={<EditAddBookForm getAllBooksCallback={getAllBooks} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
