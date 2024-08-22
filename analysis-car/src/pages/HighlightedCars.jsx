import { useState, useEffect } from 'react';
import carData from './taladrod-cars.json';
import './HighlightedCars.css'; // Import styles for the modal

function HighlightedCars() {
  const [highlightedCars, setHighlightedCars] = useState([]);
  const [showCarSelection, setShowCarSelection] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // Added search query state

  // Load highlighted cars from localStorage
  useEffect(() => {
    try {
      const storedCars = localStorage.getItem('highlightedCars');
      if (storedCars) {
        setHighlightedCars(JSON.parse(storedCars));
      }
    } catch (err) {
      setError('Could not load highlighted cars.');
    }
  }, []);

  // Save highlighted cars to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('highlightedCars', JSON.stringify(highlightedCars));
    } catch (err) {
      setError('Could not save highlighted cars.');
    }
  }, [highlightedCars]);

  // Function to add a car to highlighted cars
  const addCarToHighlight = (car) => {
    setHighlightedCars((prevCars) => {
      if (!prevCars.some((highlightedCar) => highlightedCar.Cid === car.Cid)) {
        return [...prevCars, car];
      }
      return prevCars;
    });
    setShowCarSelection(false);  // Hide modal after adding a car
  };

  // Function to remove a car from highlighted cars
  const removeCarFromHighlight = (carId) => {
    setHighlightedCars((prevCars) => prevCars.filter(car => car.Cid !== carId));
  };

  // Function to remove all cars from highlighted cars
  const removeAllCars = () => {
    setHighlightedCars([]);
  };

  // Close the modal
  const closeModal = () => {
    setShowCarSelection(false);
  };

  // Filter cars based on search query
  const filteredCars = carData.Cars.filter(car =>
    car.NameMMT.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Error handling for invalid carData
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h2>Highlighted Cars</h2>

      {/* Buttons to remove all and add cars */}
      <button className="remove-all-button" onClick={removeAllCars}>Remove All</button>
      <button className="add-button" onClick={() => setShowCarSelection(true)}>Add</button>

      {/* Highlighted cars list */}
      <div className="table-container">
        {highlightedCars.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {highlightedCars.map(car => (
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
          <>
            <div style={{ height: '20px' }}></div> {/* Blank line */}
            <p>No highlighted cars yet.</p>
          </>
        )}
      </div>

      {/* Car selection modal */}
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
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(filteredCars) && filteredCars.length > 0 ? (
                    filteredCars.map(car => (
                      <tr key={car.Cid}>
                        <td><img src={car.Img100} alt={car.NameMMT} width="50" /></td>
                        <td>{car.NameMMT}</td>
                        <td>{car.Prc}</td>
                        <td>
                          <button onClick={() => addCarToHighlight(car)}>Highlight</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">No cars match your search criteria.</td>
                    </tr>
                  )}
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
