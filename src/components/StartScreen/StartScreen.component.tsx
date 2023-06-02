import React from 'react';
import { Button, Typography, Container } from '@mui/material';
import { styled } from '@mui/system';

import keyholeImage from './keyhole.png';
import './StartScreen.ias.scss';

const StyledContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  }));  
  

const StartScreen: React.FC = () => {
  const handleButtonClick = () => {
    window.location.href = '/escape-room-1';
  };

  return (
    <StyledContainer>
      <Typography variant="h2">AI Coder Escape Room</Typography>
      <img src={keyholeImage} alt="Keyhole" className="keyhole-image" />
      <Button variant="contained" color="primary" onClick={handleButtonClick}>
        Start Game
      </Button>
    </StyledContainer>
  );
};

export default StartScreen;
