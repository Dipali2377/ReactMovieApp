import { useState } from "react";
import axios from "axios";
let initialState = {
  title: "",
  description: "",
  year: "",
};
export const AddMovies = () => {
  const [movie, setMovie] = useState(initialState);

  function handleChange(e) {
    // here i have changed the initial state of movie and then updated it with new values
    // that i took from input element from the target and assigned to the movie object
    let { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  }
  async function handleClick(e) {
    e.preventDefault();
    try {
      await axios.post(
        `https://reactmovieappdb-default-rtdb.firebaseio.com/movies.json`,
        movie
      );
      alert("Movie added successfully..!");
      setMovie(initialState);
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
        <button onClick={handleClick}>Add Movie</button>
      </div>
    </div>
  );
};
