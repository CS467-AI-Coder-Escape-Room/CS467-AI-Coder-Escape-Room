import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

const RootGrid = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: theme.spacing(2),
}));

const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 700,
}));

interface Score {
  _id: string;
  initials: string;
  time: number;
}

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<Score[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://ai-coder-server.superindependentmedia.com/database/leaderboard');
      setLeaderboardData(response.data);
    };

    fetchData();
  }, []);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <RootGrid>
      <Typography variant="h4" gutterBottom>Leaderboard</Typography>
      <TableContainer component={Paper}>
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Initials</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboardData.map((row, index) => (
              <TableRow key={row._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.initials}</TableCell>
                <TableCell>{formatTime(row.time)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
    </RootGrid>
  );
};

export default Leaderboard;

