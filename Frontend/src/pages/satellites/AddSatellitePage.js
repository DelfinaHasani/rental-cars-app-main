import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddSatellitePage = () => {
  const [name, setName] = useState('');
  const [planetId, setPlanetId] = useState('');
  const [planets, setPlanets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/planets')
      .then(response => {
        setPlanets(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the planets!', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8000/api/satellites', {
      name: name,
      planet_id: planetId,
    })
    .then(response => {
      console.log('Satellite added!', response.data);
      navigate('/satellites');
    })
    .catch(error => {
      console.error('There was an error adding the satellite!', error);
    });
  };

  return (
    <div>
      <h2>Add a Satellite</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
     
        <div className="form-group">
          <label>Planet:</label>
          <select className="form-control" value={planetId} onChange={(e) => setPlanetId(e.target.value)}>
            <option value="">Select Planet</option>
            {planets.map(planet => (
              <option key={planet.id} value={planet.id}>
                {planet.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Add Satellite</button>
      </form>
    </div>
  );
};

export default AddSatellitePage;
