import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import EscapeRoom from "./EscapeRoom";
import "./__room-canvas.scss";
import { useNavigate } from 'react-router-dom';
import Timer from "../Timer/Timer.component"

function RoomCanvas() {
  const [isRoomLoaded, setIsRoomLoaded] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const navigate = useNavigate();

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
        <EscapeRoom handleEscape={handleEscape} setIsRoomLoaded={setIsRoomLoaded} />
      </Canvas>
    </div>
  );
}

export default RoomCanvas;
