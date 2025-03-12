import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/landing_page/LandingPage.jsx';
import Authentication from './components/Authentication/auth.jsx';
import ForgotPassword from './components/Authentication/forgot_password.jsx';
import Tarifs from './components/landing_page/tarifs.jsx';



function App() {
  console.log('App component is rendering');
  return (
    <div className="app">
      {/* Routes moved from main.jsx to App.jsx */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Authentication />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/Tarifs-services" element={<Tarifs />} />



      </Routes>
    </div>
  );
}

export default App;