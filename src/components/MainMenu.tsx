import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import './../styles/MainMenu.css';

const MainMenu: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGuestClick = () => {
    navigate('/weather'); // Redirect to the weather page as a guest
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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

      <div className="info-section">
        <p>Created by Mo Datt</p>
        <button onClick={toggleModal} className="info-button">Info</button>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span onClick={toggleModal} className="close-button">&times;</span>
            <h2>PM Accelerator Program</h2>
            <p>The Product Manager Accelerator Program is designed to support PM professionals through every stage of their career. From students looking for entry-level jobs to Directors looking to take on a leadership role, our program has helped hundreds of students fulfill their career aspirations.</p>
            <p>Our Product Manager Accelerator community is ambitious and committed. Through our program, they have learned, honed, and developed new PM and leadership skills, giving them a strong foundation for their future endeavors.</p>
            <a href="https://www.linkedin.com/company/pmaccelerator/" target="_blank" rel="noopener noreferrer">Learn More</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainMenu;
