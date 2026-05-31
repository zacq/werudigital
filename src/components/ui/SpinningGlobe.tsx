"use client";

import { motion, useAnimationFrame } from "framer-motion";
import { useRef, useState } from "react";

// Remotion principle: all motion is driven programmatically, not via CSS.
// useAnimationFrame gives us a frame counter equivalent to Remotion's useCurrentFrame().
// The globe has two animation layers:
//   1. Longitude lines rotate at a constant speed (the "spin")
//   2. A specular highlight pans slowly across the sphere (depth illusion)

export default function SpinningGlobe() {
  const [angle, setAngle] = useState(0);
  const [shimmerX, setShimmerX] = useState(0);

  // Frame-driven rotation — equivalent to interpolate(frame, [0, fps*6], [0, 360]) in Remotion
  useAnimationFrame((t) => {
    const SPIN_DURATION  = 6000;   // ms for one full rotation
    const SHIM_DURATION  = 4000;   // ms for shimmer cycle
    setAngle((t % SPIN_DURATION) / SPIN_DURATION * 360);
    setShimmerX((t % SHIM_DURATION) / SHIM_DURATION);
  });

  // Longitude ellipse: rx shrinks to 0 at ±90° (edge-on), max at 0°/180° (face-on)
  // This is the math that makes the meridian look like it wraps around a sphere
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const rx1 = Math.abs(Math.cos(toRad(angle))) * 9;           // primary meridian
  const rx2 = Math.abs(Math.cos(toRad(angle + 90))) * 9;      // secondary meridian (90° offset)

  // Opacity: faint when edge-on (rx near 0), full when face-on
  const op1 = 0.35 + 0.55 * Math.abs(Math.cos(toRad(angle)));
  const op2 = 0.35 + 0.55 * Math.abs(Math.cos(toRad(angle + 90)));

  // Specular highlight position (sweeps left→right as globe turns)
  const hx = 6 + shimmerX * 16;

  return (
    <motion.div
      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden relative"
      style={{
        background: "radial-gradient(circle at 36% 32%, #FFB347 0%, #f97d00 48%, #C84800 100%)",
        boxShadow: "0 3px 12px rgba(249,115,22,0.50), inset 0 1px rgba(255,255,255,0.22)",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 220, damping: 16 }}
    >
      <svg viewBox="0 0 28 28" width="26" height="26" fill="none">

        {/* ── Static layers ─────────────────────────────────────────── */}

        {/* Outer sphere boundary */}
        <circle cx="14" cy="14" r="11.5"
          stroke="rgba(255,255,255,0.85)" strokeWidth="1.1"/>

        {/* Equator latitude line */}
        <ellipse cx="14" cy="14" rx="11.5" ry="3.8"
          stroke="rgba(255,255,255,0.60)" strokeWidth="0.9"/>

        {/* Upper latitude */}
        <ellipse cx="14" cy="9" rx="9.2" ry="2.8"
          stroke="rgba(255,255,255,0.38)" strokeWidth="0.75"/>

        {/* Lower latitude */}
        <ellipse cx="14" cy="19" rx="9.2" ry="2.8"
          stroke="rgba(255,255,255,0.38)" strokeWidth="0.75"/>

        {/* ── Animated longitude meridians (frame-driven) ───────────── */}

        {/* Primary meridian — rx derived from rotation angle */}
        <ellipse
          cx="14" cy="14"
          rx={rx1} ry="11.5"
          stroke={`rgba(255,255,255,${op1.toFixed(2)})`}
          strokeWidth="1"
        />

        {/* Secondary meridian — 90° out of phase */}
        <ellipse
          cx="14" cy="14"
          rx={rx2} ry="11.5"
          stroke={`rgba(255,255,255,${op2.toFixed(2)})`}
          strokeWidth="0.85"
        />

        {/* ── Moving specular highlight (depth cue) ─────────────────── */}
        <ellipse
          cx={hx} cy="10"
          rx="3.5" ry="2"
          fill={`rgba(255,255,255,${(0.18 * Math.sin(shimmerX * Math.PI)).toFixed(2)})`}
        />

      </svg>
    </motion.div>
  );
}
