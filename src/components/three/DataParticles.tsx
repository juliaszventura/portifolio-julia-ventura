"use client";

import { PointMaterial } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const PALETTE = ["#124C63", "#2F1D56", "#0B2360"] as const;

const DESKTOP_COUNT = 260;
const MOBILE_COUNT = 110;

const SPREAD = { x: 9, y: 5.5, zNear: 3, zFar: -7 };

const BASE_ROTATION = 0.045;

const REPULSION_RADIUS = 1.7;
const REPULSION_STRENGTH = 0.9;

function seeded(seed: number) {
  const value = Math.sin(seed * 127.1) * 43758.5453;
  return value - Math.floor(value);
}

function ParticleField({ count }: { count: number }) {
  const shouldReduceMotion = useReducedMotion();
  const groupRef = useRef<THREE.Group>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);

  const lastScrollY = useRef(0);
  const scrollBoost = useRef(0);
  const pointer = useRef({ x: 0, y: 0, active: false });

  const mouseLocal = useMemo(() => new THREE.Vector3(), []);

  const { viewport } = useThree();

  const { basePositions, phases, colors, livePositions } = useMemo(() => {
    const base = new Float32Array(count * 3);
    const live = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const ph = new Float32Array(count);
    const color = new THREE.Color();

    for (let i = 0; i < count; i += 1) {
      const x = (seeded(i * 3 + 1) - 0.5) * 2 * SPREAD.x;
      const y = (seeded(i * 3 + 2) - 0.5) * 2 * SPREAD.y;
      const z = SPREAD.zFar + seeded(i * 3 + 3) * (SPREAD.zNear - SPREAD.zFar);

      base[i * 3] = x;
      base[i * 3 + 1] = y;
      base[i * 3 + 2] = z;
      live[i * 3] = x;
      live[i * 3 + 1] = y;
      live[i * 3 + 2] = z;

      ph[i] = seeded(i + 977) * Math.PI * 2;

      color.set(PALETTE[i % PALETTE.length]);
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }

    return {
      basePositions: base,
      livePositions: live,
      colors: cols,
      phases: ph,
    };
  }, [count]);

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
      pointer.current.active = true;
    };
    const handleLeave = () => {
      pointer.current.active = false;
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("pointerleave", handleLeave);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  useFrame((state, delta) => {
    const group = groupRef.current;
    const geometry = geometryRef.current;
    if (!group || !geometry) return;

    const dt = Math.min(delta, 0.1);
    const time = state.clock.elapsedTime;

    if (shouldReduceMotion) return;

    const currentScrollY = window.scrollY;
    const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);
    lastScrollY.current = currentScrollY;

    const target = Math.min(scrollDelta, 140);
    scrollBoost.current = THREE.MathUtils.damp(
      scrollBoost.current,
      target,
      target > scrollBoost.current ? 14 : 2.2,
      dt,
    );

    const boost = 1 + scrollBoost.current * 0.055;

    group.rotation.y += BASE_ROTATION * boost * dt;
    group.rotation.x = Math.sin(time * 0.08) * 0.12;

    const repel = pointer.current.active;
    if (repel) {
      mouseLocal.set(
        (pointer.current.x * viewport.width) / 2,
        (pointer.current.y * viewport.height) / 2,
        0,
      );
      group.worldToLocal(mouseLocal);
    }

    const positions = geometry.attributes.position.array as Float32Array;
    const drift = 0.22;

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      const phase = phases[i];

      let targetX = basePositions[i3] + Math.sin(time * 0.25 + phase) * drift;
      let targetY =
        basePositions[i3 + 1] + Math.cos(time * 0.21 + phase * 1.3) * drift;
      const targetZ =
        basePositions[i3 + 2] + Math.sin(time * 0.18 + phase * 0.7) * drift;

      if (repel) {
        const dx = targetX - mouseLocal.x;
        const dy = targetY - mouseLocal.y;
        const distanceSq = dx * dx + dy * dy;

        if (distanceSq < REPULSION_RADIUS * REPULSION_RADIUS && distanceSq > 1e-6) {
          const distance = Math.sqrt(distanceSq);
          const force = (1 - distance / REPULSION_RADIUS) * REPULSION_STRENGTH;
          targetX += (dx / distance) * force;
          targetY += (dy / distance) * force;
        }
      }

      positions[i3] = THREE.MathUtils.damp(positions[i3], targetX, 5, dt);
      positions[i3 + 1] = THREE.MathUtils.damp(positions[i3 + 1], targetY, 5, dt);
      positions[i3 + 2] = THREE.MathUtils.damp(positions[i3 + 2], targetZ, 5, dt);
    }

    geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[livePositions, 3]}
          />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <PointMaterial
          transparent
          vertexColors
          size={0.075}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function DataParticles() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const apply = () =>
      setCount(mobileQuery.matches ? MOBILE_COUNT : DESKTOP_COUNT);

    apply();
    mobileQuery.addEventListener("change", apply);
    return () => mobileQuery.removeEventListener("change", apply);
  }, []);

  if (count === null) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-[5]"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        gl={{ alpha: true, antialias: false }}
        dpr={[1, 1.5]}
      >
        <ParticleField count={count} />
      </Canvas>
    </div>
  );
}
