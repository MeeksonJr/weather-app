import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import "./../styles/Navbar.css"

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="logo">WeatherApp</div>
      <div className="auth-buttons">
        <header className='UserButton'>
          <SignedOut>
            <SignInButton>Sign In</SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header>
      </div>
    </nav>
  );
};

export default Navbar;
