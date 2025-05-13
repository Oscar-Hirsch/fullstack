import BookCard from "./BookCard.tsx";
import type {book} from "../types/book/book.ts";
import Searchbar from "./Searchbar.tsx";
import {useState} from "react";

type gallerieProps = {
    bookList:book[]
}


export default function BookGallerie({bookList}:gallerieProps) {
    const [searchString, setSearchString] = useState<string>("")
    const filteredList = bookList.filter(book => book.title.includes(searchString))

    return (
        <>
            <Searchbar setSearchString={setSearchString} searchString={searchString}/>
            {
                filteredList.map(book =>
                <BookCard book={book}/>)
            }
        </>
    )
}