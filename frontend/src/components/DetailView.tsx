import type { book } from "../types/book/book.ts";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import BookCard from "./BookCard.tsx";
import ButtonComponent from "./ButtonComponent.tsx";

export default function DetailView() {
  const { isbn } = useParams();
  const [book, setBook] = useState<book>();
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

  return (
    <>
      {book ? (
        <>
          <BookCard book={book} />
          <ButtonComponent onClick={handleBookLending} label={"Ausleihen"} />
          <ButtonComponent onClick={handleBookReturn} label={"Zurückgeben"} />
          <ButtonComponent onClick={handleDelete} label={"Löschen"} />
          <ButtonComponent
            onClick={() => navigate(`/${isbn}/edit`)}
            label={"Bearbeiten"}
          />
        </>
      ) : (
        <p>Nothing here</p>
      )}
    </>
  );
}
