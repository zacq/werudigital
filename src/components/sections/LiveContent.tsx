"use client";

import { motion } from "framer-motion";

const content = [
  { id: 1, tag: "🔥 Trending", title: "Weru TV Evening News", duration: "30 min", thumb: null },
  { id: 2, tag: "🎥 Latest", title: "Morning Show Highlights", duration: "15 min", thumb: null },
  { id: 3, tag: "🔥 Trending", title: "Sports Digest — Weekend", duration: "20 min", thumb: null },
  { id: 4, tag: "🎥 Latest", title: "Cultural Showcase", duration: "45 min", thumb: null },
];

export default function LiveContent() {
  return (
    <section className="relative z-10 pb-12" style={{ background: "#111111" }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="px-5 mb-5"
      >
        <h2 className="text-xl font-bold text-white">Live Content</h2>
        <p className="text-xs text-white/75 mt-1">Swipe to browse</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex gap-4 overflow-x-auto no-scrollbar px-5 pb-2"
      >
        {content.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.97 }}
            className="flex-shrink-0 w-52 cursor-pointer"
            style={{ willChange: "transform" }}
          >
            {/* Thumbnail */}
            <div className="glass relative rounded-2xl overflow-hidden mb-0" style={{ aspectRatio: "16/9" }}>
              {/* Placeholder gradient thumbnail */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg,
                    rgba(${i % 2 === 0 ? "249,125,0" : "200,16,46"}, 0.4) 0%,
                    rgba(10,5,0,0.85) 100%)`,
                }}
              />
              {/* Play icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    boxShadow: "0 0 16px rgba(249,125,0,0.55)",
                  }}
                >
                  <span className="text-lg ml-0.5">▶</span>
                </div>
              </div>
              {/* Gradient overlay for readability */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1/2"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}
              />
              {/* Tag */}
              <div className="absolute top-2 left-2">
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  {item.tag}
                </span>
              </div>
            </div>
            {/* Info */}
            <div className="mt-2 px-1">
              <p className="text-xs font-semibold text-white leading-snug line-clamp-2">{item.title}</p>
              <p className="text-[10px] text-white/75 mt-0.5">{item.duration}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
