import React, { useState } from 'react';
import { styled } from '@mui/system';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const RootGrid = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  gap: theme.spacing(2),
}));

const InputRow = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const AddScore = () => {
  const [initials, setInitials] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.get(`https://ai-coder-server.superindependentmedia.com/database/create/${initials}/${time}`);
      setInitials('');
      setTime('');
      alert('Score added successfully!');
    } catch (error) {
      console.error(error);
      alert('Error adding score!');
    }
  };

  return (
    <RootGrid>
      <Typography variant="h4" gutterBottom>Congratulations, you escaped!</Typography>
      <form onSubmit={handleSubmit}>
        <InputRow>
          <TextField label="Initials" variant="outlined" value={initials} onChange={e => setInitials(e.target.value)} required />
          <TextField label="Time" variant="outlined" type="number" value={time} onChange={e => setTime(e.target.value)} required />
        </InputRow>
        <Button type="submit" variant="contained">Add Score</Button>
      </form>
    </RootGrid>
  );
};

export default AddScore;
