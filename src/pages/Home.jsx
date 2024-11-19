import React, { useState, Suspense, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'

import { HomeInfo } from '../components';
import Loader from '../components/Loader';
import { Bird, Island, Plane, Sky } from '../models';

import sleepy from '../assets/sleepy.mp3';
import { soundon, soundoff } from '../assets/icons';

const Home = () => {

  const audioRef = useRef(new Audio(sleepy));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;

  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);

  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    if(isPlayingMusic) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    return () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [isPlayingMusic]);

  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPoisition = [4.5, -17, -54];
    let rotation = [0.2, -4.75, 0]

    if(window.innerWidth < 768) {
        screenScale = [1.19, 1.19, 1.19];
    } else {
        screenScale = [1.41, 1.41, 1.41];
    }

    return [screenScale, screenPoisition, rotation];
  }

  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition;

    if(window.innerWidth < 768) {
        screenScale = [0.0045, 0.0045, 0.0045];
        screenPosition = [0, -2.1, -3.2];
    } else {
        screenScale = [0.006, 0.006, 0.006];
        screenPosition = [0, -3.5, -2.8];
    }

    return [screenScale, screenPosition];
  }

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
  const [planeScale, planePosition] = adjustPlaneForScreenSize();

  return (
    <section className='w-full h-screen relative'>
    <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
      {currentStage && <HomeInfo currentStage={currentStage} />}
    </div>

    <div className='absolute bottom-28 left-0 right-0 z-10 flex items-center justify-center
     text-blue-100 sm:text-sm lg:text-base'>
      Try moving the island left and right.
    </div>

        <Canvas
          className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
          camera={{ near:0.1, far:1000 }}
        >
            <Suspense fallback={<Loader />}>
                <directionalLight position={[1, 1, 1]} intensity={2}/>
                <ambientLight intensity={0.5}/>
                <hemisphereLight skycolor='#b1eff' groundColor='#000000' intensity={1} />

                <Bird 

                />
                <Sky 
                  isRotating={isRotating}
                />
                <Island 
                  position={islandPosition}
                  scale={islandScale}
                  rotation={islandRotation}
                  isRotating={isRotating}
                  setIsRotating={setIsRotating}
                  setCurrentStage={setCurrentStage}
                />
                <Plane
                  isRotating={isRotating} 
                  planeScale={planeScale}
                  planePosition={planePosition}
                  rotation={[0.4, 9, -0.4]}
                />
            </Suspense>
        </Canvas>

        <div className='absolute bottom-2 left-2'>
          <img 
            src={!isPlayingMusic ? soundoff : soundon }
            alt='sound'
            className='w-10 h-10 cursor-pointer object-contain'
            onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          />
        </div>
    </section>
  )
}

export default Home
