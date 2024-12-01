import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../components/Styles/MovieList.css";
import { LoginContext } from "./context/LoginContext";

export const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [visibleMovie, setVisibleMovies] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchValue, setSearchValue] = useState("");

  const { isLogin, setLogin } = useContext(LoginContext);

  async function FetchMovies() {
    try {
      let response = await axios.get(
        `https://reactmovieappdb-default-rtdb.firebaseio.com/movies.json`
      );
      console.log(response.data);
      let arr = [];

      for (let key in response.data) {
        // here i did one mistake previously not given response.data[key] only response.data
        // thats why was not spreading the data correctly
        arr.push({ id: key, ...response.data[key] });
      }
      setMovies([...arr]);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id) {
    try {
      let wantToDelete = confirm("Are you sure?");

      wantToDelete &&
        (await axios.delete(
          `https://reactmovieappdb-default-rtdb.firebaseio.com/movies/${id}.json`
        ));
      alert("Movie deleted successfully.");
      FetchMovies();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const filteredArr = movies
      .filter((movie = {}) => {
        const { title = "" } = movie || {};
        return title.toLowerCase()?.includes(searchValue?.toLowerCase());
      })
      .sort((a, b) => {
        if (sortOrder === "asc") {
          return a.year - b.year;
        } else {
          return b.year - a.year;
        }
      });

    // for string sorting
    // function (a, b) {
    //       return b.name.localeCompare(a.name);
    //     });
    //---
    setVisibleMovies(filteredArr);
  }, [sortOrder, searchValue, movies]);

  useEffect(() => {
    FetchMovies();
  }, []);
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search movie by title"
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />

        <button
          onClick={() => {
            setLogin(!isLogin);
          }}
        >
          {isLogin ? "Logged Out" : "Click to Login"}
        </button>

        <label htmlFor="sortOption">Sort by Year</label>
        <select
          name=""
          id="sortValue"
          onChange={(e) => {
            console.log({ e });
            setSortOrder(e.target.value);
          }}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      {isLogin && (
        <div>
          <h1 className="heading">Movies List</h1>

          <table className="movie-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Release Year</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleMovie.map((movie) => {
                return (
                  <tr key={movie.id}>
                    <td>{movie.title}</td>
                    <td>{movie.description}</td>
                    <td>{movie.year}</td>
                    <td>
                      <Link to={`/edit/${movie.id}`} className="edit-btn">
                        Edit ✍️
                      </Link>
                      <button
                        onClick={() => handleDelete(movie.id)}
                        className="delete-btn"
                      >
                        Delete ❎
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
