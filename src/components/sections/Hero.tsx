"use client";

import { motion } from "framer-motion";
import GlassButton from "@/components/ui/GlassButton";

export default function Hero() {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-5 pt-10 pb-8 text-center"
      style={{ background: "linear-gradient(160deg, #6B0A0A 0%, #7A1010 45%, #3a0808 100%)" }}
    >
      {/* Glass header strip */}
      <motion.div
        className="glass-sm px-6 py-4 mb-8 flex items-center gap-3"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Logo placeholder — swap with <Image> when you have the asset */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f97d00] to-[#C8102E] flex items-center justify-center font-bold text-white text-sm shadow-lg">
          W
        </div>
        <span className="text-white font-bold text-lg tracking-wide">Weru Digital</span>
      </motion.div>

      {/* ON AIR badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-6"
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass"
          style={{
            background: "rgba(200, 16, 46, 0.18)",
            border: "1px solid rgba(200, 16, 46, 0.50)",
            boxShadow: "0 0 20px rgba(200, 16, 46, 0.25)",
          }}
          animate={{ boxShadow: [
            "0 0 16px rgba(200,16,46,0.25)",
            "0 0 32px rgba(200,16,46,0.55)",
            "0 0 16px rgba(200,16,46,0.25)",
          ]}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.span
            className="w-2 h-2 rounded-full bg-[#C8102E]"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <span className="text-xs font-bold text-white tracking-widest uppercase">
            On Air Now
          </span>
        </motion.div>
      </motion.div>

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="mb-3"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}
        >
          Watch.{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #FACC15, #fff8e0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 1px 6px rgba(0,0,0,0.3))",
            }}
          >
            Listen.
          </span>{" "}
          Connect.
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-white text-base mb-10 max-w-xs leading-relaxed"
        style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
      >
        Kenya&apos;s premier broadcast experience — now in your hands.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-sm"
      >
        <GlassButton
          href="https://werudigital.co.ke/watch"
          variant="primary"
          icon="📺"
          fullWidth
        >
          Watch Live TV
        </GlassButton>
        <GlassButton
          href="https://werudigital.co.ke/radio"
          variant="secondary"
          icon="📻"
          fullWidth
        >
          Listen Live Radio
        </GlassButton>
      </motion.div>

      {/* Rate Card button */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.5 }}
        className="w-full max-w-xs sm:max-w-sm mt-3"
      >
        <GlassButton
          href="https://werudigital.co.ke/rate-card"
          variant="pill"
          icon="📋"
          fullWidth
        >
          Request Rate Card
        </GlassButton>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center pt-2"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2.5 rounded-full bg-white/50"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
