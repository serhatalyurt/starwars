export type FilmListItem = {
  episode_id: number;
  title: string;
  url: string;
  opening_crawl: string;
  release_date: string;
  producer: string;
  director: string;
  characters: string[];
};

export type CharacterListItem = {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
};

const host = "https://swapi.dev";
export const getFilms = async (
  filter: string,
  controller: AbortController
): Promise<FilmListItem[]> => {
  const signal = controller.signal;
  const data = await fetch(
    `${host}/api/films/${filter && "?search=" + encodeURI(filter)}`,
    {
      signal,
    }
  );
  const res = await data.json();
  return res.results;
};

export const getFilm = async (pathname: string): Promise<FilmListItem> => {
  return fetch(`${host}${pathname}`).then((data) => data.json());
};

export const getCharacter = async (
  url: string,
  controller: AbortController
): Promise<CharacterListItem> => {
  const signal = controller.signal;
  return fetch(url, {
    signal,
  }).then((data) => data.json());
};
