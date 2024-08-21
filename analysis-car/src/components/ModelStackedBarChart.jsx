import React from 'react';
import { Bar } from 'react-chartjs-2';

const ModelStackedBarChart = ({ data }) => (
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">Car Models Distribution by Brand</h5>
      <Bar data={data} options={{ scales: { x: { stacked: true }, y: { stacked: true } } }} />
    </div>
  </div>
);

export default ModelStackedBarChart;
