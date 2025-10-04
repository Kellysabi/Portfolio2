import React, { Suspense, useState} from 'react'
import { Canvas } from '@react-three/fiber'
import Island from '../models/Island'
import Loader from '../components/Loader'
import Sky from '../models/Sky'
import { Bird } from '../models/Bird'
import { Plane } from '../models/Plane'
import HomeInfo from '../components/HomeInfo'

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(null);
  const [timeOfDay, setTimeOfDay] = useState("morning");

  // Handle time of day changes from Sky component
  const handleTimeOfDayChange = (newTimeOfDay) => {
    setTimeOfDay(newTimeOfDay);
  };

  // Get lighting settings based on time of day
  const getLightingConfig = () => {
    switch (timeOfDay) {
      case "morning":
        return {
          directionalIntensity: 2,
          ambientIntensity: 0.5,
          hemisphereIntensity: 1,
          skyColor: "#ffd9b3",
          groundColor: "#8b7355",
          directionalColor: "#fff5e6"
        };
      
      case "afternoon":
        return {
          directionalIntensity: 2.5,
          ambientIntensity: 0.6,
          hemisphereIntensity: 1.2,
          skyColor: "#b1e1ff",
          groundColor: "#000000",
          directionalColor: "#ffffff"
        };
      
      case "evening":
        return {
          directionalIntensity: 1.5,
          ambientIntensity: 0.4,
          hemisphereIntensity: 0.8,
          skyColor: "#ff8c42",
          groundColor: "#2a1810",
          directionalColor: "#ffb366"
        };
      
      case "night":
        return {
          directionalIntensity: 0.3,
          ambientIntensity: 0.2,
          hemisphereIntensity: 0.3,
          skyColor: "#1a1a3e",
          groundColor: "#000000",
          directionalColor: "#6b7c9e"
        };
      
      default:
        return {
          directionalIntensity: 2,
          ambientIntensity: 0.5,
          hemisphereIntensity: 1,
          skyColor: "#b1e1ff",
          groundColor: "#000000",
          directionalColor: "#ffffff"
        };
    }
  };

  const adjustBiplaneForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  };

  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }

    return [screenScale, screenPosition, rotation];
  };

  const [biplaneScale, biplanePosition] = adjustBiplaneForScreenSize();
  const [screenScale, screenPosition, rotation] = adjustIslandForScreenSize();
  const lighting = getLightingConfig();

  return (
      <section className='w-full h-screen relative'>
      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>

      <Canvas 
        className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight 
            position={[1, 1, 1]} 
            intensity={lighting.directionalIntensity}
            color={lighting.directionalColor}
          />
          <ambientLight intensity={lighting.ambientIntensity} />
          <hemisphereLight 
            skyColor={lighting.skyColor}
            groundColor={lighting.groundColor}
            intensity={lighting.hemisphereIntensity}
          />
          
          <Bird /> 
          <Sky 
            isRotating={isRotating}
            onTimeOfDayChange={handleTimeOfDayChange}
          />
          <Island 
            position={screenPosition}
            scale={screenScale}
            rotation={rotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          /> 
          <Plane
            isRotating={isRotating}
            position={biplanePosition}
            rotation={[0, 20.1, 0]}
            scale={biplaneScale}
          />
        </Suspense>
      </Canvas>
    </section>
  )
}

export default Home