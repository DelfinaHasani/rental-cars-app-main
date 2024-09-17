import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
//dmth e krijojme folderin brenda src/pages
//tash director==team 
const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchTeams = () => {
    axios.get('http://localhost:8000/api/teams')
      .then(response => {
        setTeams(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the teams!', error);
      });
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const deleteTeam = (id) => {
    axios.delete(`http://localhost:8000/api/teams/${id}`)
      .then(() => {
        setSuccessMessage('Team deleted successfully!');
        fetchTeams(); // Refresh the list after deletion
        setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
      })
      .catch(error => {
        console.error('There was an error deleting the team!', error);
      });
  };
//     <div className="directors-container">  -> qeto nuk e ndryshon se osht css

  return (
    <div className="directors-container">
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <div className="text-end">
        <Link to="/add-team" className="btn btn-primary">Add Team</Link> {/* Link to Add Director page */}
      </div>

      <div>
        <h2>Teams List</h2>
    </div>

      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr key={team.id}>
              <td>{index + 1}</td>
              <td>{team.name}</td>
              <td>
              <Link to={`/edit-team/${team.id}`} className="btn btn-success">Edit</Link> {/* Navigate to Edit Page */}
              <button className="btn btn-danger" onClick={() => deleteTeam(team.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};
//gjithmon kqyr ne fund mos ka met najnjo pa ndrru 
export default Teams;
