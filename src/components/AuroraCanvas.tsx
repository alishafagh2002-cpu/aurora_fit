import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface AuroraCanvasProps {
  intensityBoost?: boolean; // When in final section or high intensity mode
}

export const AuroraCanvas: React.FC<AuroraCanvasProps> = ({ intensityBoost = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x03060a, 0.035);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 10);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: !isMobile,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.2 : 1.75));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 1. Aurora Energy Rings Group
    const ringGroup = new THREE.Group();
    scene.add(ringGroup);

    // Primary Torus Aurora Ring (Outer neon ribbon)
    const ringGeometry = new THREE.TorusGeometry(3.6, 0.045, 32, 180);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x06b6d4, // Cyan
      transparent: true,
      opacity: 0.9,
    });
    const mainRing = new THREE.Mesh(ringGeometry, ringMaterial);
    ringGroup.add(mainRing);

    // Secondary Inner Ring (Violet / Electric blue)
    const innerRingGeom = new THREE.TorusGeometry(3.2, 0.025, 24, 160);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6, // Violet
      transparent: true,
      opacity: 0.75,
    });
    const innerRing = new THREE.Mesh(innerRingGeom, innerRingMat);
    innerRing.rotation.x = Math.PI / 12;
    innerRing.rotation.y = Math.PI / 8;
    ringGroup.add(innerRing);

    // Tertiary Halo Ribbon (Teal glowing soft band)
    const haloGeom = new THREE.TorusGeometry(3.8, 0.12, 16, 120);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9,
      transparent: true,
      opacity: 0.25,
      wireframe: true,
    });
    const haloRing = new THREE.Mesh(haloGeom, haloMat);
    ringGroup.add(haloRing);

    // 2. Floating Atmospheric Energy Particle Field
    const particleCount = isMobile ? 350 : 850;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const cyanColor = new THREE.Color(0x22d3ee);
    const violetColor = new THREE.Color(0xa855f7);
    const tealColor = new THREE.Color(0x14b8a6);

    for (let i = 0; i < particleCount; i++) {
      // Distribute particles in a cylinder around the center
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.2 + Math.random() * 6.5;
      const x = Math.cos(angle) * radius;
      const y = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 6;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      const pick = Math.random();
      const col = pick < 0.5 ? cyanColor : pick < 0.8 ? violetColor : tealColor;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      scales[i] = Math.random() * 0.08 + 0.02;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle sprite using canvas texture
    const canvasTexture = document.createElement('canvas');
    canvasTexture.width = 32;
    canvasTexture.height = 32;
    const ctx = canvasTexture.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.3, 'rgba(6, 182, 212, 0.8)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(canvasTexture);

    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 0.12 : 0.16,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 3. Ambient & Point Lighting
    const ambientLight = new THREE.AmbientLight(0x050b14, 2);
    scene.add(ambientLight);

    const cyanPoint = new THREE.PointLight(0x06b6d4, 3.5, 15);
    cyanPoint.position.set(2, 1, 3);
    scene.add(cyanPoint);

    const violetPoint = new THREE.PointLight(0x8b5cf6, 3.0, 15);
    violetPoint.position.set(-2, -1, 3);
    scene.add(violetPoint);

    // Mouse Tracking with Smooth Lerp
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 2;
      targetY = (e.clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Handle tab visibility (pause rendering when tab hidden)
    let isTabVisible = true;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      if (!isTabVisible) return;

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerping
      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;

      if (!prefersReducedMotion) {
        // Slow subtle rotation of the Aurora Ring
        ringGroup.rotation.z = elapsedTime * 0.12;
        ringGroup.rotation.x = Math.sin(elapsedTime * 0.15) * 0.15 + mouseY * 0.25;
        ringGroup.rotation.y = Math.cos(elapsedTime * 0.12) * 0.15 + mouseX * 0.25;

        innerRing.rotation.z = -elapsedTime * 0.18;
        innerRing.rotation.y = Math.sin(elapsedTime * 0.2) * 0.3;

        haloRing.rotation.z = elapsedTime * 0.08;

        // Camera gentle floating + parallax response
        camera.position.x = mouseX * 0.8;
        camera.position.y = -mouseY * 0.8;
        camera.lookAt(0, 0, 0);

        // Particle floating motion
        const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
        const currentPos = posAttr.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3;
          // Float upwards
          currentPos[idx + 1] += 0.003;
          if (currentPos[idx + 1] > 4.5) {
            currentPos[idx + 1] = -4.5;
          }

          // Subtle horizontal harmonic sway
          currentPos[idx] += Math.sin(elapsedTime * 0.8 + i) * 0.0015;

          // If intensityBoost is on (Section 15), gently converge towards center
          if (intensityBoost) {
            currentPos[idx] += (0 - currentPos[idx]) * 0.005;
            currentPos[idx + 2] += (0 - currentPos[idx + 2]) * 0.005;
          }
        }
        posAttr.needsUpdate = true;

        // Dynamic light pulsation
        const lightPulse = Math.sin(elapsedTime * 1.5) * 0.3 + 1;
        cyanPoint.intensity = (intensityBoost ? 5.5 : 3.5) * lightPulse;
        violetPoint.intensity = (intensityBoost ? 4.8 : 3.0) * lightPulse;
        ringMaterial.opacity = intensityBoost ? 1.0 : (0.8 + Math.sin(elapsedTime * 2) * 0.15);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.dispose();
        if (container.contains(rendererRef.current.domElement)) {
          container.removeChild(rendererRef.current.domElement);
        }
      }
      ringGeometry.dispose();
      ringMaterial.dispose();
      innerRingGeom.dispose();
      innerRingMat.dispose();
      haloGeom.dispose();
      haloMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      particleTexture.dispose();
    };
  }, [intensityBoost]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
