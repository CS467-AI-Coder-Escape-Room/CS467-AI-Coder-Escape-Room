import React, { useState } from 'react';
import styled from '@mui/system/styled';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const StyledContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  gap: '20px',
});

const StyledInputContainer = styled('div')({
  display: 'flex',
  gap: '20px',
});

const StyledBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px',
});

const AddScore = () => {
  const [initials, setInitials] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const elapsedSeconds = location.state.elapsedSeconds;

  const getFormattedTime = (totalSeconds) => {
    console.log("totalSeconds ", totalSeconds);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    console.log(`${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.get(`https://ai-coder-server.superindependentmedia.com/database/create/${initials}/${elapsedSeconds}`);
      setInitials('');
      alert('Score added successfully!');
      navigate('/leaderboard');  // navigate to Leaderboard page
    } catch (error) {
      console.error(error);
      alert('Error adding score!');
    }
  };

  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiInputBase-input.Mui-disabled': {
              color: 'black',
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <StyledContainer>
      <h1>Congratulations, you escaped!</h1>
      <StyledInputContainer>
        <TextField
          label="Initials"
          variant="outlined"
          value={initials}
          onChange={(e) => setInitials(e.target.value)}
        />
        <TextField
          label="Time"
          variant="outlined"
          value={getFormattedTime(elapsedSeconds)}
          disabled
        />
      </StyledInputContainer>
      <StyledBox>
        <Button variant="contained" onClick={handleSubmit}>
          Add Score
        </Button>
      </StyledBox>
    </StyledContainer>
    </ThemeProvider>
    
  );
};

export default AddScore;
