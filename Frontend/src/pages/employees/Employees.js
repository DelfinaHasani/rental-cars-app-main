import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

//director==employee
const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchEmployees = () => {
    axios.get('http://localhost:8000/api/employees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the employees!', error);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const deleteEmployee = (id) => {
    axios.delete(`http://localhost:8000/api/employees/${id}`)
      .then(() => {
        setSuccessMessage('Employee deleted successfully!');
        fetchEmployees(); // Refresh the list after deletion
        setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
      })
      .catch(error => {
        console.error('There was an error deleting the employee!', error);
      });
  };

  return (
    <div className="directors-container">
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <div className="text-end">
        <Link to="/add-employee" className="btn btn-primary">Add employee</Link> {/* Link to Add Director page */}
      </div>

      <div>
        <h2>employees List</h2>
    </div>

      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee.id}>
              <td>{index + 1}</td>
              <td>{employee.name}</td>
              <td>{employee.surname}</td>
              <td>
              <Link to={`/edit-employee/${employee.id}`} className="btn btn-success">Edit</Link> {/* Navigate to Edit Page */}
              <button className="btn btn-danger" onClick={() => deleteEmployee(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default Employees;
