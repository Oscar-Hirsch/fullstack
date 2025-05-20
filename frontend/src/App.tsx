import BookGallery from "./components/pages/BookGallery.tsx";
import type { book } from "./types/book/book.ts";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import DetailView from "./components/pages/DetailView.tsx";
import EditAddBookForm from "./components/pages/EditAddBookForm.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { UserContext } from "./components/contexts/UserContext.tsx";

function App() {
  const [books, setBooks] = useState<book[]>([]);
  const [userName, setUserName] = useState<string | undefined | null>(
    undefined,
  );

  const loadUser = useCallback(() => {
    axios
      .get("/api/auth/me")
      .then((response) =>
        response.data.length < 39
          ? setUserName(response.data)
          : setUserName(null),
      )
      .catch(() => setUserName(null));
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
    <UserContext.Provider value={{ userName, setUserName }}>
      <Routes>
        <Route path={"/"} element={<BookGallery bookList={books} />} />
        <Route path={"/:isbn"} element={<DetailView />} />
        <Route element={<ProtectedRoute username={userName} />}>
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
    </UserContext.Provider>
  );
}

export default App;
