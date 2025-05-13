import './App.css'
import BookGallerie from "./components/BookGallerie.tsx";
import type {book} from "./types/book/book.ts";

function App() {

    const book:book = {
        isbn: 324233,
        title:"string",
        author:"string",
        summary:"string",
        image:"string",
        totalAmount:3,
        totalBookedAmount:4}

    const book2:book = {
        isbn: 324213,
        title:"string",
        author:"string",
        summary:"string",
        image:"string",
        totalAmount:3,
        totalBookedAmount:4}
    const bookList:book[] = [book,book2]


  return (
    <>
      <BookGallerie bookList={bookList}></BookGallerie>
    </>
  )
}

export default App
