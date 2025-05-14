import type { book } from "../types/book/book.ts";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ButtonComponent from "./ButtonComponent.tsx";

export default function DetailView() {
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
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/${isbn}`).then((response) => setBook(response.data));
  }, [isbn]);

  function handleBookLending() {
    //use effect total booked amount for dependency array
    axios
      .put(`/api/${isbn}`, {
        ...book,
        totalBookedAmount: book!.totalBookedAmount + 1,
      })
      .then((response) => setBook(response.data))
      .catch((error) => console.log(error));
  }

  function handleBookReturn() {
    //use effect total booked amount for dependency array
    axios
      .put(`/api/${isbn}`, {
        ...book,
        totalBookedAmount: book!.totalBookedAmount - 1,
      })
      .then((response) => setBook(response.data))
      .catch((error) => console.log(error));
  }

  function handleDelete() {
    axios
      .delete(`/api/${isbn}`)
      .then(() => navigate("/"))
      .catch((error) => console.log(error));
  }

  const totalAvailable: number = book.totalAmount - book.totalBookedAmount;

  return (
    <>
      {book ? (
        <div className={"grid grid-cols-2 gap-2"}>
          <img
            src={book.image}
            alt={"Cover of " + book.title}
            className={"row-span-2"}
          />
          <div>
            <p>Titel: {book.title}</p>
            <p>ISBN: {book.isbn}</p>
            <p>Autor: {book.author}</p>
            <p>
              {totalAvailable}/{book.totalAmount}
            </p>
            <ButtonComponent onClick={handleBookLending} label={"Ausleihen"} />
            <ButtonComponent onClick={handleBookReturn} label={"Zurückgeben"} />
          </div>
          <div>
            <p>Beschreibung: {book.summary}</p>
          </div>
          <div>
            <ButtonComponent onClick={handleDelete} label={"Löschen"} />
            <ButtonComponent
              onClick={() => navigate(`/${isbn}/edit`)}
              label={"Bearbeiten"}
            />
          </div>
        </div>
      ) : (
        <p>Nothing here</p>
      )}
    </>
  );
}
