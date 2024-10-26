import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components for Topbar layout
const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1f1f1f;
  padding: 10px 20px;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 8px 10px;
  }
`;

const TopBarSection = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 1; /* Allow shrinking when needed */

  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: nowrap; /* Prevent wrapping in mobile */
  }
`;

const Button = styled.button`
  background-color: #b71c1c;
  color: white;
  border: none;
  border-radius: 8px; /* Make it more square */
  padding: 6px 10px; /* Compact button size */
  margin-right: 10px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #d32f2f;
  }

  @media (max-width: 768px) {
    padding: 4px 6px; /* Smaller padding for mobile */
    margin-right: 5px;
    font-size: 0.65rem; /* Adjust font size for mobile */
  }
`;

const LanguageSelect = styled.select`
  padding: 6px;
  border-radius: 5px;
  background-color: white;
  border: none;
  margin-right: 10px;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    padding: 4px;
    margin-right: 5px;
    font-size: 0.7rem; /* Smaller font size for mobile */
  }
`;

const ThemeToggle = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem; /* Smaller icon for mobile */
  }
`;

const Topbar = () => {
  const [darkTheme, setDarkTheme] = useState(true);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
    document.body.style.backgroundColor = darkTheme ? '#f4f4f4' : '#1f1f1f';
  };

  return (
    <>
      {/* Top section with Locate, Campaign, Language, and Theme toggle */}
      <TopBar>
        <TopBarSection>
          <Button>Locate Blood Bank</Button>
          <Button>Upcoming Campaign</Button>
        </TopBarSection>
        <TopBarSection>
          <LanguageSelect>
            <option>English</option>
            <option>Arabic</option>
          </LanguageSelect>
          <ThemeToggle onClick={toggleTheme}>
            {darkTheme ? '🌙' : '☀️'}
          </ThemeToggle>
        </TopBarSection>
      </TopBar>
    </>
  );
};

export default Topbar;
