import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import EscapeRoom from './components/EscapeRoom/EscapeRoom';
import reportWebVitals from './reportWebVitals';

// Test funciton for fetching data from the server
const fetchData = async () => {
  try {
    const response = await axios.get("https://ai-coder-server.superindependentmedia.com/database/leaderboard");
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
    <Canvas
    className="webgl"
    onCreated={({ gl }) => {
      gl.shadowMap.enabled = true
      gl.shadowMap.type = THREE.PCFSoftShadowMap
    }}
    camera={{
      position: [-3, 6, 3],
      rotation: [0, -1, 0],
      fov: 75,
      near: 0.1,
      far: 50
    }}
    resize={{ scroll: false }}
  >
    <EscapeRoom />
  </Canvas>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

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
