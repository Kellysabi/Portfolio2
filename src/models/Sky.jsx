import { useRef, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import skyScene from "../assets/3d/sky.glb";

export default function Sky({ isRotating, onTimeOfDayChange }) {
  const sky = useGLTF(skyScene);
  const skyRef = useRef();
  const [timeOfDay, setTimeOfDay] = useState("morning");
  const [isRaining, setIsRaining] = useState(false);
  const [isSnowing, setIsSnowing] = useState(false);
  
  // Determine time of day based on user's local time
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
      return "morning";    // 5 AM - 12 PM
    } else if (hour >= 12 && hour < 17) {
      return "afternoon";  // 12 PM - 5 PM
    } else if (hour >= 17 && hour < 20) {
      return "evening";    // 5 PM - 8 PM
    } else {
      return "night";      // 8 PM - 5 AM
    }
  };

  useEffect(() => {
    const currentTime = getTimeOfDay();
    setTimeOfDay(currentTime);
    
    // Notify parent component of time change
    if (onTimeOfDayChange) {
      onTimeOfDayChange(currentTime);
    }

    // Random weather (20% chance of rain, 10% chance of snow, 70% none)
    const weatherChance = Math.random();
    let weather = 'none';
    if (weatherChance < 0.2) {
      weather = 'rain';
    } else if (weatherChance < 0.3) {
      weather = 'snow';
    }
    setIsRaining(weather === 'rain');
    setIsSnowing(weather === 'snow');
  }, [onTimeOfDayChange]);

  useEffect(() => {
    if (sky.scene) {
      sky.scene.traverse((child) => {
        if (child.isMesh && child.material) {
          // Store original color if not already stored
          if (!child.userData.originalColor) {
            child.userData.originalColor = child.material.color.clone();
          }

          // Reset to original color
          child.material.color.copy(child.userData.originalColor);

          // Apply time of day lighting
          switch (timeOfDay) {
            case "morning":
              // Soft, warm morning light
              child.material.color.multiplyScalar(1.0);
              child.material.color.lerp(new THREE.Color(0xffd9b3), 0.2);
              if (child.material.emissive) {
                child.material.emissive.setHex(0xffcc99);
                child.material.emissiveIntensity = 0.1;
              }
              break;

            case "afternoon":
              // Bright, neutral daylight
              child.material.color.multiplyScalar(1.1);
              if (child.material.emissive) {
                child.material.emissive.setHex(0xffffff);
                child.material.emissiveIntensity = 0.05;
              }
              break;

            case "evening":
              // Warm golden hour / sunset
              child.material.color.multiplyScalar(0.8);
              child.material.color.lerp(new THREE.Color(0xff8c42), 0.3);
              if (child.material.emissive) {
                child.material.emissive.setHex(0xff6b35);
                child.material.emissiveIntensity = 0.2;
              }
              break;

            case "night":
              // Dark, cool nighttime
              child.material.color.multiplyScalar(0.15);
              child.material.color.lerp(new THREE.Color(0x0a0a2e), 0.5);
              if (child.material.emissive) {
                child.material.emissive.setHex(0x1a1a3e);
                child.material.emissiveIntensity = 0.3;
              }
              break;
          }

          child.material.needsUpdate = true;
        }
      });
    }
  }, [sky.scene, timeOfDay]);

  useFrame((_, delta) => {
    if (isRotating) {
      skyRef.current.rotation.y += 0.25 * delta;
    }
  });

  return (
    <mesh ref={skyRef}>
      <primitive object={sky.scene} />
      
      {/* Add sun/moon based on time of day */}
      {(timeOfDay === "morning" || timeOfDay === "afternoon") && <Sun />}
      {timeOfDay === "evening" && <SettingSun />}
      {timeOfDay === "night" && <Moon />}
      
      {/* Add atmospheric effects based on time */}
      {timeOfDay === "night" && <Stars />}
      {timeOfDay === "evening" && <SunsetGlow />}
      
      {/* Weather effects */}
      {isRaining && <Rain />}
      {isSnowing && <Snow />}
    </mesh>
  );
}

// Stars for nighttime
function Stars() {
  const starsRef = useRef();
  
  useEffect(() => {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.2,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9
    });

    const starsVertices = [];
    for (let i = 0; i < 3000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = Math.random() * 500 + 200;
      const z = (Math.random() - 0.5) * 2000;
      starsVertices.push(x, y, z);
    }

    starsGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(starsVertices, 3)
    );

    if (starsRef.current) {
      starsRef.current.geometry = starsGeometry;
      starsRef.current.material = starsMaterial;
    }
  }, []);

  return <points ref={starsRef} />;
}

// Sunset glow for evening
function SunsetGlow() {
  return (
    <ambientLight intensity={0.3} color="#ff8c42" />
  );
}

// Sun for daytime (morning and afternoon)
function Sun() {
  return (
    <mesh position={[100, 80, -100]}>
      <sphereGeometry args={[8, 32, 32]} />
      <meshBasicMaterial color="#FDB813" />
      {/* Sun glow */}
      <pointLight color="#FDB813" intensity={1} distance={200} />
    </mesh>
  );
}

// Setting sun for evening (lower position, orange color)
function SettingSun() {
  return (
    <mesh position={[120, 30, -80]}>
      <sphereGeometry args={[10, 32, 32]} />
      <meshBasicMaterial color="#FF6B35" />
      {/* Sunset glow */}
      <pointLight color="#FF6B35" intensity={0.8} distance={250} />
    </mesh>
  );
}

// Moon for nighttime
function Moon() {
  return (
    <mesh position={[-80, 90, -100]}>
      <sphereGeometry args={[6, 32, 32]} />
      <meshStandardMaterial 
        color="#E8E8E8" 
        emissive="#C0C0C0"
        emissiveIntensity={0.5}
      />
      {/* Moonlight */}
      <pointLight color="#b8c5d6" intensity={0.3} distance={150} />
    </mesh>
  );
}

// Rain effect
function Rain() {
  const rainRef = useRef();
  const raindrops = useRef([]);

  useEffect(() => {
    const rainGeometry = new THREE.BufferGeometry();
    const rainMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.3,
      transparent: true,
      opacity: 0.6
    });

    const rainCount = 5000;
    const positions = [];
    const velocities = [];

    for (let i = 0; i < rainCount; i++) {
      positions.push(
        (Math.random() - 0.5) * 400,
        Math.random() * 200,
        (Math.random() - 0.5) * 400
      );
      velocities.push(Math.random() * 0.1 + 0.3);
    }

    raindrops.current = velocities;

    rainGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    );

    if (rainRef.current) {
      rainRef.current.geometry = rainGeometry;
      rainRef.current.material = rainMaterial;
    }
  }, []);

  useFrame(() => {
    if (rainRef.current && rainRef.current.geometry) {
      const positions = rainRef.current.geometry.attributes.position.array;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] -= raindrops.current[i / 3];

        if (positions[i + 1] < -10) {
          positions[i + 1] = 200;
          positions[i] = (Math.random() - 0.5) * 400;
          positions[i + 2] = (Math.random() - 0.5) * 400;
        }
      }

      rainRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return <points ref={rainRef} />;
}

// Snow effect
function Snow() {
  const snowRef = useRef();
  const snowflakes = useRef([]);

  useEffect(() => {
    const snowGeometry = new THREE.BufferGeometry();
    const snowMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.4,
      transparent: true,
      opacity: 0.9
    });

    const snowCount = 3000;
    const positions = [];
    const velocities = [];

    for (let i = 0; i < snowCount; i++) {
      positions.push(
        (Math.random() - 0.5) * 400,
        Math.random() * 200,
        (Math.random() - 0.5) * 400
      );
      velocities.push(Math.random() * 0.05 + 0.05);
    }

    snowflakes.current = velocities;

    snowGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    );

    if (snowRef.current) {
      snowRef.current.geometry = snowGeometry;
      snowRef.current.material = snowMaterial;
    }
  }, []);

  useFrame(() => {
    if (snowRef.current && snowRef.current.geometry) {
      const positions = snowRef.current.geometry.attributes.position.array;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] -= snowflakes.current[i / 3];
        // Add slight horizontal drift for realism
        positions[i] += (Math.random() - 0.5) * 0.02;
        positions[i + 2] += (Math.random() - 0.5) * 0.02;

        if (positions[i + 1] < -10) {
          positions[i + 1] = 200;
          positions[i] = (Math.random() - 0.5) * 400;
          positions[i + 2] = (Math.random() - 0.5) * 400;
        }
      }

      snowRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return <points ref={snowRef} />;
}