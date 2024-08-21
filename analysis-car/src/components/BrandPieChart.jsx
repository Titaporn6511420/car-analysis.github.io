import React from 'react';
import { Pie } from 'react-chartjs-2';

const BrandPieChart = ({ data }) => (
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">Car Distribution by Brand</h5>
      <Pie data={data} />
    </div>
  </div>
);

export default BrandPieChart;
