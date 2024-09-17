import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// movies=satellites

const SatellitesList = () => {
  const [satellites, setSatellites] = useState([]);
  const [successMessage, setSuccessMessage] = useState(''); // Declare success message state

  // Define fetchSatellites function to fetch the list of satellites
  const fetchSatellites = () => {
    axios.get('http://localhost:8000/api/satellites')
      .then(response => {
        setSatellites(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the satellites!', error);
      });
  };

  useEffect(() => {
    fetchSatellites(); // Call fetchSatellites when component mounts
  }, []);

  const deleteSatellite = (id) => {
    axios.delete(`http://localhost:8000/api/satellites/${id}`)
    .then(() => {
      setSuccessMessage('Satellite deleted successfully!'); // Show success message
      fetchSatellites(); // Refresh the list after deletion
      setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
    })
    .catch(error => {
      console.error('There was an error deleting the satellite!', error);
    });
  };

  return (
    <div>
      {successMessage && <div className="alert alert-success">{successMessage}</div>} {/* Show success message */}

      <h2>Satellites List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Is Deleted</th>
            <th>Planet</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {satellites.map((satellite, index) => (
            <tr key={satellite.id}>
              <td>{index + 1}</td>
              <td>{satellite.name}</td>
              <td>{satellite.is_deleted ? 'Yes' : 'No'}</td> {/* Display Yes if isDeleted is true */}
              <td>{satellite.planet.name}</td>
              <td>
                <Link to={`/edit-satellite/${satellite.id}`} className="btn btn-success">Edit</Link>
                <button className="btn btn-danger" onClick={() => deleteSatellite(satellite.id)}>Delete</button> {/* Fix typo */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/add-satellite" className="btn btn-primary">Add Satellite</Link>
    </div>
  );
};

export default SatellitesList;
