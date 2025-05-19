import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import type { book } from "../../types/book/book.ts";
import axios from "axios";
import ButtonComponent from "../ButtonComponent.tsx";
import { useNavigate, useParams } from "react-router-dom";
import PageWrapper from "../layout/PageWrapper.tsx";

type EditAddBookFormProps = {
  getAllBooksCallback: () => void;
};

export const formstyle: string = "border rounded-[5px] p-2 shadow";

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

  function handleOnChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
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

  const labelClassName = "flex flex-col";

  return (
    <PageWrapper>
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-5">
        <label className={labelClassName}>
          <span>ISBN:</span>
          <input
            name={"isbn"}
            type={"number"}
            onChange={handleOnChange}
            className={formstyle}
            value={book.isbn || undefined}
            disabled={!!isbn}
          />
        </label>
        <label className={labelClassName}>
          Titel:
          <input
            name={"title"}
            onChange={handleOnChange}
            className={formstyle}
            value={book.title}
          />
        </label>
        <label className={labelClassName}>
          Autor:
          <input
            name={"author"}
            onChange={handleOnChange}
            className={formstyle}
            value={book.author}
          />
        </label>
        <label className={labelClassName}>
          Beschreibung:
          <textarea
            name={"summary"}
            onChange={handleOnChange}
            className={formstyle}
            value={book.summary}
            rows={10}
          />
        </label>
        <label className={labelClassName}>
          Bild:
          <input
            name={"image"}
            onChange={handleOnChange}
            className={formstyle}
            value={book.image}
          />
        </label>
        <label className={labelClassName}>
          Anzahl:
          <input
            name={"totalAmount"}
            type={"number"}
            onChange={handleOnChange}
            className={formstyle}
            value={String(book.totalAmount)}
          />
        </label>
        <label className={labelClassName}>
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
