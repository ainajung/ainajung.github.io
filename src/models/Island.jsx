/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: nimzu (https://sketchfab.com/nimzuk)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/foxs-islands-163b68e09fcc47618450150be7785907
Title: Fox's islands
*/

import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { a } from '@react-spring/three'

import islandScene from '../assets/3d/forest_house.glb';

const Island = ({ isRotating, setIsRotating, setCurrentStage, ...props}) => {

  const islandRef = useRef();  
  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(islandScene);

  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;

  const handlePointerDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);

    const clientX = event.touches ? event.touches[0].clientX : e.clientX;

    lastX.current = clientX;
  }

  const handlePointerUp = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
  }

  const handlePointerMove = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if(isRotating) {
      const clientX = event.touches ? event.touches[0].clientX : e.clientX;

      const delta = (clientX - lastX.current) / viewport.width;

      islandRef.current.rotation.y += delta * 0.01 * Math.PI;
      lastX.current = clientX;
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }

  }

  const handleKeyDown = (e) => {
    if(e.key === 'ArrowLeft') {
      if(!isRotating) setIsRotating(true);
      islandRef.current.rotation.y += 0.01 * Math.PI;
      rotationSpeed.current = 0.007;
    } else if(e.key === 'ArrowRight') {
      if(!isRotating) setIsRotating(true);

      islandRef.current.rotation.y -= 0.01 * Math.PI;
      rotationSpeed.current = -0.007;
    }
  }

  const handleKeyUp = (e) => {
    if(e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      setIsRotating(false);
    }
  }

  // Touch events for mobile devices
  const handleTouchStart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);
  
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    lastX.current = clientX;
  }
  
  const handleTouchEnd = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
  }
  
  const handleTouchMove = (e) => {
    e.stopPropagation();
    e.preventDefault();
  
    if (isRotating) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const delta = (clientX - lastX.current) / viewport.width;
  
      islandRef.current.rotation.y += delta * 0.01 * Math.PI;
      lastX.current = clientX;
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  }
  
  useEffect(() => {
    // Add event listeners for pointer and keyboard events
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchend", handleTouchEnd);
    canvas.addEventListener("touchmove", handleTouchMove);

    // Remove event listeners when component unmounts
    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("touchmove", handleTouchMove);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  useFrame(() => {
    // If not rotating, apply damping to slow down the rotation (smoothly)
    if (!isRotating) {
      // Apply damping factor
      rotationSpeed.current *= dampingFactor;

      // Stop rotation when speed is very small
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      islandRef.current.rotation.y += rotationSpeed.current;
    } else {
      // When rotating, determine the current stage based on island's orientation
      const rotation = islandRef.current.rotation.y;

      /**
       * Normalize the rotation value to ensure it stays within the range [0, 2 * Math.PI].
       * The goal is to ensure that the rotation value remains within a specific range to
       * prevent potential issues with very large or negative rotation values.
       *  Here's a step-by-step explanation of what this code does:
       *  1. rotation % (2 * Math.PI) calculates the remainder of the rotation value when divided
       *     by 2 * Math.PI. This essentially wraps the rotation value around once it reaches a
       *     full circle (360 degrees) so that it stays within the range of 0 to 2 * Math.PI.
       *  2. (rotation % (2 * Math.PI)) + 2 * Math.PI adds 2 * Math.PI to the result from step 1.
       *     This is done to ensure that the value remains positive and within the range of
       *     0 to 2 * Math.PI even if it was negative after the modulo operation in step 1.
       *  3. Finally, ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) applies another
       *     modulo operation to the value obtained in step 2. This step guarantees that the value
       *     always stays within the range of 0 to 2 * Math.PI, which is equivalent to a full
       *     circle in radians.
       */
      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // Set the current stage based on the island's orientation
      switch (true) {
        case normalizedRotation >= 1.84 && normalizedRotation <= 2.4:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 2.35 && normalizedRotation <= 3.2:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 0.5 && normalizedRotation <= 1.26:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 1.25 && normalizedRotation <= 1.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
    }
  });

  return (
    <a.group ref={islandRef} {...props}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.043}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.Windows001_Window_0.geometry}
            material={materials.Window}
            position={[-29.3744, 190.5197, -176.0549]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.Windows_Window_0.geometry}
            material={materials.Window}
            position={[-163.3994, 264.2856, -120.4608]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.Windows002_Window_0.geometry}
            material={materials.Window}
            position={[-32.3659, 214.0683, 45.6839]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.SideRoofBase_RoofMoss_0.geometry}
            material={materials.RoofMoss}
            position={[-94.2446, 237.1454, -218.0756]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.RoofMoss_RoofMoss_0.geometry}
            material={materials.RoofMoss}
            position={[-84.5611, 400.348, -46.8735]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.Roof009_RoofMoss_0.geometry}
            material={materials.RoofMoss}
            position={[-94.7079, 404.7419, -53.0529]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.RoofBase001_RoofMoss_0.geometry}
            material={materials.RoofMoss}
            position={[-79.646, 389.7247, -64.2798]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.HouseFence_WoodPlanks_0.geometry}
            material={materials.WoodPlanks}
            position={[-242.2998, 149.1966, -75.0479]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.Stairs_WoodPlanks_0.geometry}
            material={materials.WoodPlanks}
            position={[-287.1085, 99.567, -139.0864]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.HouseSupportBeams_WoodPlanks_0.geometry}
            material={materials.WoodPlanks}
            position={[-199.3352, 114.9633, -78.7526]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.HouseWoodFloor_WoodPlanks_0.geometry}
            material={materials.WoodPlanks}
            position={[-144.5513, 131.3331, -86.3114]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.Chimney_RoofMoss_0.geometry}
            material={materials.RoofMoss}
            position={[-9.0206, 511.8968, 16.7522]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.Moss_WoodPlanks_0.geometry}
            material={materials.WoodPlanks}
            position={[-201.2453, 158.9306, -135.5346]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.DoorRoof_RoofMoss_0.geometry}
            material={materials.RoofMoss}
            position={[-201.5256, 278.9423, -23.1043]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.House_House_0.geometry}
            material={materials.House}
            position={[-123.9799, 269.2182, -49.2644]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.TallGrass_GrassALPHA_0.geometry}
            material={materials.GrassALPHA}
            position={[-235.4765, 129.6025, -16.823]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.Vines001_GrassALPHA_0.geometry}
            material={materials.GrassALPHA}
            position={[-262.526, 118.8902, -198.8151]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.Vines002_GrassALPHA_0.geometry}
            material={materials.GrassALPHA}
            position={[-221.345, 257.516, -17.5067]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.Vines003_GrassALPHA_0.geometry}
            material={materials.GrassALPHA}
            position={[-75.1328, 260.8186, 69.6463]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.Vines004_GrassALPHA_0.geometry}
            material={materials.GrassALPHA}
            position={[35.9425, 470.1409, -54.2934]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.Vines005_GrassALPHA_0.geometry}
            material={materials.GrassALPHA}
            position={[34.4105, 290.9206, -120.0757]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.Vines_GrassALPHA_0.geometry}
            material={materials.GrassALPHA}
            position={[-74.452, 241.758, -224.9394]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.SupportBeams_Window_0.geometry}
            material={materials.Window}
            position={[-77.065, 201.3933, -235.6586]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.FenceRight_WoodFence_0.geometry}
            material={materials.WoodFence}
            position={[-353.6227, 93.4276, 93.8647]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.FenceRight015_WoodFence_0.geometry}
            material={materials.WoodFence}
            position={[-383.258, 94.9177, -275.5182]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.FenceLeft_WoodFence_0.geometry}
            material={materials.WoodFence}
            position={[-389.1847, 98.8105, -264.9743]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.FenceRight003_WoodFence_0.geometry}
            material={materials.WoodFence}
            position={[-349.6826, 89.4065, 101.4139]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.SmallRocks_BigRock_0.geometry}
            material={materials.BigRock}
            position={[4.0234, 131.4079, -227.81]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.Rocks_BigRock_0.geometry}
            material={materials.BigRock}
            position={[19.7747, 143.7874, -172.8732]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.BTree001_BrichTree_0.geometry}
            material={materials.BrichTree}
            position={[-206.5578, 534.7387, -287.1365]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.BTree_BrichTree_0.geometry}
            material={materials.BrichTree}
            position={[-248.6467, 380.85, 155.3867]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.BTree002_BrichTree_0.geometry}
            material={materials.BrichTree}
            position={[-289.38, 414.4562, -310.2399]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.Redwood_BrichTree_0.geometry}
            material={materials.BrichTree}
            position={[-78.6794, 344.7148, -68.3064]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.RedwoodAlpha_TreeLeafs_0.geometry}
            material={materials.TreeLeafs}
            position={[-90.0857, 598.7178, -98.586]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.RedwoodChopped_BrichTree_0.geometry}
            material={materials.BrichTree}
            position={[-189.7232, 107.1849, 84.8763]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.RedwoodMoss_BrichTree_0.geometry}
            material={materials.BrichTree}
            position={[-325.997, 85.0036, -64.9854]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.Stump001_WoodFence_0.geometry}
            material={materials.WoodFence}
            position={[-381.0825, 93.1207, -193.8544]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.Stump002_WoodFence_0.geometry}
            material={materials.WoodFence}
            position={[-563.2564, 83.9575, -253.3446]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.Stump003_WoodFence_0.geometry}
            material={materials.WoodFence}
            position={[-565.7524, 84.0502, -61.2957]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.Stump_WoodFence_0.geometry}
            material={materials.WoodFence}
            position={[-575.7208, 89.2202, -23.8148]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.Ground_Ground_0.geometry}
            material={materials.Ground}
            position={[-235.1901, 93.3103, -97.7287]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.GrassOrange_GrassALPHA_0.geometry}
            material={materials.GrassALPHA}
            position={[-124.5097, 299.6588, -165.8664]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.GrassRoof_GrassALPHA_0.geometry}
            material={materials.GrassALPHA}
            position={[-100.3867, 330.2337, -133.3979]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.GrassGround_GrassALPHA_0.geometry}
            material={materials.GrassALPHA}
            position={[-244.9914, 103.4163, -133.9082]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.GrassRoof001_GrassALPHA_0.geometry}
            material={materials.GrassALPHA}
            position={[-76.6529, 524.2054, -58.8578]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.Plane001_GrassALPHA_0.geometry}
            material={materials.GrassALPHA}
            position={[-248.7409, 102.9145, -291.7037]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.Plane002_GrassALPHA_0.geometry}
            material={materials.GrassALPHA}
            position={[-258.47, 103.0937, -284.0262]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.Plane005_GrassALPHA_0.geometry}
            material={materials.GrassALPHA}
            position={[-249.0086, 83.6455, 147.9369]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.Plane006_GrassALPHA_0.geometry}
            material={materials.GrassALPHA}
            position={[-235.1854, 81.3502, 142.9981]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.Plane007_GrassALPHA_0.geometry}
            material={materials.GrassALPHA}
            position={[-99.9907, 337.4817, -177.3708]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.Plane008_GrassALPHA_0.geometry}
            material={materials.GrassALPHA}
            position={[-588.0031, 76.9335, -128.0193]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.Plane009_GrassALPHA_0.geometry}
            material={materials.GrassALPHA}
            position={[-484.1605, 62.4792, -121.9982]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.Plane010_GrassALPHA_0.geometry}
            material={materials.GrassALPHA}
            position={[-477.7833, 66.6735, -109.0776]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.Racoon_Animals_0.geometry}
            material={materials.Animals}
            position={[-288.9843, 129.2852, -295.1651]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.Bird_Animals_0.geometry}
            material={materials.Animals}
            position={[-288.4415, 253.0461, -280.8626]}
            rotation={[-1.5782, -0.0162, 0.1055]}
            scale={100}
          />
          <mesh
            geometry={nodes.Bird001_Animals_0.geometry}
            material={materials.Animals}
            position={[-528.8859, 813.7795, -51.3795]}
            rotation={[-1.5203, -0.0179, -0.2071]}
            scale={100}
          />
          <mesh
            geometry={nodes.Bird002_Animals_0.geometry}
            material={materials.Animals}
            position={[-349.9274, 975.3979, -386.8378]}
            rotation={[-1.5564, -0.0163, 0.5143]}
            scale={100}
          />
          <mesh
            geometry={nodes.GroundPlane_Plane_0.geometry}
            material={materials.Plane}
            position={[-220.8314, 59.3232, -82.0658]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.Powerlines_WoodFence_0.geometry}
            material={materials.WoodFence}
            position={[-442.4653, 851.4196, -74.765]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.Powerlines001_GrassALPHA_0.geometry}
            material={materials.GrassALPHA}
            position={[-443.4304, 870.0251, -75.073]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
        </group>
      </group>
    </a.group>
  )
}

useGLTF.preload('/forest_house.glb')

export default Island;
