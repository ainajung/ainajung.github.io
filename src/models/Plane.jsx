import React, { useEffect, useRef } from 'react'
import { meshBounds, useAnimations, useGLTF } from '@react-three/drei';

import planeScene from '../assets/3d/plane.glb';

const Plane = ({ isRotating, planeScale, planePosition, ...props}) => {
  
  const ref = useRef();
  const { scene, animations } = useGLTF(planeScene);
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    const action = actions['animation_0'];
    
    if (action) {
      action.play();
      action.setEffectiveTimeScale(isRotating ? 2 : 1);
    }
  },[actions, isRotating])

  return (
    <mesh {...props} ref={ref} scale={planeScale} position={planePosition} >
      <primitive object={scene} />
    </mesh>
  )
}

export default Plane
