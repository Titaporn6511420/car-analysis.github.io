import React from 'react';

const CarTable = ({ data }) => (
    <table>
        <thead>
            <tr>
                <th>Brand</th>
                <th>Number of Cars</th>
                <th>Total Value (Baht)</th>
            </tr>
        </thead>
        <tbody>
            {data.map(({ brand, count, value }) => (
                <tr key={brand}>
                    <td>{brand}</td>
                    <td>{count}</td>
                    <td>{value.toLocaleString()}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default CarTable;
