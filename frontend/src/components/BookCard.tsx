import type { book } from "../types/book/book.ts";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "./ButtonComponent.tsx";
import Label from "./Label.tsx";

type BookCardProps = {
  book: book;
};

export default function BookCard({ book }: BookCardProps) {
  const navigate = useNavigate();
  const totalAvailable: number = book.totalAmount - book.totalBookedAmount;

  return (
    <div className="flex flex-col items-center justify-between p-5 rounded-[5px] h-100 bg-white shadow-2xl">
      <div className={"flex flex-col items-center"}>
        <img
          src={book.image}
          alt={"something"}
          className={"max-h-60 col-span-2"}
        />
        <p>Titel: {book.title}</p>
        <p> Autor: {book.author}</p>
        <Label
          styling={totalAvailable > 0 ? "bg-[#8EB19D]" : "bg-[#DA627D]"}
          stringLabel={totalAvailable > 0 ? "Verfügbar" : "Nicht verfügbar"}
        ></Label>
      </div>
      <ButtonComponent
        label={"Details"}
        onClick={() => navigate(`/${book.isbn}`)}
        className={"w-full"}
      />
    </div>
  );
}
