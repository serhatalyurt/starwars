import { useEffect, useState } from "react";
import { CharacterListItem, getCharacter } from "../services/api";
import "./Characters.css";

const CharacterCard: React.FC<{ character: CharacterListItem }> = ({
  character,
}) => {
  return (
    <div className="character-list--item">
      <header>
        <h4>{character.name}</h4>
      </header>
      <div>
        <strong>Eye Color: </strong>
        <span style={{ backgroundColor: character.eye_color }}>
          &nbsp;&nbsp;&nbsp;&nbsp;
        </span>
      </div>
      <div>
        <strong>Birth Year: </strong>
        <span>{character.birth_year}</span>
      </div>
      <div>
        <strong>Gender: </strong>
        <span>{character.gender}</span>
      </div>
      <div>
        <strong>Hair Color: </strong>
        <span>{character.hair_color}</span>
      </div>
      <div>
        <strong>Height: </strong>
        <span>{character.height}</span>
      </div>
      <div>
        <strong>Mass: </strong>
        <span>{character.mass}</span>
      </div>
    </div>
  );
};

const Characters: React.FC<{ urls: string[]; film: string }> = ({
  urls,
  film,
}) => {
  const [characters, setCharacters] = useState<CharacterListItem[]>([]);
  useEffect(() => {
    const controller = new AbortController();
    Promise.all(Array.from(urls.map((url) => getCharacter(url, controller))))
      .then((res) => {
        setCharacters(res.sort((a, b) => (a.name > b.name ? 1 : -1)));
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <>
      {characters.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2>
            Characters of <em>{film}</em>
          </h2>
          <div className="character-list">
            {characters.map((character, index) => (
              <CharacterCard key={index} character={character} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Characters;
