import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import LandingPage from './components/landing_page/LandingPage.jsx';
import Authentication from './components/Authentication/auth.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {/* Public routes */}
          <Route index element={<LandingPage />} /> {/* Route for the landing page */}
          <Route path="/login" element={<Authentication />} /> {/* Route for login page */}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);