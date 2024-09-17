import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

//edhe ktu movie==player
const EditPlayerPage = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [teamId, setTeamId] = useState('');
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/players/${id}`)
      .then(response => {
        setName(response.data.name);
        setNumber(response.data.number);
        setBirthYear(response.data.birth_year);
        setTeamId(response.data.team_id);
      })
      .catch(error => {
        console.error('There was an error fetching the team!', error);
      });

    axios.get('http://localhost:8000/api/teams')
      .then(response => {
        setTeams(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the teams!', error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:8000/api/players/${id}`, {
      name: name,
      number: number,
      birth_year: birthYear,
      team_id: teamId,
    })
    .then(response => {
      console.log('Player updated!', response.data);
      navigate('/players');
    })
    .catch(error => {
      console.error('There was an error updating the player!', error);
    });
  };

  return (
    <div>
      <h2>Edit Player</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label>Name:</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Number:</label>
          <input type="number" className="form-control" value={number} onChange={(e) => setNumber(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Birth Year:</label>
          <input type="number" className="form-control" value={birthYear} onChange={(e) => setBirthYear(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Team:</label>
          <select className="form-control" value={teamId} onChange={(e) => setTeamId(e.target.value)}>
            <option value="">Select Team</option>
            {teams.map(team => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Update Player</button>
      </form>
    </div>
  );
};

export default EditPlayerPage;
