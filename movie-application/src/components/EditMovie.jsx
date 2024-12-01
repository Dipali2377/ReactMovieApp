import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

let initialState = {
  title: "",
  description: "",
  year: "",
};

export const EditMovie = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(initialState);

  async function GetMovie() {
    let response = await axios.get(
      `https://reactmovieappdb-default-rtdb.firebaseio.com/movies/${id}.json`
    );
    setMovie(response.data);
  }
  useEffect(() => {
    GetMovie();
  }, []);

  function handleChange(e) {
    // here i have changed the initial state of movie and then updated it with new values
    // that i took from input element from the target and assigned to the movie object
    let { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  }

  async function handleUpdate() {
    try {
      await axios.put(
        `https://reactmovieappdb-default-rtdb.firebaseio.com/movies/${id}.json`,
        movie
      );
      alert("Movie updated successfully");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter movie title"
          name="title"
          value={movie.title}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter description"
          name="description"
          value={movie.description}
          onChange={handleChange}
        ></input>
        <input
          type="text"
          placeholder="Enter release year"
          name="year"
          value={movie.year}
          onChange={handleChange}
        />
        <button onClick={handleUpdate}>Edit</button>
      </div>
    </div>
  );
};
