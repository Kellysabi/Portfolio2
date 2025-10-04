/**
 * IMPORTANT: Loading glTF models into a Three.js scene is a lot of work.
 * Before we can configure or animate our model’s meshes, we need to iterate through
 * each part of our model’s meshes and save them separately.
 *
 * But luckily there is an app that turns gltf or glb files into jsx components
 * For this model, visit https://gltf.pmnd.rs/
 * And get the code. And then add the rest of the things.
 * YOU DON'T HAVE TO WRITE EVERYTHING FROM SCRATCH
 */ 
import React from "react";
import { a } from "@react-spring/three";
import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import islandScene from "../assets/3d/island.glb";

export default function Island({
  timeOfDay,
  isRaining,
  isSnowing,
  isRotating,
  setIsRotating,
  setCurrentStage,
  currentFocusPoint,
  ...props
}) {
  const islandRef = useRef();
  // Get access to the Three.js renderer and viewport
  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(islandScene);

  // Use a ref for the last mouse x position
  const lastX = useRef(0);
  // Use a ref for rotation speed
  const rotationSpeed = useRef(0);
  // Define a damping factor to control rotation damping
  const dampingFactor = 0.95;

  // Handle pointer (mouse or touch) down event
  const handlePointerDown = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);

    // Calculate the clientX based on whether it's a touch event or a mouse event
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;

    // Store the current clientX position for reference
    lastX.current = clientX;
  };

  // Handle pointer (mouse or touch) up event
  const handlePointerUp = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  // Handle pointer (mouse or touch) move event
  const handlePointerMove = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (isRotating) {
      // If rotation is enabled, calculate the change in clientX position
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;

      // calculate the change in the horizontal position of the mouse cursor or touch input,
      // relative to the viewport's width
      const delta = (clientX - lastX.current) / viewport.width;

      // Update the island's rotation based on the mouse/touch movement
      islandRef.current.rotation.y += delta * 0.01 * Math.PI;

      // Update the reference for the last clientX position
      lastX.current = clientX;

      // Update the rotation speed
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  // Handle keydown events
  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);

      islandRef.current.rotation.y += 0.005 * Math.PI;
      rotationSpeed.current = 0.007;
    } else if (event.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);

      islandRef.current.rotation.y -= 0.005 * Math.PI;
      rotationSpeed.current = -0.007;
    }
  };

  // Handle keyup events
  const handleKeyUp = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      setIsRotating(false);
    }
  };

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

  useEffect(() => {
    if (islandRef.current) {
      islandRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          // Store original color if not already stored
          if (!child.userData.originalColor) {
            child.userData.originalColor = child.material.color.clone();
          }

          // Reset to original color
          child.material.color.copy(child.userData.originalColor);

          // Apply time of day lighting adjustments
          switch (timeOfDay) {
            case "morning":
              // Soft, warm morning light
              child.material.color.multiplyScalar(1.0);
              child.material.color.lerp(new THREE.Color(0xffd9b3), 0.15);
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
              child.material.color.multiplyScalar(0.9);
              child.material.color.lerp(new THREE.Color(0xff8c42), 0.25);
              if (child.material.emissive) {
                child.material.emissive.setHex(0xff6b35);
                child.material.emissiveIntensity = 0.15;
              }
              break;

            case "night":
              // Dark, cool nighttime
              child.material.color.multiplyScalar(0.3);
              child.material.color.lerp(new THREE.Color(0x0a0a2e), 0.4);
              if (child.material.emissive) {
                child.material.emissive.setHex(0x1a1a3e);
                child.material.emissiveIntensity = 0.2;
              }
              break;
          }

          // Apply weather adjustments
          if (isRaining) {
            child.material.color.multiplyScalar(0.8);
            child.material.color.lerp(new THREE.Color(0x5a5a5a), 0.1); // Darker, wet look
          }

          if (isSnowing) {
            child.material.color.multiplyScalar(1.2);
            child.material.color.lerp(new THREE.Color(0xffffff), 0.2); // Whiter, snowy look
          }

          child.material.needsUpdate = true;
        }
      });
    }
  }, [timeOfDay, isRaining, isSnowing]);

  // This function is called on each frame update
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

      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // Set the current stage based on the island's orientation
      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
    }
  });

  return (
    // {Island 3D model from: https://sketchfab.com/3d-models/foxs-islands-163b68e09fcc47618450150be7785907}
    <a.group ref={islandRef} {...props}>
      <mesh
        geometry={nodes.polySurface944_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface945_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface946_tree2_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface947_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface948_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface949_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.pCube11_rocks1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      {isRaining && <Rain />}
      {isSnowing && <Snow />}
    </a.group>
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