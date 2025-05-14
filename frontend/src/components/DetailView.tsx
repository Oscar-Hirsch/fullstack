import type {book} from "../types/book/book.ts";
import {useParams} from "react-router-dom";
import axios from "axios";
import {useState} from "react";
import BookCard from "./BookCard.tsx";
import ButtonComponent from "./ButtonComponent.tsx";

export default function DetailView() {

    const {isbn} = useParams()
    const [book, setBook] = useState<book>()

    axios.get(`/api/${isbn}`).then(response =>
        setBook(response.data))

    function handleBookLending() {
        //use effect total booked amount for dependency array
        axios.put(`/api/${isbn}`, {...book, totalBookedAmount: book!.totalBookedAmount+1})
            .then(response => setBook(response.data))
            .catch(error => console.log(error)
        )

    }

    function handleBookReturn() {
        //use effect total booked amount for dependency array
        axios.put(`/api/${isbn}`, {...book, totalBookedAmount: book!.totalBookedAmount-1})
            .then(response => setBook(response.data))
            .catch(error => console.log(error))
    }


    return (
        <> {
            book ?
                <>
                    <BookCard book={book}/>
                    <ButtonComponent onClick={handleBookLending} label={"Ausleihen"}/>
                    <ButtonComponent onClick={handleBookReturn} label={"Zurückgeben"}/>
                </> : <p>Nothing here</p>
        }

        </>
    )
}