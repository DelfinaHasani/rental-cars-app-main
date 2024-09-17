import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditEmployeePage = () => {
  const { id } = useParams(); // Get the director ID from the URL
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the director details by ID
    axios.get(`http://localhost:8000/api/employees/${id}`)
      .then(response => {
        setName(response.data.name);
        setSurname(response.data.surname);
      })
      .catch(error => {
        console.error('There was an error fetching the employee!', error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:8000/api/employees/${id}`, {
      name: name,
      surname: surname,
    })
    .then(response => {
      console.log('Employee updated!', response.data);
      navigate('/employees'); // Redirect to the directors list after successful update
    })
    .catch(error => {
      console.error('There was an error updating the employee!', error);
    });
  };

  return (
    <div className="container">
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Surname:</label>
          <input type="text" className="form-control" value={surname} onChange={(e) => setSurname(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Update Employee</button>
      </form>
    </div>
  );
};

export default EditEmployeePage;
