import { useLocation, useNavigate } from "react-router-dom";
import Searchbar from "../Searchbar.tsx";
import { useCallback, useContext, useEffect, useState } from "react";
import { SearchContext } from "../SearchContext.tsx";
import ButtonComponent from "../ButtonComponent.tsx";
import axios from "axios";

export default function Header() {
  const location = useLocation();
  const { searchString, setSearchString } = useContext(SearchContext);
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();
  const host =
    window.location.host === "localhost:5173"
      ? "http://localhost:8080"
      : window.location.origin;

  const loadUser = useCallback(() => {
    axios
      .get("/api/auth/me")
      .then((response) =>
        response.data.length < 39
          ? setUsername(response.data)
          : setUsername(""),
      );
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <div className="flex p-3 flex-col items-center">
      <h1 className="text-3xl">Library</h1>
      <div className="flex p-3 items-center justify-between w-full">
        {location.pathname === "/" ? (
          <>
            <ButtonComponent
              onClick={() => navigate("/newBook")}
              label="Buch hinzufügen"
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
        {username !== "" ? (
          <p>Hallo {username} ☺️</p>
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
