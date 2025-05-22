import type { book } from "../types/book/book.ts";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "./ButtonComponent.tsx";
import Label from "./Label.tsx";

type BookCardProps = {
  book: book;
};

export const placeholderImage = "src/assets/default-picture.png";
export default function BookCard({ book }: BookCardProps) {
  const navigate = useNavigate();
  const totalAvailable: number = book.totalAmount - book.totalBookedAmount;

  return (
    <div className="flex flex-col justify-between p-5 rounded-[5px] h-100 bg-white shadow-2xl">
      <div className={"grid"}>
        <img
          src={book.image || placeholderImage}
          alt={"something"}
          className={"max-h-60 justify-self-center"}
          onError={(e) => (e.currentTarget.src = placeholderImage)}
        />
        <p className={"justify-self-center max-w-full truncate font-bold"}>
          {book.title}
        </p>
        <p className={"justify-self-center max-w-full truncate italic"}>
          {book.author}
        </p>
        <Label
          styling={
            totalAvailable > 0
              ? "bg-[#8EB19D] justify-self-center"
              : "bg-[#DA627D] justify-self-center"
          }
          stringLabel={totalAvailable > 0 ? "Verfügbar" : "Nicht verfügbar"}
        />
      </div>
      <ButtonComponent
        label={"Details"}
        onClick={() => navigate(`/${book.isbn}`)}
        className={"w-full justify-self-center"}
      />
    </div>
  );
}
