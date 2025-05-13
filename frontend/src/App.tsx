import BookGallery from "./components/BookGallery.tsx";
import type { book } from "./types/book/book.ts";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [books, setBooks] = useState<book[]>([]);

  useEffect(() => {
    axios
      .get<book[]>("/api")
      .then((response) => setBooks(response.data))
      .catch((e) => console.error(e));
  }, []);

  return <BookGallery bookList={books} />;
}

export default App;
