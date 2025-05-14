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
    <div className="p-5 border rounded-[5px]">
      <img src={book.image} alt={"something"} />
      <h2>{book.title}</h2>
      <p>{book.author}</p>
      <p>
        {totalAvailable}/{book.totalAmount}
      </p>
      <ButtonComponent
        label={"Details"}
        onClick={() => navigate(`/${book.isbn}`)}
      />
    </div>
  );
}
