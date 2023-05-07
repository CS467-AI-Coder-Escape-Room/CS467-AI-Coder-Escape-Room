import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import EscapeRoom from './EscapeRoom';

function RoomCanvas() {
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
    )
}

export default RoomCanvas;