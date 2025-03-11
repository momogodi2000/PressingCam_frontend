import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/landing_page/LandingPage.jsx';
import Authentication from './components/Authentication/auth.jsx';
import './index.css';


function App() {
  console.log('App component is rendering');
  return (
    <div className="app">
      <h2>App Container is Working</h2>
      
      <Routes>
        {/* Public routes */}
        <Route index element={<LandingPage />} /> {/* Route for the landing page */}
        <Route path="/login" element={<Authentication />} /> {/* Route for login page */}
      </Routes>
    </div>
  );
}

export default App;