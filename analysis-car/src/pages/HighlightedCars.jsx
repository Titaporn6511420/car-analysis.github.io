import { useState, useEffect } from 'react';
import carData from './taladrod-cars.min.json';
import './HighlightedCars.css';

const brands = [
  "Highlighted Cars", 
  "All", "HONDA", "NISSAN", "MAZDA", "TOYOTA", "BENZ", "VOLVO", 
  "BMW", "SUZUKI", "ISUZU", "MG", "MITSUBISHI", "PORSCHE", 
  "VOLKSWAGEN", "SUBARU", "LEXUS", "HYUNDAI", "FORD", "KIA", 
  "FIAT", "MINI"
];

function HighlightedCars() {
  const [blackCars, setBlackCars] = useState(() => {
    const storedCars = localStorage.getItem('blackCars');
    return storedCars ? JSON.parse(storedCars) : [];
  });

  const [selectedBrand, setSelectedBrand] = useState('Black'); // Default to "Black"
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('blackCars', JSON.stringify(blackCars));
  }, [blackCars]);

  const addCarToBlack = (car) => {
    setBlackCars((prevCars) => {
      if (!prevCars.some(blackCar => blackCar.Cid === car.Cid)) {
        return [...prevCars, car];
      }
      return prevCars;
    });
  };

  const removeCarFromBlack = (carId) => {
    setBlackCars((prevCars) => prevCars.filter(car => car.Cid !== carId));
  };

  const removeAllCarsFromBlack = () => {
    setBlackCars([]);
  };

  const filterCars = (car) => {
    // Check if "Black" is selected
    if (selectedBrand === 'Black') {
      return blackCars.some(blackCar => blackCar.Cid === car.Cid);
    }
    // Filter by selected brand or show all cars
    if (selectedBrand === 'All') {
      return true;
    }
    return car.NameMMT.toLowerCase().includes(selectedBrand.toLowerCase());
  };

  // Filter cars based on the brand selection and search query
  const filteredCars = carData.Cars
    .filter(filterCars)
    .filter(car => car.NameMMT.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="highlighted-cars-container">
      <h2>Highlighted Cars</h2>

      {/* Brand Tabs */}
      <div className="brand-tabs">
        {brands.map(brand => (
          <button
            key={brand}
            className={`brand-tab ${selectedBrand === brand ? 'active' : ''}`}
            onClick={() => setSelectedBrand(brand)}
          >
            {brand}
          </button>
        ))}
      </div>

      <br />

      {/* Search Bar */}
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search highlighted cars..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Car Cards */}
      <div className="card-grid">
        {filteredCars.length > 0 ? (
          filteredCars.map(car => (
            <div key={car.Cid} className="car-card">
              <img src={car.Img600} alt={car.NameMMT} className="car-image" />
              <div className="car-details">
                <h3>{car.NameMMT}</h3>
                <p><strong>Price:</strong> {car.Prc}</p>
                <p><strong>Year:</strong> {car.Yr}</p>
                <p><strong>Province:</strong> {car.Province}</p>
                <p><strong>Views:</strong> {car.PageViews}</p>
                {selectedBrand === 'Black' && blackCars.some(blackCar => blackCar.Cid === car.Cid) ? (
                  <button className="remove-button" onClick={() => removeCarFromBlack(car.Cid)}>Remove</button>
                ) : (
                  <button className="highlight-button" onClick={() => addCarToBlack(car)}>Highlight</button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No highlighted cars.</p>
        )}
      </div>

      {selectedBrand === 'Black' && blackCars.length > 0 && (
        <button className="remove-all-button" onClick={removeAllCarsFromBlack}>
          Remove All
        </button>
      )}
    </div>
  );
}

export default HighlightedCars;
