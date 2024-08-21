import React from 'react';
import { Pie } from 'react-chartjs-2';

const BrandPieChart = ({ data }) => (
  <div>
    <h2>Car Distribution by Brand</h2>
    <Pie data={data} />
  </div>
);

export default BrandPieChart;
