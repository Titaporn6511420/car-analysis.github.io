<<<<<<< Updated upstream
// src/pages/Dashboard.jsx
import React from 'react';
=======
import React, { useEffect, useState } from 'react';
import CarTable from './CarTable.jsx';
import BrandPieChart from './BrandPieChart.jsx';
import ModelStackedBarChart from './ModelStackedBarChart.jsx';
import carsData from './Project-01/taladrod-cars.json';

const Dashboard = () => {
  const [tableData, setTableData] = useState([]);
  const [pieChartData, setPieChartData] = useState({});
  const [barChartData, setBarChartData] = useState({});

  useEffect(() => {
    const brands = {};
    const models = {};

    carsData.forEach(car => {
      if (!brands[car.brand]) {
        brands[car.brand] = { count: 0, value: 0 };
      }
      brands[car.brand].count += 1;
      brands[car.brand].value += car.price;

      if (!models[car.brand]) {
        models[car.brand] = {};
      }
      if (!models[car.brand][car.model]) {
        models[car.brand][car.model] = 0;
      }
      models[car.brand][car.model] += 1;
    });

    setTableData(Object.entries(brands).map(([brand, { count, value }]) => ({ brand, count, value })));
    setPieChartData({
      labels: Object.keys(brands),
      datasets: [{
        data: Object.values(brands).map(brand => brand.count),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#C70039', '#900C3F', '#581845'],
      }],
    });
    setBarChartData({
      labels: Object.keys(models),
      datasets: Object.entries(models).map(([brand, modelData]) => ({
        label: brand,
        data: Object.values(modelData),
        backgroundColor: '#36A2EB',
      })),
    });
  }, []);
>>>>>>> Stashed changes

function Dashboard() {
  return (
<<<<<<< Updated upstream
    <div>
      <h1>Dashboard</h1>
      {/* Add your dashboard content, charts, and tables here */}
=======
    <div className="container">
      <h1 className="text-center my-4">Car Analysis Dashboard</h1>
      <div className="row">
        <div className="col-md-8 offset-md-2 mb-4">
          <CarTable data={tableData} />
        </div>
        <div className="col-md-6">
          <BrandPieChart data={pieChartData} />
        </div>
        <div className="col-md-6">
          <ModelStackedBarChart data={barChartData} />
        </div>
      </div>
>>>>>>> Stashed changes
    </div>
  );
}

export default Dashboard;

// gogo