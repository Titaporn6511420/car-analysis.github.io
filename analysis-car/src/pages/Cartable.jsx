import React from 'react';
import { Table } from 'react-bootstrap';
{/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
    integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous"></link> */}

const CarTable = ({ data }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Brand</th>
                    <th>Number of Cars</th>
                    <th>Total Value (Baht)</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        <td>{row.brand}</td>
                        <td>{row.count}</td>
                        <td>{row.totalValue.toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default CarTable;
