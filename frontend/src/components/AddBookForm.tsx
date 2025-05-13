import {type ChangeEvent, type FormEvent, useState} from "react";
import type {book} from "../types/book/book.ts";
import axios from "axios";
import ButtonComponent from "./ButtonComponent.tsx";
import {useNavigate} from "react-router-dom";

export default function AddBookForm() {
    const defaultBook:book = {
        isbn:null,
        title:"",
        author:"",
        summary:"",
        image:"",
        totalAmount:0,
        totalBookedAmount:0
    }
    const [newBook, setNewBook] = useState<book>(defaultBook)

    function handleOnChange(e:ChangeEvent<HTMLInputElement>) {
        setNewBook(previous =>
            ({
                ...previous,
                [e.target.name]: e.target.value
            })
        )
    }

    function handleOnSubmit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault()
        axios.post("/api/newBook", newBook).catch(error => console.log(error))
    }

    const navigate = useNavigate()
    const formstyle:string = "border"

    return (
        <>
            <form onSubmit={handleOnSubmit}>
                <input name={"isbn"} type={"number"} onChange={handleOnChange} className={formstyle}/>
                <input name={"title"} type={"string"} onChange={handleOnChange} className={formstyle}/>
                <input name={"author"} type={"string"} onChange={handleOnChange} className={formstyle}/>
                <input name={"summary"} type={"string"} onChange={handleOnChange} className={formstyle}/>
                <input name={"image"} type={"string"} onChange={handleOnChange} className={formstyle}/>
                <input name={"totalAmount"} type={"number"} onChange={handleOnChange} className={formstyle}/>
                <input name={"totalBookedAmount"} type={"number"} onChange={handleOnChange} className={formstyle}/>
                <ButtonComponent label={"Submit"}/>
            </form>

            <ButtonComponent onClick={()=>navigate("/")} label={"Back"}/>

        </>
    )
}