import type {book} from "../types/book/book.ts";
import {useParams} from "react-router-dom";
import axios from "axios";
import {useState} from "react";
import BookCard from "./BookCard.tsx";

export default function DetailView() {

    const {isbn} = useParams()
    const [book, setBook] = useState<book>()

    axios.get(`/api/${isbn}`).then(response =>
        setBook(response.data))


    return (
        <>
            {
            book ?
            <BookCard book={book}/> : <p>Nothing here</p>
        }
        </>
    )
}