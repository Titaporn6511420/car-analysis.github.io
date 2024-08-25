import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import HighlightedCars from './pages/HighlightedCars';
import './App.css'; // Import the updated CSS

function App() {
  return (
    <Router>
      <div className="navbar">
        {/* Clickable navigation links */}
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/highlighted-cars" className="nav-link">Highlighted Cars</Link>
      </div>
      
      <Routes>
        {/* Define routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/highlighted-cars" element={<HighlightedCars />} />
        
        {/* Fallback route to redirect any unmatched paths to Dashboard */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
