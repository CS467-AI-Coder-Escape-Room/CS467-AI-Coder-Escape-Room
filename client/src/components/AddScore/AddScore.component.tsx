import React, { useState } from 'react';
import styled from '@mui/system/styled';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  const [time, setTime] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.get(`https://ai-coder-server.superindependentmedia.com/database/create/${initials}/${time}`);
      setInitials('');
      setTime('');
      alert('Score added successfully!');
      navigate('/leaderboard');  // navigate to Leaderboard page
    } catch (error) {
      console.error(error);
      alert('Error adding score!');
    }
  };

  return (
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
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </StyledInputContainer>
      <StyledBox>
        <Button variant="contained" onClick={handleSubmit}>
          Add Score
        </Button>
      </StyledBox>
    </StyledContainer>
  );
};

export default AddScore;
