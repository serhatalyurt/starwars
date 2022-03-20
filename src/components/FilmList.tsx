import NavBar from "./NavBar";
import Autocomplete from "./Autocomplete";
import { useState } from "react";
import { FilmListItem, getFilms } from "../services/api";
import { Link, useSearchParams } from "react-router-dom";
import "./FilmList.css";
import Modal from "./Modal";
import Characters from "./Characters";

const FilmCard: React.FC<{ film: FilmListItem }> = ({ film }) => {
  const [showCharacters, setShowCharacters] = useState<boolean>(false);

  return (
    <div className="film-card">
      <header>
        <h2>{film.title}</h2>
      </header>
      <div>
        <strong>Director: </strong>
        <span>{film.director}</span>
      </div>
      <div>
        <strong>Release Date: </strong>
        <span>{film.release_date}</span>
      </div>
      <div>
        <strong>Producer: </strong>
        <span>{film.producer}</span>
      </div>
      <div className="film-card--links">
        <div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setShowCharacters(true);
            }}
          >
            characters
          </a>
          {showCharacters && (
            <Modal onClosed={() => setShowCharacters(false)}>
              <Characters urls={film.characters} film={film.title} />
            </Modal>
          )}
        </div>
        <div>
          <Link
            to={`/${encodeURIComponent(new URL(film.url).pathname)}`}
            key={film.episode_id}
          >
            details
          </Link>
        </div>
      </div>
    </div>
  );
};

const FilmList: React.FC = () => {
  const [films, setFilms] = useState<FilmListItem[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <>
      <NavBar>
        <Autocomplete
          filterType="data"
          service={getFilms}
          nameProp={"title"}
          keyProp={"url"}
          onFiltered={(filter, results) => {
            setSearchParams({ filter: encodeURIComponent(filter) });
            setFilms(results);
          }}
          initialFilter={
            searchParams.has("filter")
              ? decodeURIComponent(searchParams.get("filter") as string)
              : ""
          }
        />
      </NavBar>
      <main className="film-list">
        {films.map((film) => (
          <FilmCard key={film.url} film={film} />
        ))}
      </main>
    </>
  );
};

export default FilmList;
