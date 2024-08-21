import React from 'react';

const CarTable = ({ data }) => (
    <table className="table table-striped table-hover">
        <thead className="table-dark">
            <tr>
                <th scope="col">Brand</th>
                <th scope="col">Number of Cars</th>
                <th scope="col">Total Value (Baht)</th>
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
