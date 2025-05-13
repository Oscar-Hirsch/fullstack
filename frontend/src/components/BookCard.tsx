import type { book } from "../types/book/book.ts";

type BookCardProps = {
  book: book;
};

export default function BookCard({ book }: BookCardProps) {
  const totalAvailable: number = book.totalAmount - book.totalBookedAmount;

  return (
    <div className="p-5 border rounded-[5px]">
      <img src={book.image} alt={"something"} />
      <h2>{book.title}</h2>
      <p>{book.author}</p>
      <p>
        {totalAvailable}/{book.totalAmount}
      </p>
    </div>
  );
}
