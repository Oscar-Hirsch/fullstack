import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
  username: string | undefined | null;
};

export default function ProtectedRoute({ username }: ProtectedRouteProps) {
  if (username === undefined) {
    return <>Loading...</>;
  }

  return username ? <Outlet /> : <Navigate to={"/"} />;
}
