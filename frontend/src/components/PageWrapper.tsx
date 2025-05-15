import type { ReactNode } from "react";

export default function PageWrapper(props: { children: ReactNode }) {
  return (
    <div className={"pt-5 flex justify-center bg-blue-300"}>
      <div className={"max-w-[1000px]"}>{props.children}</div>
    </div>
  );
}
