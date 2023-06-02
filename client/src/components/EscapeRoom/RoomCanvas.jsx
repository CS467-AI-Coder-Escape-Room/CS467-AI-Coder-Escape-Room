import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import EscapeRoom from "./EscapeRoom";
import "./__room-canvas.scss";
import { useNavigate } from 'react-router-dom';
import Timer from "../Timer/Timer.component"

// function Timer({ seconds, setSeconds, stop }) {
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setSeconds((seconds) => seconds + 1);
//     }, 1000);

//     // Clear the interval when stop is true
//     if (stop) {
//       clearInterval(interval);
//     }

//     // Clear the interval when component unmounts
//     return () => clearInterval(interval);
//   }, [setSeconds, stop]);

//   const getFormattedTime = (totalSeconds) => {
//     const hours = Math.floor(totalSeconds / 3600);
//     const minutes = Math.floor((totalSeconds % 3600) / 60);
//     const seconds = totalSeconds % 60;
//     return `${hours.toString().padStart(2, "0")}:${minutes
//       .toString()
//       .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
//   };

//   return (
//     <div
//       className="timer-text"
//       style={{
//         position: "fixed",
//         top: "20px",
//         right: "20px",
//         fontSize: "2em",
//         fontWeight: "bold",
//         zIndex: 9999, // make sure the timer is always on top
//       }}
//     >
//       {getFormattedTime(seconds)}
//     </div>
//   );
// }

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
