import React, { useRef } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';

function Camera() {
  const { camera } = useThree();

  return <perspectiveCamera />;
}

export default Camera;