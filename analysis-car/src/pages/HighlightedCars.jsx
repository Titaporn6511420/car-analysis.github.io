import { useState, useEffect } from 'react';
import carData from './taladrod-cars.json';
import './HighlightedCars.css';

function HighlightedCars() {
  const [highlightedCars, setHighlightedCars] = useState([]);
  const [showCarSelection, setShowCarSelection] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  // Load highlighted cars from localStorage

  // Save highlighted cars to localStorage whenever they change

  // Add car to highlighted list
  const addCarToHighlight = (car) => {
    setHighlightedCars((prevCars) => {
      if (!prevCars.some((highlightedCar) => highlightedCar.Cid === car.Cid)) {
        return [...prevCars, car];
      }
      return prevCars;
    });
    setShowCarSelection(false);
  };

  // Remove car from highlighted list
  const removeCarFromHighlight = (carId) => {
    setHighlightedCars((prevCars) => prevCars.filter(car => car.Cid !== carId));
  };

  // Remove all cars from highlighted list
  const removeAllCars = () => {
    setHighlightedCars([]);
  };

  // Close the car selection modal
  const closeModal = () => {
    setShowCarSelection(false);
  };

  // Filter highlighted cars based on search query
  const filteredCars = highlightedCars.filter(car =>
    car.NameMMT.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h2>Highlighted Cars</h2>

      {/* Control Buttons */}
      <div className="control-buttons" style={{ marginBottom: '20px' }}>
        <button className="remove-all-button" style={{marginRight:'20px'}} onClick={removeAllCars}>Remove All</button>
        <button className="add-button" onClick={() => setShowCarSelection(true)}>Add</button>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        className="form-control mb-4"
        style={{ marginTop: '10px' }}
        placeholder="Search highlighted cars..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Highlighted Cars Table */}
      <div className="table-container">
        {filteredCars.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCars.map(car => (
                <tr key={car.Cid}>
                  <td><img src={car.Img100} alt={car.NameMMT} width="50" /></td>
                  <td>{car.NameMMT}</td>
                  <td>{car.Prc}</td>
                  <td>
                    <button onClick={() => removeCarFromHighlight(car.Cid)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No highlighted cars match your search.</p>
        )}
      </div>

      {/* Car Selection Modal */}
      {showCarSelection && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>X</button>
            <h3>Select Cars to Highlight</h3>
            <input
              type="text"
              className="form-control mb-4"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {carData.Cars.filter(car =>
                    car.NameMMT.toLowerCase().includes(searchQuery.toLowerCase())
                  ).map(car => (
                    <tr key={car.Cid}>
                      <td><img src={car.Img100} alt={car.NameMMT} width="50" /></td>
                      <td>{car.NameMMT}</td>
                      <td>{car.Prc}</td>
                      <td>
                        <button onClick={() => addCarToHighlight(car)}>Highlight</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HighlightedCars;
