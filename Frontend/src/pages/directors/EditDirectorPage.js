import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditDirectorPage = () => {
  const { id } = useParams(); // Get the director ID from the URL
  const [name, setName] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the director details by ID
    axios.get(`http://localhost:8000/api/directors/${id}`)
      .then(response => {
        setName(response.data.name);
        setBirthYear(response.data.birth_year);
      })
      .catch(error => {
        console.error('There was an error fetching the director!', error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:8000/api/directors/${id}`, {
      name: name,
      birth_year: birthYear,
    })
    .then(response => {
      console.log('Director updated!', response.data);
      navigate('/directors'); // Redirect to the directors list after successful update
    })
    .catch(error => {
      console.error('There was an error updating the director!', error);
    });
  };

  return (
    <div className="container">
      <h2>Edit Director</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Birth Year:</label>
          <input type="number" className="form-control" value={birthYear} onChange={(e) => setBirthYear(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Update Director</button>
      </form>
    </div>
  );
};

export default EditDirectorPage;
