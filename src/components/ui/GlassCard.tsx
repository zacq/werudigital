"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type GlassVariant = "default" | "sm" | "strong";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: GlassVariant;
  glow?: "red" | "orange" | "gold" | "none";
  onClick?: () => void;
  animate?: boolean;
}

const variantClass: Record<GlassVariant, string> = {
  default: "glass",
  sm: "glass-sm",
  strong: "glass-strong",
};

const glowClass: Record<string, string> = {
  red: "glow-red",
  orange: "glow-orange",
  gold: "glow-gold",
  none: "",
};

export default function GlassCard({
  children,
  className = "",
  variant = "default",
  glow = "none",
  onClick,
  animate = true,
}: GlassCardProps) {
  const base = `${variantClass[variant]} ${glowClass[glow]} ${className}`;

  if (!animate) {
    return (
      <div className={base} onClick={onClick}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={base}
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
