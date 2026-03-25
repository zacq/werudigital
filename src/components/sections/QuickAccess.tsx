"use client";

import { motion } from "framer-motion";
import GlassTile from "@/components/ui/GlassTile";

const tiles = [
  { icon: "🌐", label: "Website", href: "https://werudigital.co.ke" },
  { icon: "▶️", label: "YouTube", href: "https://youtube.com/@werutv" },
  { icon: "🎵", label: "TikTok", href: "https://tiktok.com/@werutv" },
  { icon: "👍", label: "Facebook", href: "https://facebook.com/werutv" },
  { icon: "✖️", label: "X (Twitter)", href: "https://x.com/werutv" },
  { icon: "📍", label: "Find Us", href: "https://maps.google.com/?q=Weru+TV+Kenya" },
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

export default function QuickAccess() {
  return (
    <section className="relative z-10 px-5 pt-10 pb-12" style={{ background: "#111111" }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-xl font-bold text-white text-center">Quick Access</h2>
        <p className="text-xs text-white/75 text-center mt-1">Tap to connect instantly</p>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 gap-3 max-w-sm mx-auto sm:max-w-md sm:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
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
    </section>
  );
}
