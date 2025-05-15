import type { book } from "../types/book/book.ts";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "./ButtonComponent.tsx";

type BookCardProps = {
  book: book;
};

export default function BookCard({ book }: BookCardProps) {
  const totalAvailable: number = book.totalAmount - book.totalBookedAmount;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-between p-5 border rounded-[5px] h-100">
      <div>
        <img
          src={book.image}
          alt={"something"}
          className={"max-h-60 col-span-2"}
        />
        <p>Titel: {book.title}</p>
        <p> Autor: {book.author}</p>
        <p className={totalAvailable > 0 ? "text-green-600" : "text-red-600"}>
          {totalAvailable > 0 ? "Verfügbar" : "Nicht verfügbar"}
        </p>
      </div>
      <ButtonComponent
        label={"Details"}
        onClick={() => navigate(`/${book.isbn}`)}
        className={"w-full"}
      />
    </div>
  );
}
