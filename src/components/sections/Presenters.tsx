"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const presenters = [
  { name: "Sarah Mwangi", show: "Morning Glory", initials: "SM", color: "#f97d00" },
  { name: "James Kariuki", show: "Evening Digest", initials: "JK", color: "#C8102E" },
  { name: "Amina Hassan", show: "Weekend Live", initials: "AH", color: "#f97d00" },
  { name: "David Ochieng", show: "Sports Central", initials: "DO", color: "#C8102E" },
];

function PresenterCard({ presenter, index }: { presenter: typeof presenters[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <motion.div
      ref={ref}
      key={presenter.name}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex-shrink-0 w-40 sm:w-44"
    >
      <div className="glass relative overflow-visible rounded-2xl p-4 flex flex-col items-center text-center">
        {/* Glow behind avatar */}
        <div
          className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full blur-xl opacity-50 pointer-events-none"
          style={{ background: presenter.color }}
        />
        {/* Parallax avatar */}
        <motion.div style={{ y }}>
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3 relative z-10 shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${presenter.color}, rgba(0,0,0,0.4))`,
              border: `2px solid ${presenter.color}55`,
              boxShadow: `0 0 20px ${presenter.color}44`,
            }}
          >
            {presenter.initials}
          </div>
        </motion.div>
        <p className="text-xs font-bold text-white leading-snug">{presenter.name}</p>
        <p className="text-[10px] text-white/50 mt-0.5">{presenter.show}</p>
      </div>
    </motion.div>
  );
}

export default function Presenters() {
  return (
    <section className="relative z-10 pb-12" style={{ background: "#1A1A1A" }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="px-5 mb-5"
      >
        <h2 className="text-xl font-bold text-white">Meet the Presenters</h2>
        <p className="text-xs text-white/75 mt-1">The voices of Weru</p>
      </motion.div>

      <div className="flex gap-4 overflow-x-auto no-scrollbar px-5 pb-2">
        {presenters.map((p, i) => (
          <PresenterCard key={p.name} presenter={p} index={i} />
        ))}
      </div>
    </section>
  );
}
