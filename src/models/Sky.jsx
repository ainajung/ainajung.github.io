import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

import skyScene from '../assets/3d/sky.glb';

const Sky = ({ isRotating }) => {

  const sky = useGLTF(skyScene);
  const skyRef = useRef();

  useFrame((_, delta) => {
    if(isRotating) {
      skyRef.current.rotation.y += 0.15 * delta
    }
  })

  return (
    <>
      {/* 주위의 전체적인 조명 효과 추가 */}
      <ambientLight intensity={0.4} color={"#ffa07a"} /> 
      <directionalLight
        intensity={5}
        color={"#A1EEBD"}
        position={[5, 6, 5]} // 빛의 위치 (조정 가능)
      />

      <mesh ref={skyRef}>
        <primitive object={sky.scene} />
      </mesh>
    </>
  )
}

export default Sky
