import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
 
//edhe ktu director=team
const EditTeamPage = () => {
  const { id } = useParams(); // Get the director ID from the URL
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the director details by ID
    axios.get(`http://localhost:8000/api/teams/${id}`)
      .then(response => {
        setName(response.data.name);
      })
      .catch(error => {
        console.error('There was an error fetching the team!', error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:8000/api/teams/${id}`, {
      name: name,
    })
    .then(response => {
      console.log('Team updated!', response.data);
      navigate('/teams'); // Redirect to the directors list after successful update
    })
    .catch(error => {
      console.error('There was an error updating the team!', error);
    });
  };

  return (
    <div className="container">
      <h2>Edit Team</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
    
        <button type="submit" className="btn btn-primary">Update Team</button>
      </form>
    </div>
  );
};

export default EditTeamPage;
