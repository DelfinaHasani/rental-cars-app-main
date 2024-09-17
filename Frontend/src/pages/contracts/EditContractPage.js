import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditContractPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/contracts/${id}`)
      .then(response => {
        setTitle(response.data.title);
        setDescription(response.data.description);
        setEmployeeId(response.data.employee_id);
      })
      .catch(error => {
        console.error('There was an error fetching the contract!', error);
      });

    axios.get('http://localhost:8000/api/employees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the employees!', error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:8000/api/contracts/${id}`, {
      title: title,
      description: description,
      employee_id: employeeId,
    })
    .then(response => {
      console.log('Contract updated!', response.data);
      navigate('/contracts');
    })
    .catch(error => {
      console.error('There was an error updating the contract!', error);
    });
  };

  return (
    <div>
      <h2>Edit Contract</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label>Title:</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Employee:</label>
          <select className="form-control" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)}>
            <option value="">Select Employee</option>
            {employees.map(employee => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Update Contract</button>
      </form>
    </div>
  );
};

export default EditContractPage;
