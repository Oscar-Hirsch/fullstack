import BookCard from "./BookCard.tsx";
import type {book} from "../types/book/book.ts";
import Searchbar from "./Searchbar.tsx";
import {useState} from "react";

type galleryProps = {
    bookList:book[]
}


export default function BookGallery({bookList}:galleryProps) {
    const [searchString, setSearchString] = useState<string>("")
    const filteredList = bookList.filter(book => book.title.includes(searchString))

    return (
        <>
            <Searchbar setSearchString={setSearchString} searchString={searchString}/>
            {
                filteredList.map(book =>
                <BookCard book={book} key={book.isbn}/>)
            }
        </>
    )
}