import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TweenMax } from 'gsap';
import styled from 'styled-components';

const CanvasContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background-color: black;
  cursor: crosshair;
`;

const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mountNode = mountRef.current;

    let renderer, scene, camera, city, town, particles, createCarPos = true, uSpeed = 0.001;

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = window.innerWidth > 800;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountNode.appendChild(renderer.domElement);

    // Scene
    scene = new THREE.Scene();
    const setcolor = 0xF02050;
    scene.background = new THREE.Color(setcolor);
    scene.fog = new THREE.Fog(setcolor, 10, 16);

    // Camera
    camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set(0, 2, 14); // Ajustando a posição da câmera para ficar mais alta

    city = new THREE.Object3D();
    town = new THREE.Object3D();
    scene.add(city);
    city.add(town);

    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 2);
    scene.add(ambientLight);

    // Spot Light (frontal)
    const lightFront = new THREE.SpotLight(0xFFFFFF, 40, 20);
    lightFront.position.set(15, 15, 5);
    lightFront.castShadow = true;
    lightFront.shadow.mapSize.width = 6000;
    lightFront.shadow.mapSize.height = 6000;
    city.add(lightFront);

    // Directional Light (para o topo dos prédios)
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 3);
    directionalLight.position.set(110, 250, 910); // Posicione de forma que ilumine o topo
    directionalLight.target.position.set(90, 990, 90); // Foco na cidade
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Carregar cubemap para reflexo de ambiente
    const loader = new THREE.CubeTextureLoader();
    const envMap = loader.load([
      'path/to/posx.jpg',
      'path/to/negx.jpg',
      'path/to/posy.jpg',
      'path/to/negy.jpg',
      'path/to/posz.jpg',
      'path/to/negz.jpg'
    ]);
    scene.environment = envMap;

    // Math Random Function
    const mathRandom = (num = 18) => -Math.random() * num + Math.random() * num;

    // Generate City (adicionando mais prédios)
    const initCity = () => {
      const segments = 2;
      for (let i = 1; i < 400; i++) { // Aumentando o número de prédios para 400
        const geometry = new THREE.BoxGeometry(0.8, 0.7, 0.7, segments, segments, segments);
        
        // Material para o corpo dos prédios
        const material = new THREE.MeshStandardMaterial({
          color: 0x000000,
          metalness: 0.7, // Aumentando a metalicidade para reflexo tipo espelho
          roughness: 0.1, // Suavizando a superfície para maximizar o reflexo
          envMap: envMap, // Aplicando o ambiente reflexivo
          wireframe: false,
          side: THREE.DoubleSide,
        });

       // Material para os topos com reflexo forte
const topMaterial = new THREE.MeshStandardMaterial({
  color: 0xFFFFFF,  // Cor branca intensa
  metalness: 1,     // Reflexo metálico alto para criar o efeito brilhante
  roughness: 0.05,  // Superfície suave para intensificar o reflexo
  envMap: envMap,   // Aplicando o reflexo de ambiente
  wireframe: false,
  side: THREE.DoubleSide,
});

        // Contorno em wireframe para as linhas brancas
        const wireframeMaterial = new THREE.MeshBasicMaterial({
          color: 0xFFFFFF,
          wireframe: true,
          opacity: Math.random() * 0.1, // Contorno que desaparece conforme a rotação
          transparent: true,
        });

        const cube = new THREE.Mesh(geometry, material);
        const wireframe = new THREE.Mesh(geometry, wireframeMaterial); // Adicionando o wireframe

        cube.castShadow = true;
        cube.receiveShadow = true;
        cube.rotationValue = 0.1 + Math.abs(mathRandom(8));

        // Aumentando o tamanho dos prédios no meio da cidade
        if (Math.abs(cube.position.x) < 3 && Math.abs(cube.position.z) < 3) {
          cube.scale.y = 0.1 + Math.abs(mathRandom(5)); // Prédios maiores no centro
        } else {
          cube.scale.y = 0.1 + Math.abs(mathRandom(3)); // Prédios regulares nas extremidades
        }

        // Aplicando o material com reflexo ao topo de certos prédios
        if (cube.scale.y > 66) {
          const topCube = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.7), topMaterial);
          topCube.position.y = cube.scale.y / 2; // Colocando o topo no topo do prédio
          cube.add(topCube); // Adicionando o topo com reflexo
        }

        cube.position.x = Math.round(mathRandom(10)); // Reduzindo a área da cidade para aproximar os prédios
        cube.position.z = Math.round(mathRandom(14)); // Reduzindo a área da cidade para aproximar os prédios

        cube.add(wireframe); // Adicionando o wireframe ao cubo
        town.add(cube);
      }

      city.add(town);
    };

    // Função para atualizar a intensidade do reflexo com base no ângulo da câmera
    const updateReflection = () => {
      town.children.forEach((building) => {
        const buildingTop = new THREE.Vector3(0, 1, 0); // Vetor normal para o topo do prédio (direção para cima)
        
        const cameraDirection = new THREE.Vector3();
        camera.getWorldDirection(cameraDirection); // Obtém a direção atual da câmera

        const angle = buildingTop.dot(cameraDirection); // Cálculo do ângulo entre o topo do prédio e a direção da câmera

        building.material.metalness = Math.max(0.2, angle * 1); // Ajuste da intensidade do reflexo
      });
    };

    // Create Cars (lines) + Particles (pequenas bolinhas)
    const createCars = (cScale = 2, cPos = 20, cColor = 0xFFFF00) => {
      const cMat = new THREE.MeshToonMaterial({ color: cColor, side: THREE.DoubleSide });
      const cGeo = new THREE.BoxGeometry(1, cScale / 40, cScale / 40);
      const cElem = new THREE.Mesh(cGeo, cMat);

      // Particles pequenas amarelas
      const particleMaterial = new THREE.PointsMaterial({
        color: 0xFFFF00,
        size: 0.01, // Tamanho bem pequeno das partículas
        transparent: true,
        opacity: 0.7,
      });

      const particleGeometry = new THREE.BufferGeometry();
      const particleCount = 100; // Ajustando a quantidade de partículas
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = Math.random() * 2 - 1; // X
        positions[i * 3 + 1] = Math.random() * 2 - 1; // Y
        positions[i * 3 + 2] = Math.random() * 2 - 1; // Z
      }

      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const particleSystem = new THREE.Points(particleGeometry, particleMaterial);

      // Movendo os carros e as partículas juntos
      if (createCarPos) {
        createCarPos = false;
        cElem.position.x = -cPos;
        cElem.position.z = mathRandom(3);
        particleSystem.position.set(cElem.position.x, cElem.position.y, cElem.position.z);
        TweenMax.to(cElem.position, 3, { x: cPos, repeat: -1, yoyo: true, delay: mathRandom(3) });
        TweenMax.to(particleSystem.position, 3, { x: cPos, repeat: -1, yoyo: true, delay: mathRandom(3) });
      } else {
        createCarPos = true;
        cElem.position.x = mathRandom(3);
        cElem.position.z = -cPos;
        cElem.rotation.y = Math.PI / 2;
        particleSystem.position.set(cElem.position.x, cElem.position.y, cElem.position.z);
        TweenMax.to(cElem.position, 5, {
          z: cPos,
          repeat: -1,
          yoyo: true,
          delay: mathRandom(3),
          ease: "Power1.easeInOut",
        });
        TweenMax.to(particleSystem.position, 5, {
          z: cPos,
          repeat: -1,
          yoyo: true,
          delay: mathRandom(3),
          ease: "Power1.easeInOut",
        });
      }

      cElem.receiveShadow = true;
      cElem.castShadow = true;
      cElem.position.y = Math.abs(mathRandom(5));
      particleSystem.position.y = cElem.position.y;
      city.add(cElem);
      city.add(particleSystem); // Adicionando o sistema de partículas na cidade
    };

    // Generate Lines (Cars)
    const generateLines = () => {
      for (let i = 0; i < 40; i++) { // Aumentando o número de linhas para 40
        createCars(0.1, 20);
      }
    };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      city.rotation.y -= ((mouse.x * 8) - camera.rotation.y) * uSpeed;
      city.rotation.x -= (-(mouse.y * 12) - camera.rotation.x) * uSpeed;

      if (city.rotation.x < -0.05) city.rotation.x = -0.05;
      else if (city.rotation.x > 1) city.rotation.x = 1;

      camera.lookAt(city.position);

      // Atualiza o reflexo baseado na posição da câmera
      updateReflection();

      renderer.render(scene, camera);
    };

    // Mouse Interaction
    const mouse = new THREE.Vector2();
    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", onMouseMove, false);
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Initialize and start animation
    initCity();
    generateLines();
    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (mountNode) {
        mountNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <CanvasContainer ref={mountRef} />;
};

export default ThreeScene;
