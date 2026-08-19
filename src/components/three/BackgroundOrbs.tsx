"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

type OrbConfig = {
  nodeId: string;
  color: string;
  opacity: number;
  width: number;
  height: number;
  left: string;
  top: number;
  parallaxFactor: number;
  drift: {
    x: number[];
    y: number[];
    scale: number[];
    duration: number;
  };
};

const ORBS: OrbConfig[] = [
  {
    nodeId: "1:889",
    color: "#124C63",
    opacity: 0.58,
    width: 451,
    height: 436,
    left: "4.61%",
    top: 99,
    parallaxFactor: 0.3,
    drift: {
      x: [0, 40, -25, 0],
      y: [0, -35, 25, 0],
      scale: [1, 1.08, 0.95, 1],
      duration: 21,
    },
  },
  {
    nodeId: "1:972",
    color: "#2F1D56",
    opacity: 0.46,
    width: 515,
    height: 480,
    left: "32.03%",
    top: 237,
    parallaxFactor: 0.6,
    drift: {
      x: [0, -45, 30, 0],
      y: [0, 30, -20, 0],
      scale: [1, 0.94, 1.1, 1],
      duration: 17,
    },
  },
  {
    nodeId: "1:974",
    color: "#0B2360",
    opacity: 0.52,
    width: 443,
    height: 443,
    left: "65.23%",
    top: 364,
    parallaxFactor: 0.15,
    drift: {
      x: [0, 25, -35, 0],
      y: [0, -45, 15, 0],
      scale: [1, 1.12, 0.97, 1],
      duration: 25,
    },
  },
];

function Orb({ orb }: { orb: OrbConfig }) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const parallaxY = useTransform(
    scrollY,
    (value) => -value * orb.parallaxFactor,
  );

  return (
    <motion.div
      className="absolute"
      style={{
        left: orb.left,
        top: orb.top,
        y: shouldReduceMotion ? 0 : parallaxY,
      }}
      data-node-id={orb.nodeId}
    >
      <motion.div
        className="rounded-full blur-[120px]"
        style={{
          width: orb.width,
          height: orb.height,
          backgroundColor: orb.color,
          opacity: orb.opacity,
          willChange: "transform",
        }}
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: orb.drift.x,
                y: orb.drift.y,
                scale: orb.drift.scale,
              }
        }
        transition={{
          duration: orb.drift.duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

export default function BackgroundOrbs() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {ORBS.map((orb) => (
        <Orb key={orb.nodeId} orb={orb} />
      ))}
    </div>
  );
}
