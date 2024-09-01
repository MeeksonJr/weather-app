import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton, useClerk } from '@clerk/clerk-react';
import './../styles/MainMenu.css';

const MainMenu: React.FC = () => {
  const navigate = useNavigate();

  const handleGuestClick = () => {
    navigate('/weather'); // Redirect to the weather page as a guest
  };

  return (
    <div className="main-menu">
      <header>
        <SignedOut>
          <SignInButton>Sign In</SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>

      <h1>Welcome to the Weather App</h1>
      <p>Choose an option to continue:</p>
      <div className="main-menu-buttons">
        <button onClick={handleGuestClick}>Enter as Guest</button>
      </div>
    </div>
  );
};

export default MainMenu;
