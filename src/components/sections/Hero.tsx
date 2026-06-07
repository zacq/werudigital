"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import GlassButton from "@/components/ui/GlassButton";

const slides = [
  { emoji: "📺", text: "Kenya's #1 broadcast experience — now right in your hands." },
  { emoji: "🎁", text: "Subscribe to Weru TV & enter our weekly prize draw — winners announced live on air!" },
  { emoji: "🛍️", text: "Our 10th Anniversary merch drop is coming — join the waitlist & be first to shop." },
  { emoji: "🎵", text: "Follow us on TikTok & react to our videos — top fans get featured FREE on werudigital.co.ke!" },
  { emoji: "📸", text: "Tag @WeruDigital on Instagram — most-liked post wins Weru goodies every month." },
  { emoji: "▶️", text: "Subscribe on YouTube & comment — top engagers unlock exclusive Weru rewards." },
  { emoji: "⭐", text: "Watch. Shop. Share. Get rewarded — only on Weru Digital." },
];

const channels = [
  "Zuku CH 39",
  "DStv CH 368",
  "Startimes CH 440",
  "Azam Channel 342",
  "Pang & Signet",
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  // Auto-advance every 4 seconds
  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % slides.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-dvh px-5 pt-10 pb-8 text-center"
      style={{ background: "linear-gradient(160deg, #6B0A0A 0%, #7A1010 45%, #3a0808 100%)" }}
    >
      {/* Logo header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "10px 24px",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)",
        }}
      >
        <img
          src="/images/weru-digital-logo-final.jpeg"
          alt="Weru Digital"
          style={{ height: "46px", width: "auto", objectFit: "contain", display: "block" }}
        />
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

      {/* Sales carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mb-10 max-w-xs w-full"
      >
        {/* Slide text */}
        <div className="relative h-20 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.38, ease: "easeOut" }}
              className="absolute text-center px-1 leading-snug"
              style={{
                fontFamily: "var(--font-nunito), 'Nunito', sans-serif",
                fontWeight: 800,
                fontSize: "1.05rem",
                background: "linear-gradient(180deg, #FFFFFF 0%, #FFE78A 45%, #FFC93C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.55))",
                letterSpacing: "-0.01em",
              }}
            >
              <span style={{ WebkitTextFillColor: "initial", filter: "none" }} className="mr-1.5">
                {slides[index].emoji}
              </span>
              {slides[index].text}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-1.5 mt-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="rounded-full transition-all"
              style={{
                width:  i === index ? "18px" : "6px",
                height: "6px",
                background: i === index ? "#f97d00" : "rgba(255,255,255,0.25)",
                border: "none",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-sm"
      >
        <GlassButton
          href="https://werudigital.co.ke/tv#tv-schedule"
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
          href="https://werudigital.co.ke/"
          variant="pill"
          icon="📋"
          fullWidth
        >
          Request Rate Card
        </GlassButton>
      </motion.div>

      {/* Channel ticker */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="w-full max-w-xs sm:max-w-sm mt-4 overflow-hidden rounded-xl"
        style={{
          background: "rgba(0,0,0,0.40)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.35)",
        }}
      >
        <div className="flex items-center">
          <div
            className="flex-shrink-0 px-2.5 py-2 text-[9px] font-bold tracking-widest uppercase text-white"
            style={{
              background: "rgba(200,16,46,0.75)",
              borderRight: "1px solid rgba(255,255,255,0.10)",
            }}
          >
            WATCH
          </div>
          <div className="overflow-hidden flex-1">
            <div className="ticker-ltr flex whitespace-nowrap">
              {[...channels, ...channels].map((ch, i) => (
                <span key={i} className="inline-flex items-center py-2 px-3 text-[11px] font-semibold text-white/80">
                  📺 {ch}
                  <span className="ml-3 text-white/25">·</span>
                </span>
              ))}
            </div>
          </div>
        </div>
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
