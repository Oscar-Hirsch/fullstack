import { useLocation, useNavigate } from "react-router-dom";
import Searchbar from "../Searchbar.tsx";
import { useContext } from "react";
import { SearchContext } from "../SearchContext.tsx";
import ButtonComponent from "../ButtonComponent.tsx";

export default function Header() {
  const location = useLocation();
  const { searchString, setSearchString } = useContext(SearchContext);
  const navigate = useNavigate();
  const host =
    window.location.host === "localhost:5173"
      ? "http://localhost:8080"
      : window.location.origin;

  return (
    <div className="flex p-3 items-center justify-between">
      <h1 className="text-3xl">Library</h1>
      {location.pathname === "/" ? (
        <>
          <Searchbar
            setSearchString={setSearchString}
            searchString={searchString}
          />
          <ButtonComponent
            onClick={() => navigate("/newBook")}
            label="Buch hinzufügen"
          />
        </>
      ) : (
        <ButtonComponent onClick={() => navigate("/")} label={"Zurück"} />
      )}
      <ButtonComponent
        label={"Login"}
        onClick={() =>
          window.open(host + "/oauth2/authorization/github", "_self")
        }
      />
    </div>
  );
}
