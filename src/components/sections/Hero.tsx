"use client";

import { motion } from "framer-motion";
import GlassButton from "@/components/ui/GlassButton";
import GlassTile from "@/components/ui/GlassTile";

const tiles = [
  { icon: "🌐", label: "Website",    href: "https://werudigital.co.ke" },
  { icon: "▶️", label: "YouTube",   href: "https://youtube.com/@werutvfm3411" },
  { icon: "🎵", label: "TikTok",    href: "https://tiktok.com/@Werutv.fm96.4" },
  { icon: "👍", label: "Facebook",  href: "https://facebook.com/WeruTV" },
  { icon: "📸", label: "Instagram", href: "https://instagram.com/werutv" },
  { icon: "✖️", label: "X (Twitter)", href: "https://x.com/WeruTV" },
  { icon: "📍", label: "Find Us",   href: "https://maps.google.com/?q=Weru+TV+Kenya" },
  { icon: "📞", label: "Call Hotline", href: "tel:+254707065000" },
  { icon: "📱", label: "Mobile",    href: "tel:+254700117026" },
  { icon: "💬", label: "WhatsApp",  href: "https://wa.me/254793004303?text=Welcome%20to%20WeruTv" },
  { icon: "✉️", label: "Email Us",  href: "mailto:sales@werutv.co.ke" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.92 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export default function Hero() {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-dvh px-5 pt-10 pb-8 text-center"
      style={{ background: "linear-gradient(160deg, #6B0A0A 0%, #7A1010 45%, #3a0808 100%)" }}
    >
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

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-sm sm:max-w-md"
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

      {/* Quick Access tiles */}
      <motion.div
        className="grid grid-cols-3 gap-2.5 sm:gap-3 max-w-sm mx-auto sm:max-w-md sm:grid-cols-4 mt-6 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {tiles.map((tile) => (
          <motion.div key={tile.label} variants={itemVariants}>
            <GlassTile
              icon={tile.icon}
              label={tile.label}
              href={tile.href}
            />
          </motion.div>
        ))}
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
