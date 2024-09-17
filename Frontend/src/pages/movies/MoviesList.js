import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/movies')
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the movies!', error);
      });
  }, []);

  const deleteMovie = (id) => {
    axios.delete(`http://localhost:8000/api/movies/${id}`)
      .then(() => {
        setMovies(movies.filter(movie => movie.id !== id)); // Remove the movie from the list
      })
      .catch(error => {
        console.error('There was an error deleting the movie!', error);
      });
  };

  return (
    <div>
      <h2>Movies List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Release Year</th>
            <th>Director</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie, index) => (
            <tr key={movie.id}>
              <td>{index + 1}</td>
              <td>{movie.title}</td>
              <td>{movie.release_year}</td>
              <td>{movie.director.name}</td>
              <td>
                <Link to={`/edit-movie/${movie.id}`} className="btn btn-success">Edit</Link>
                <button className="btn btn-danger" onClick={() => deleteMovie(movie.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/add-movie" className="btn btn-primary">Add Movie</Link>
    </div>
  );
};

export default MoviesList;
