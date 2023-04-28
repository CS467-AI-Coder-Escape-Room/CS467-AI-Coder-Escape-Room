import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

// Test funciton for fetching data from the server
const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:8000/');
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

function App() {
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      {/* <RoomScene /> */}
    </div>
  );
}

{/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

export default App;
