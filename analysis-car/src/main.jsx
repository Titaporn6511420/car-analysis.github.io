import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Root from './Root';
import Dashboard from './pages/Dashboard';
import HighlightedCars from './pages/HighlightedCars';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Dashboard />} />
          <Route path="Highlight" element={<HighlightedCars />} />
        </Route>
        <Route path="*" element={<div>404 not Found</div>} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
);
