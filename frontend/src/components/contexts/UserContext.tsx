import { createContext } from "react";

export const UserContext = createContext<{
  userName: string | null | undefined;
  setUserName: (userName: string | null) => void;
}>({
  userName: undefined,
  setUserName: () => {},
});
