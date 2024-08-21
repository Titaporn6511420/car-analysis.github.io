import React from 'react';
import { Bar } from 'react-chartjs-2';

const ModelStackedBarChart = ({ data }) => (
  <div>
    <h2>Car Models Distribution by Brand</h2>
    <Bar data={data} options={{ scales: { x: { stacked: true }, y: { stacked: true } } }} />
  </div>
);

export default ModelStackedBarChart;
