import BookGallery from "./components/BookGallery.tsx";
import type { book } from "./types/book/book.ts";
import { useEffect, useState } from "react";
import axios from "axios";
import AddBookForm from "./components/AddBookForm.tsx";
import {Routes, Route} from "react-router-dom";
import DetailView from "./components/DetailView.tsx";

function App() {
  const [books, setBooks] = useState<book[]>([]);

  useEffect(() => {
    axios
      .get<book[]>("/api")
      .then((response) => setBooks(response.data))
      .catch((e) => console.error(e));
  }, []);

  return (
      <Routes>
          <Route path={"/"} element={<BookGallery bookList={books}/>}/>
          <Route path={"/newBook"} element={<AddBookForm/>}/>
          <Route path={"/:isbn"} element={<DetailView/>}/>
      </Routes>
  )
}

export default App;
