import type { ReactNode } from "react";
import Header from "./Header.tsx";

export default function PageWrapper(props: { children: ReactNode }) {
  return (
    <div className={"mt-5 m-auto px-5 max-w-[1040px] font-roboto"}>
      <Header />
      {props.children}
    </div>
  );
}
