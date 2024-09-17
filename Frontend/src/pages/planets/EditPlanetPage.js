import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


//director=planet
//movie=satellites
const EditPlanetPage = () => {
  const { id } = useParams(); // Get the director ID from the URL
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the director details by ID
    axios.get(`http://localhost:8000/api/planets/${id}`)
      .then(response => {
        setName(response.data.name);
        setName(response.data.type);

      })
      .catch(error => {
        console.error('There was an error fetching the planet!', error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:8000/api/planets/${id}`, {
      name: name,
      type: type,

    })
    .then(response => {
      console.log('Planet updated!', response.data);
      navigate('/planets'); // Redirect to the directors list after successful update
    })
    .catch(error => {
      console.error('There was an error updating the planet!', error);
    });
  };

  return (
    <div className="container">
      <h2>Edit Planet</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Type:</label>
          <input type="text" className="form-control" value={type} onChange={(e) => setType(e.target.value)} />
        </div>
      
        <button type="submit" className="btn btn-primary">Update Planet</button>
      </form>
    </div>
  );
};

export default EditPlanetPage;
