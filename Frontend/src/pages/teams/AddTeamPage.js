import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//edhe ktu director=team
const AddTeamPage = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate(); // Use to navigate back to the Directors list after submission

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8000/api/teams', {
      name: name,
    })
    .then(response => {
      console.log('Team added!', response.data);
      navigate('/teams'); // Redirect to the directors list after successful submission
    })
    .catch(error => {
      console.error('There was an error adding the team!', error);
    });
  };

  return (
    <div className="container">
      <h2>Add a New Team</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
   
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddTeamPage;
