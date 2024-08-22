import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import carData from './taladrod-cars.json'; // Adjust the path as needed

const Dashboard = () => {
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Set cars directly from the imported JSON data
    setCars(carData.Cars);
  }, []);

  // Process data to group by brand and model
  const processedCarData = cars.reduce((acc, car) => {
    // Extract brand and model from NameMMT
    const [brand, ...modelParts] = car.NameMMT.split(' ');
    const model = modelParts.join(' ');

    // Convert price from string to number
    const price = parseFloat(car.Prc.replace(/,/g, ''));

    if (!acc[brand]) {
      acc[brand] = { totalValue: 0, totalCars: 0, models: {} };
    }

    if (!acc[brand].models[model]) {
      acc[brand].models[model] = { value: 0, count: 0 };
    }

    acc[brand].totalValue += price;
    acc[brand].totalCars += 1;
    acc[brand].models[model].value += price;
    acc[brand].models[model].count += 1;

    return acc;
  }, {});

  // Filter brands based on search query
  const filteredBrandLabels = Object.keys(processedCarData).filter(brand =>
    brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBrandCounts = filteredBrandLabels.map(brand => processedCarData[brand].totalCars);
  const filteredBrandValues = filteredBrandLabels.map(brand => processedCarData[brand].totalValue);

  const tableRows = filteredBrandLabels.flatMap((brand, index) => [
    // Row for the brand totals
    <tr key={`${brand}-total`}>
      <td>{brand}</td>
      <td><strong>Total</strong></td>
      <td><strong>{processedCarData[brand].totalCars}</strong></td>
      <td><strong>{processedCarData[brand].totalValue.toLocaleString()} Baht</strong></td>
    </tr>,
    // Rows for the individual models
    ...Object.keys(processedCarData[brand].models).map((model, modelIndex) => (
      <tr key={`${brand}-${modelIndex}`}>
        <td>{brand}</td>
        <td>{model}</td>
        <td>{processedCarData[brand].models[model].count}</td>
        <td>{processedCarData[brand].models[model].value.toLocaleString()} Baht</td>
      </tr>
    )),
  ]);

  const pieChartData = {
    labels: filteredBrandLabels,
    datasets: [
      {
        data: filteredBrandCounts,
        backgroundColor: [
          '#F4A3D1',
          '#97E3DE',
          '#F8E877',
          '#FF6767',
          '#C785E3',
          '#97D1F7',
        ],
      },
    ],
  };

  const colors = [
    'rgba(122, 223, 207)', // Color 1
    'rgba(255, 195, 0)',   // Color 2
    'rgba(218, 247, 166)',  // Color 3
    'rgba(150, 200, 236)',  // Color 4
    'rgba(244, 163, 209)',
  ];

  const stackedBarChartData = {
    labels: filteredBrandLabels,
    datasets: filteredBrandLabels.map((brand, index) => ({
      label: brand,
      data: Object.keys(processedCarData[brand].models).map(model => processedCarData[brand].models[model].count),
      backgroundColor: colors[index % colors.length],
    })),
  };

  const barChartOptions = {
    maintainAspectRatio: false, // Allow chart to resize based on container size
    responsive: true,
    scales: {
      x: { stacked: true },
      y: { stacked: true }
    },
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Car Dashboard</h1>
      <div className="row">
        <div className="col-md-12">
          <h3>Number of Cars and Values by Brands and Models</h3>
          <input
            type="text"
            className="form-control mb-4"
            placeholder="Search by brand..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="table-container" style={{ maxHeight: '500px', overflowY: 'auto' }}> {/* Container with fixed height */}
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Brand</th>
                  <th>Model</th>
                  <th>Number of Cars</th>
                  <th>Price (Baht)</th>
                </tr>
              </thead>
              <tbody>
                {tableRows}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row mt-5 justify-content-center">
        <div className="col-md-6 d-flex flex-column align-items-center">
          <h3>Portion of Cars by Brand (Pie Chart)</h3>
          <Pie data={pieChartData} />
        </div>
      </div>
      <div className="row mt-5 justify-content-center">
        <div className="col-md-6 d-flex flex-column align-items-center" style={{ height: '500px' }}> {/* Container with fixed height */}
          <h3>Models of a Brand (Stacked Bar Chart)</h3>
          <div style={{ width: '150%', height: '200%' }}>
            <Bar data={stackedBarChartData} options={barChartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
