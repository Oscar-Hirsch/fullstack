import type {ReactNode} from "react";


export default function PageWrapper(props:{children:ReactNode}) {

    return (
        <div className={"max-w-[1000px] m-auto mt-5"}>
            {props.children}
        </div>
    )
}