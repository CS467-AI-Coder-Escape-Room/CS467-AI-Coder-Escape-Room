import { useEffect } from "react";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartScreen from './components/StartScreen/StartScreen.component.tsx';
import AddScore from './components/AddScore/AddScore.component.tsx';
import Leaderboard from './components/Leaderboard/Leaderboard.component.tsx';
import RoomCanvas from './components/EscapeRoom/RoomCanvas.jsx';
import "./App.css";
import axios from "axios";

// EXAMPLES FOR CREATING AND READING FROM DATABASE
// // Test function for Creation
// const TestCreate = async () => {
//   const document = { initials: "JDD", time: 1200 };
//   // Create a new document
//   try {
//     const response = await axios.post(
//       "https://ai-coder-server.superindependentmedia.com/database/create",
//       document,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     console.log(response.data);
//   } catch (error) {
//     console.error("Error fetching data: ", error);
//   }
// };

// // Test funtion for finding if document exists
// const TestRead = async () => {
//   // Find document
//   try {
//     const response = await axios.get("https://ai-coder-server.superindependentmedia.com/database/leaderboard");
//     console.log(response.data);
//   } catch (error) {
//     console.error("Error fetching data: ", error);
//   }
// };

function App() {
  useEffect(() => {
    TestRead();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/add-score" element={<AddScore />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/escape-room-1" element={<RoomCanvas />} />
      </Routes>
    </Router>
  );
}

export default App;
