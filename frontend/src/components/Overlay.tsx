import type { ReactNode } from "react";

type OverlayProps = {
  children: ReactNode;
  id: string;
};

export default function Overlay({ children, id }: OverlayProps) {
  return (
    <dialog
      id={id}
      className={
        "place-self-center p-10 border rounded-2xl backdrop:backdrop-blur-xs"
      }
    >
      {children}
    </dialog>
  );
}
