import { useState, useEffect } from 'react';
import carData from './taladrod-cars.min.json';
import './HighlightedCars.css';

const brands = [
  "Highlighted Cars", // Updated tab name
  "All", "HONDA", "NISSAN", "MAZDA", "TOYOTA", "BENZ", "VOLVO", 
  "BMW", "SUZUKI", "ISUZU", "MG", "MITSUBISHI", "PORSCHE", 
  "VOLKSWAGEN", "SUBARU", "LEXUS", "HYUNDAI", "FORD", "KIA", 
  "FIAT", "MINI"
];

function HighlightedCars() {
  const [highlightedCars, setHighlightedCars] = useState(() => {
    const storedCars = localStorage.getItem('highlightedCars');
    return storedCars ? JSON.parse(storedCars) : [];
  });

  const [selectedBrand, setSelectedBrand] = useState('Highlighted Cars'); // Default to "Highlighted Cars"
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('highlightedCars', JSON.stringify(highlightedCars));
  }, [highlightedCars]);

  const addCarToHighlighted = (car) => {
    setHighlightedCars((prevCars) => {
      if (!prevCars.some(highlightedCar => highlightedCar.Cid === car.Cid)) {
        return [...prevCars, car];
      }
      return prevCars;
    });
  };

  const removeCarFromHighlighted = (carId) => {
    setHighlightedCars((prevCars) => prevCars.filter(car => car.Cid !== carId));
  };

  const removeAllCarsFromHighlighted = () => {
    setHighlightedCars([]);
  };

  const filterCars = (car) => {
    // Check if "Highlighted Cars" is selected
    if (selectedBrand === 'Highlighted Cars') {
      return highlightedCars.some(highlightedCar => highlightedCar.Cid === car.Cid);
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
                {selectedBrand === 'Highlighted Cars' && highlightedCars.some(highlightedCar => highlightedCar.Cid === car.Cid) ? (
                  <button className="remove-button" onClick={() => removeCarFromHighlighted(car.Cid)}>Remove</button>
                ) : (
                  <button className="highlight-button" onClick={() => addCarToHighlighted(car)}>Highlight</button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No cars match your search or selected brand.</p>
        )}
      </div>

      {selectedBrand === 'Highlighted Cars' && highlightedCars.length > 0 && (
        <button className="remove-all-button" onClick={removeAllCarsFromHighlighted}>
          Remove All
        </button>
      )}
    </div>
  );
}

export default HighlightedCars;
