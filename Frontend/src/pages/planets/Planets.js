import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

//director=planet
//movie=satellite
const Planets = () => {
  const [planets, setPlanets] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchPlanets = () => {
    axios.get('http://localhost:8000/api/planets')
      .then(response => {
        setPlanets(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the planets!', error);
      });
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  // Soft delete function: Updates isDeleted to true instead of actually deleting the planet
  const deletePlanet = (id) => {
    axios.delete(`http://localhost:8000/api/planets/${id}`) // Send DELETE request (soft delete)
      .then(() => {
        setSuccessMessage('Planet deleted successfully!'); // Show success message
        fetchPlanets(); // Refresh the list after deletion (actually soft delete)
        setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
      })
      .catch(error => {
        console.error('There was an error deleting the planet!', error);
      });
  };

  return (
    <div className="directors-container">
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <div className="text-end">
        <Link to="/add-planet" className="btn btn-primary">Add Planet</Link> {/* Link to Add Planet page */}
      </div>

      <div>
        <h2>Planets List</h2>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Type</th>
            <th>Is Deleted</th> {/* Display Is Deleted status */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {planets.map((planet, index) => (
            <tr key={planet.id}>
              <td>{index + 1}</td>
              <td>{planet.name}</td>
              <td>{planet.type}</td>
              <td>{planet.is_deleted ? 'Yes' : 'No'}</td> {/* Display Yes if isDeleted is true */}
              <td>
                <Link to={`/edit-planet/${planet.id}`} className="btn btn-success">Edit Planet</Link> {/* Navigate to Edit Page */}
                <button className="btn btn-danger" onClick={() => deletePlanet(planet.id)}>Delete</button> {/* Soft delete by setting isDeleted to true */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Planets;
