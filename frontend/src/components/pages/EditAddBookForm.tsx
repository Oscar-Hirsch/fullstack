import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import type { book } from "../../types/book/book.ts";
import axios from "axios";
import ButtonComponent from "../ButtonComponent.tsx";
import { useNavigate, useParams } from "react-router-dom";
import PageWrapper from "../layout/PageWrapper.tsx";

type EditAddBookFormProps = {
  getAllBooksCallback: () => void;
};

export default function EditAddBookForm(props: EditAddBookFormProps) {
  const { isbn } = useParams();
  const [book, setBook] = useState<book>({
    isbn: null,
    title: "",
    author: "",
    summary: "",
    image: "",
    totalAmount: 0,
    totalBookedAmount: 0,
  });

  useEffect(() => {
    if (isbn)
      axios.get(`/api/${isbn}`).then((response) => setBook(response.data));
  }, [isbn]);

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    setBook((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  }

  function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isbn)
      axios
        .put(`/api/${isbn}`, book)
        .then(() => {
          props.getAllBooksCallback();
          navigate(`/${isbn}`);
        })
        .catch((error) => console.log(error));
    else
      axios
        .post("/api/newBook", book)
        .then(() => {
          props.getAllBooksCallback();
          navigate("/");
        })
        .catch((error) => console.log(error));
  }

  const navigate = useNavigate();
  const formstyle: string = "border";

  return (
    <PageWrapper>
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-5">
        <label>
          ISBN:
          <input
            name={"isbn"}
            type={"number"}
            onChange={handleOnChange}
            className={formstyle}
            value={book.isbn || undefined}
            disabled={!!isbn}
          />
        </label>
        <label>
          Titel:
          <input
            name={"title"}
            type={"string"}
            onChange={handleOnChange}
            className={formstyle}
            value={book.title}
          />
        </label>
        <label>
          Autor:
          <input
            name={"author"}
            type={"string"}
            onChange={handleOnChange}
            className={formstyle}
            value={book.author}
          />
        </label>
        <label>
          Beschreibung:
          <input
            name={"summary"}
            type={"string"}
            onChange={handleOnChange}
            className={formstyle}
            value={book.summary}
          />
        </label>
        <label>
          Bild:
          <input
            name={"image"}
            type={"string"}
            onChange={handleOnChange}
            className={formstyle}
            value={book.image}
          />
        </label>
        <label>
          Anzahl:
          <input
            name={"totalAmount"}
            type={"number"}
            onChange={handleOnChange}
            className={formstyle}
            value={String(book.totalAmount)}
          />
        </label>
        <label>
          Ausgeliehen:
          <input
            name={"totalBookedAmount"}
            type={"number"}
            onChange={handleOnChange}
            className={formstyle}
            value={String(book.totalBookedAmount)}
          />
        </label>
        <ButtonComponent label={"Submit"} />
      </form>
    </PageWrapper>
  );
}
