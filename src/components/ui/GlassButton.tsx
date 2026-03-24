"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "pill";
  className?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export default function GlassButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  icon,
  fullWidth = false,
}: GlassButtonProps) {
  const baseClasses = `
    relative inline-flex items-center justify-center gap-3
    font-semibold text-white cursor-pointer select-none
    transition-all duration-200
    ${fullWidth ? "w-full" : ""}
    ${className}
  `;

  const variantClasses: Record<string, string> = {
    primary: `
      glass px-6 py-3.5 rounded-2xl
      bg-gradient-to-r from-[rgba(249,125,0,0.35)] to-[rgba(200,16,46,0.2)]
      border border-[rgba(249,125,0,0.5)]
      hover:border-[rgba(249,125,0,0.8)]
    `,
    secondary: `
      glass px-6 py-3.5 rounded-2xl
      bg-gradient-to-r from-[rgba(200,16,46,0.2)] to-[rgba(249,125,0,0.1)]
      border border-[rgba(200,16,46,0.35)]
      hover:border-[rgba(200,16,46,0.6)]
    `,
    pill: `
      glass-sm px-5 py-3.5 rounded-full
      bg-[rgba(249,125,0,0.08)]
      border border-[rgba(249,125,0,0.2)]
      hover:border-[rgba(249,125,0,0.5)]
      text-sm
    `,
  };

  const inner = (
    <>
      {icon && <span className="text-xl flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {/* Inner glow overlay */}
      <span
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)",
        }}
      />
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${variantClasses[variant]}`}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {inner}
    </motion.button>
  );
}
