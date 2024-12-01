import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import { MoviesList } from "./components/MoviesList";
import { AddMovies } from "./components/AddMovies";
import { EditMovie } from "./components/EditMovie";
import "./components/Styles/Navbar.css";
function App() {
  return (
    <>
      <div className="navbar">
        <Link to={`/`} className="nav-item">
          Movies List 🎥
        </Link>
        <Link to={`/add`}>Add Movie 👈</Link>
      </div>
      <Routes>
        <Route path="/" element={<MoviesList />}></Route>
        <Route path="/add" element={<AddMovies />}></Route>
        <Route path="/edit/:id" element={<EditMovie />}></Route>
      </Routes>
    </>
  );
}

export default App;
