import { Outlet, Route, Routes } from "react-router-dom";
import FilmDetail from "./components/FilmDetail";
import FilmList from "./components/FilmList";
import NoMatch from "./components/NoMatch";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<FilmList />} />
        <Route path=":filmPathName" element={<FilmDetail />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};

export default App;
