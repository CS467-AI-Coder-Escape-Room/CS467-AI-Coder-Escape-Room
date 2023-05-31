import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import EscapeRoom from "./EscapeRoom";
import "./__room-canvas.scss";

function RoomCanvas() {
  return (
    <div className="canvas-container">
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
      <EscapeRoom />
    </Canvas>
    </div>
  );
}

export default RoomCanvas;
