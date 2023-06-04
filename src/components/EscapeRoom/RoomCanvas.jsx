import React, { useState, useEffect, Suspense } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import EscapeRoom from "./EscapeRoom";
import { useProgress } from '@react-three/drei'
import "./__room-canvas.scss";
import { useNavigate } from 'react-router-dom';
import Timer from "../Timer/Timer.component"

function RoomCanvas() {
  const [isRoomLoaded, setIsRoomLoaded] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const navigate = useNavigate();

  // Start timer on load
  const { progress } = useProgress()
  if (progress == 100 && !isRoomLoaded) { 
    console.log("LOADED");
    setIsRoomLoaded(true) 
  }

  function handleEscape() {
    navigate("/add-score", { state: { elapsedSeconds: seconds } });
  }

  return (
    <div className="canvas-container">
      {ReactDOM.createPortal(
        <Timer isRoomLoaded={isRoomLoaded} seconds={seconds} setSeconds={setSeconds} />,
        document.getElementById("hud-root")
      )}
      <Canvas
        className="webgl"
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
        camera={{
          position: [0, 75, 100],
          rotation: [0, -1, 0],
          fov: 75,
          near: 0.1,
          far: 50,
        }}
        resize={{ scroll: false }}
      >
        <Suspense fallback={null}>
          <EscapeRoom handleEscape={handleEscape} setIsRoomLoaded={setIsRoomLoaded} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default RoomCanvas;
