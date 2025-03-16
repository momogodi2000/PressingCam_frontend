import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/landing_page/LandingPage.jsx';
import Authentication from './components/Authentication/auth.jsx';
import ForgotPassword from './components/Authentication/forgot_password.jsx';
import Tarifs from './components/landing_page/tarifs.jsx';
import { AdminDashboard } from './components/Dashboard/panel/admin_panel.jsx';
import ClientsDashboard from './components/Dashboard/panel/Clients_panel.jsx'; // Ensure this import is correct
import DeliveryDashboard from './components/Dashboard/panel/delivery_panel.jsx';
import UserListPage from './components/Dashboard/admin/Gerer les utilisateur/UserListPage.jsx';


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

        {/* Dashboard Routes */}
        <Route path="/admin_panel" element={<AdminDashboard />} />
        <Route path="/user_crud" element={<UserListPage />} />

        <Route path="/clients_panel" element={<ClientsDashboard />} /> {/* Ensure this route is correct */}
        <Route path="/delivery_panel" element={<DeliveryDashboard />} />
      </Routes>
    </div>
  );
}

export default App;