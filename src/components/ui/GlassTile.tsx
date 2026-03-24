"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassTileProps {
  icon: ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function GlassTile({ icon, label, href, onClick, className = "" }: GlassTileProps) {
  const content = (
    <>
      <span className="text-3xl mb-2 drop-shadow-lg">{icon}</span>
      <span className="text-xs font-medium text-white/80 tracking-wide">{label}</span>
      {/* Glow overlay on hover handled via motion */}
      <span
        className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle at 50% 40%, rgba(249,115,22,0.15) 0%, transparent 70%)",
        }}
      />
    </>
  );

  const classes = `
    relative group glass-sm flex flex-col items-center justify-center
    py-6 px-4 cursor-pointer select-none text-center
    ${className}
  `;

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        whileHover={{ y: -4, scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 350, damping: 20 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div
      onClick={onClick}
      className={classes}
      whileHover={{ y: -4, scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 350, damping: 20 }}
    >
      {content}
    </motion.div>
  );
}
