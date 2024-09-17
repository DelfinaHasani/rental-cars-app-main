import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

//movies=contract
//director=employee
const ContractsList = () => {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/contracts')
      .then(response => {
        setContracts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the contracts!', error);
      });
  }, []);

  const deleteContract = (id) => {
    axios.delete(`http://localhost:8000/api/contracts/${id}`)
      .then(() => {
        setContracts(contracts.filter(contract => contract.id !== id)); // Remove the movie from the list
      })
      .catch(error => {
        console.error('There was an error deleting the contract!', error);
      });
  };

  return (
    <div>
      <h2>Contracts List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Description</th>
            <th>Employee</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract, index) => (
            <tr key={contract.id}>
              <td>{index + 1}</td>
              <td>{contract.title}</td>
              <td>{contract.description}</td>
              <td>{contract.employee.name}</td>
              <td>
                <Link to={`/edit-contract/${contract.id}`} className="btn btn-success">Edit</Link>
                <button className="btn btn-danger" onClick={() => deleteContract(contract.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/add-contract" className="btn btn-primary">Add Contract</Link>
    </div>
  );
};

export default ContractsList;
