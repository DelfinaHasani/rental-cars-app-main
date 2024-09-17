import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditMoviePage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [directorId, setDirectorId] = useState('');
  const [directors, setDirectors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/movies/${id}`)
      .then(response => {
        setTitle(response.data.title);
        setReleaseYear(response.data.release_year);
        setDirectorId(response.data.director_id);
      })
      .catch(error => {
        console.error('There was an error fetching the movie!', error);
      });

    axios.get('http://localhost:8000/api/directors')
      .then(response => {
        setDirectors(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the directors!', error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:8000/api/movies/${id}`, {
      title: title,
      release_year: releaseYear,
      director_id: directorId,
    })
    .then(response => {
      console.log('Movie updated!', response.data);
      navigate('/movies');
    })
    .catch(error => {
      console.error('There was an error updating the movie!', error);
    });
  };

  return (
    <div>
      <h2>Edit Movie</h2>
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
        <button type="submit" className="btn btn-primary">Update Movie</button>
      </form>
    </div>
  );
};

export default EditMoviePage;
