import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddMoviePage = () => {
  const [title, setTitle] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [directorId, setDirectorId] = useState('');
  const [directors, setDirectors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/directors')
      .then(response => {
        setDirectors(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the directors!', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8000/api/movies', {
      title: title,
      release_year: releaseYear,
      director_id: directorId,
    })
    .then(response => {
      console.log('Movie added!', response.data);
      navigate('/movies');
    })
    .catch(error => {
      console.error('There was an error adding the movie!', error);
    });
  };

  return (
    <div>
      <h2>Add a Movie</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Release Year:</label>
          <input type="number" className="form-control" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Director:</label>
          <select className="form-control" value={directorId} onChange={(e) => setDirectorId(e.target.value)}>
            <option value="">Select Director</option>
            {directors.map(director => (
              <option key={director.id} value={director.id}>
                {director.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMoviePage;
