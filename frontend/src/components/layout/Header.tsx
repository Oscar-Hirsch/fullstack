import { useLocation, useNavigate } from "react-router-dom";
import Searchbar from "../Searchbar.tsx";
import { useContext } from "react";
import { SearchContext } from "../contexts/SearchContext.tsx";
import ButtonComponent from "../ButtonComponent.tsx";
import { UserContext } from "../contexts/UserContext.tsx";

export default function Header() {
  const location = useLocation();
  const { searchString, setSearchString } = useContext(SearchContext);
  const { userName } = useContext(UserContext);
  const navigate = useNavigate();
  const host =
    window.location.host === "localhost:5173"
      ? "http://localhost:8080"
      : window.location.origin;

  return (
    <div className="flex py-3 flex-col items-center">
      <h1 className="text-3xl">Library</h1>
      <div className="flex py-3 items-center justify-between w-full">
        {location.pathname === "/" ? (
          <>
            <ButtonComponent
              onClick={() => navigate("/newBook")}
              label="Buch hinzufügen"
              disabled={!userName}
            />
            <Searchbar
              setSearchString={setSearchString}
              searchString={searchString}
            />
          </>
        ) : (
          <ButtonComponent
            onClick={() =>
              location.pathname.includes("edit") ? navigate(-1) : navigate("/")
            }
            label={"Zurück"}
          />
        )}
        {userName ? (
          <button onClick={() => window.open(host + "/logout", "_self")}>
            Hallo {userName} ☺️
          </button>
        ) : (
          <ButtonComponent
            label={"Login"}
            onClick={() =>
              window.open(host + "/oauth2/authorization/github", "_self")
            }
          />
        )}
      </div>
    </div>
  );
}
