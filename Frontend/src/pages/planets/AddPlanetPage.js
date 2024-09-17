import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPlanetPage = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const navigate = useNavigate(); // Use to navigate back to the Directors list after submission

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8000/api/planets', {
      name: name,
      type: type,

    })
    .then(response => {
      console.log('Planet added!', response.data);
      navigate('/planets'); // Redirect to the directors list after successful submission
    })
    .catch(error => {
      console.error('There was an error adding the planet!', error);
    });
  };

  return (
    <div className="container">
      <h2>Add a New Planet</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Type:</label>
          <input type="text" className="form-control" value={type} onChange={(e) => setType(e.target.value)} />
        </div>
      
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddPlanetPage;
