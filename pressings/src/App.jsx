import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/landing_page/LandingPage.jsx';
import Authentication from './components/Authentication/auth.jsx';

function App() {
  console.log('App component is rendering');
  return (
    <div className="app">
      {/* Routes moved from main.jsx to App.jsx */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Authentication />} />
      </Routes>
    </div>
  );
}

export default App;