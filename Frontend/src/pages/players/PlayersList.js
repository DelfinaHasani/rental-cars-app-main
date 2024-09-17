import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

//movie==player
//director==team
const PlayersList = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/players')
      .then(response => {
        setPlayers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the players!', error);
      });
  }, []);

  const deletePlayer = (id) => {
    axios.delete(`http://localhost:8000/api/players/${id}`)
      .then(() => {
        setPlayers(players.filter(player => player.id !== id)); // Remove the movie from the list
      })
      .catch(error => {
        console.error('There was an error deleting the player!', error);
      });
  };

  return (
    <div>
      <h2>players List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Number</th>
            <th>Birth Year</th>
            <th>Team</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={player.id}>
              <td>{index + 1}</td>
              <td>{player.name}</td>
              <td>{player.number}</td>
              <td>{player.birth_year}</td>
              <td>{player.team.name}</td>
              <td>
                <Link to={`/edit-player/${player.id}`} className="btn btn-success">Edit</Link>
                <button className="btn btn-danger" onClick={() => deletePlayer(player.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/add-player" className="btn btn-primary">Add player</Link>
    </div>
  );
};

export default PlayersList;
