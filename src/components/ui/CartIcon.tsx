"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function CartIcon() {
  const [count] = useState(0);

  return (
    <motion.a
      href="https://werudigital.co.ke/shop/cart"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View cart"
      className="fixed top-4 right-4 z-50 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer"
      style={{
        background: "rgba(0,0,0,0.55)",
        border: "1px solid rgba(255,255,255,0.18)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {/* Cart SVG */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>

      {/* Badge — only shown when count > 0 */}
      {count > 0 && (
        <span
          className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold text-white flex items-center justify-center"
          style={{ background: "#f97d00" }}
        >
          {count}
        </span>
      )}
    </motion.a>
  );
}
