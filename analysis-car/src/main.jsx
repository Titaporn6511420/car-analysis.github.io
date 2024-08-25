import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './Root';
import Dashboard from './pages/Dashboard';
import HighlightedCars from './pages/HighlightedCars';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Root/>,
      errorElement: <div>404 not Found</div>,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: '/Hightlighted',
          element: <HighlightedCars/>,
        },
      ],
    },
  ],
  {
    basename: '/car-analytics/',
  }
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);