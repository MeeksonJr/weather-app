import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import MainMenu from './components/MainMenu';
import Weather from './components/Weather';
import { SignIn, SignUp } from '@clerk/clerk-react';
import Navbar from './components/Navbar'; // Ensure this import matches your actual file path

const App: React.FC = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

// Component to handle conditional rendering based on the route
const AppRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <>
      {/* Render Navbar only on the Weather page */}
      {location.pathname === '/weather' && <Navbar />}
      
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default App;
