import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import EscapeRoom from './EscapeRoom';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* <App /> */}
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
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
