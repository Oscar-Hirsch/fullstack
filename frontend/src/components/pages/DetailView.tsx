import type { book } from "../../types/book/book.ts";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ButtonComponent from "../ButtonComponent.tsx";
import PageWrapper from "../layout/PageWrapper.tsx";
import Label from "../Label.tsx";
import Overlay from "../Overlay.tsx";
import { placeholderImage } from "../BookCard.tsx";

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
    if (book.totalBookedAmount >= book.totalAmount) return;
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
    if (book.totalBookedAmount <= 0) return;
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
    <PageWrapper>
      {book ? (
        <div className={"grid grid-cols-[auto_auto] gap-8"}>
          <img
            src={book.image || placeholderImage}
            alt={"Cover of " + book.title}
            className={"row-span-3 max-w-[350px] max-h-4xl"}
            onError={(e) => (e.currentTarget.src = placeholderImage)}
          />
          <div className={"grid grid-cols-[1fr_6fr] gap-2"}>
            <h1 className={"col-span-2 text-3xl mb-5"}>{book.title}</h1>
            <p>Titel:</p>
            <p>{book.title}</p>
            <p>ISBN:</p>
            <p>{book.isbn}</p>
            <p> Autor:</p>
            <p> {book.author}</p>
            <p>Verfügbar:</p>
            <Label
              styling={totalAvailable > 0 ? "bg-[#8EB19D]" : "bg-[#DA627D]"}
              stringLabel={`${totalAvailable}/${book.totalAmount}`}
            />
          </div>
          <div className={"space-x-4"}>
            <ButtonComponent
              onClick={handleBookLending}
              label={"Ausleihen"}
              disabled={totalAvailable <= 0}
            />
            <ButtonComponent
              onClick={handleBookReturn}
              label={"Zurückgeben"}
              disabled={book.totalBookedAmount <= 0}
            />
          </div>
          <div>
            <p>Beschreibung</p>
            <p
              className={
                "overflow-y-scroll h-[200px] whitespace-pre-wrap shadow-2xl border border-black rounded-2xl p-2"
              }
            >
              {book.summary}
            </p>
          </div>

          <div className={"space-x-4"}>
            <ButtonComponent
              onClick={() =>
                (
                  document.getElementById("löschenOverlay") as HTMLDialogElement
                ).showModal()
              }
              label={"Löschen"}
            />
            <ButtonComponent
              onClick={() => navigate(`/${isbn}/edit`)}
              label={"Bearbeiten"}
            />
          </div>
          <Overlay id={"löschenOverlay"}>
            <p className={"mb-2"}>Möchtest du dieses Buch wirklich löschen?</p>
            <div className={"grid grid-cols-2 gap-7"}>
              <ButtonComponent
                label={"Abbrechen"}
                onClick={() =>
                  (
                    document.getElementById(
                      "löschenOverlay",
                    ) as HTMLDialogElement
                  ).close()
                }
              />
              <ButtonComponent label={"Löschen"} onClick={handleDelete} />
            </div>
          </Overlay>
        </div>
      ) : (
        <p>Nothing here</p>
      )}
    </PageWrapper>
  );
}
