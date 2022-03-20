import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FilmListItem, getFilm, getFilms } from "../services/api";
import Autocomplete from "./Autocomplete";
import NavBar from "./NavBar";
import "./FilmDetail.css";
import Modal from "./Modal";
import Characters from "./Characters";

const FilmDetail: React.FC = () => {
  let params = useParams<{ filmPathName: string }>();
  const [film, setFilm] = useState<FilmListItem | null>(null);
  let navigate = useNavigate();
  const onFilmSelected = (index: number, key: string, film: FilmListItem) => {
    navigate(`/${encodeURIComponent(new URL(film.url).pathname)}`);
  };
  const [showCharacters, setShowCharacters] = useState<boolean>(false);
  useEffect(() => {
    getFilm(decodeURIComponent(params.filmPathName as string)).then((res) =>
      setFilm(res)
    );
    return () => {
      setFilm(null);
    };
  }, [params.filmPathName]);
  return (
    <>
      <NavBar>
        <span>&nbsp;| {film ? film.title : "  Loading..."}</span>
        <Autocomplete
          filterType="select"
          service={getFilms}
          nameProp={"title"}
          keyProp={"episode_id"}
          onSelected={onFilmSelected}
        />
      </NavBar>
      {film ? (
        <main className="film-detail">
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
          <div>
            <strong>Opening Crawl: </strong>
            <article>{film.opening_crawl}</article>
          </div>
          <div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowCharacters(true);
              }}
            >
              Show Characters
            </a>
            {showCharacters && (
              <Modal onClosed={() => setShowCharacters(false)}>
                <Characters urls={film.characters} film={film.title} />
              </Modal>
            )}
          </div>
        </main>
      ) : (
        <div>" Loading..."</div>
      )}
    </>
  );
};

export default FilmDetail;
