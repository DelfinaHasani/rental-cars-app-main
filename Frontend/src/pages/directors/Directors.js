import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Directors = () => {
  const [directors, setDirectors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchDirectors = () => {
    axios.get('http://localhost:8000/api/directors')
      .then(response => {
        setDirectors(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the directors!', error);
      });
  };

  useEffect(() => {
    fetchDirectors();
  }, []);

  const deleteDirector = (id) => {
    axios.delete(`http://localhost:8000/api/directors/${id}`)
      .then(() => {
        setSuccessMessage('Director deleted successfully!');
        fetchDirectors(); // Refresh the list after deletion
        setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
      })
      .catch(error => {
        console.error('There was an error deleting the director!', error);
      });
  };

  return (
    <div className="directors-container">
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <div className="text-end">
        <Link to="/add-director" className="btn btn-primary">Add Director</Link> {/* Link to Add Director page */}
      </div>

      <div>
        <h2>Directors List</h2>
    </div>

      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Birth Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {directors.map((director, index) => (
            <tr key={director.id}>
              <td>{index + 1}</td>
              <td>{director.name}</td>
              <td>{director.birth_year}</td>
              <td>
              <Link to={`/edit-director/${director.id}`} className="btn btn-success">Edit</Link> {/* Navigate to Edit Page */}
              <button className="btn btn-danger" onClick={() => deleteDirector(director.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default Directors;
