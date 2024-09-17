import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//edhe ktu director==employee

const AddEmployeePage = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const navigate = useNavigate(); // Use to navigate back to the Directors list after submission

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8000/api/employees', {
      name: name,
      surname: surname,
    })
    .then(response => {
      console.log('Employee added!', response.data);
      navigate('/employees'); // Redirect to the directors list after successful submission
    })
    .catch(error => {
      console.error('There was an error adding the employee!', error);
    });
  };

  return (
    <div className="container">
      <h2>Add a New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Surname:</label>
          <input type="text" className="form-control" value={surname} onChange={(e) => setSurname(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddEmployeePage;
