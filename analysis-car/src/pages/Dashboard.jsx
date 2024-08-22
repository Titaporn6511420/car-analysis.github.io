import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import carData from './taladrod-cars.json'; // Adjust the path as needed

const Dashboard = () => {
  const [cars, setCars] = useState([]);

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

  const brandLabels = Object.keys(processedCarData);
  const brandCounts = brandLabels.map(brand => processedCarData[brand].totalCars);
  const brandValues = brandLabels.map(brand => processedCarData[brand].totalValue);

  const tableRows = brandLabels.map((brand, index) => (
    <React.Fragment key={index}>
      <tr>
        <td>{brand}</td>
        <td>{processedCarData[brand].totalCars}</td>
        <td>{processedCarData[brand].totalValue.toLocaleString()} Baht</td>
      </tr>
      {Object.keys(processedCarData[brand].models).map((model, modelIndex) => (
        <tr key={modelIndex} className="pl-4">
          <td>&nbsp;&nbsp;&nbsp;{brand} / {model}</td>
          <td>{processedCarData[brand].models[model].count}</td>
          <td>{processedCarData[brand].models[model].value.toLocaleString()} Baht</td>
        </tr>
      ))}
    </React.Fragment>
  ));

  const pieChartData = {
    labels: brandLabels,
    datasets: [
      {
        data: brandCounts,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  const colors = [
    'rgba(122, 223, 207, 0.6)', // Color 1
    'rgba(255, 195, 0, 0.6)',   // Color 2
    'rgba(218, 247, 166, 0.6)',  // Color 3
    'rgba(150, 200, 236, 0.6)'   // Color 4
  ];

  const stackedBarChartData = {
    labels: brandLabels,
    datasets: brandLabels.map((brand, index) => ({
      label: brand,
      data: Object.keys(processedCarData[brand].models).map(model => processedCarData[brand].models[model].count),
      backgroundColor: colors[index % colors.length],
    })),
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Car Dashboard</h1>
      <div className="row">
        <div className="col-md-12">
          <h3>Number of Cars and Values by Brands and Models</h3>
          <div className="table-responsive"> {/* Ensure table is responsive */}
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Brand / Model</th>
                  <th>Number of Cars</th>
                  <th>Total Value (Baht)</th>
                </tr>
              </thead>
              <tbody>
                {tableRows}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6">
          <h3>Portion of Cars by Brand (Pie Chart)</h3>
          <Pie data={pieChartData} />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6">
          <h3>Models of a Brand (Stacked Bar Chart)</h3>
          <Bar data={stackedBarChartData} options={{ scales: { x: { stacked: true }, y: { stacked: true } } }} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
