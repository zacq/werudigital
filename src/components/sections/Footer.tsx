"use client";

import { motion } from "framer-motion";

const socials = [
  { icon: "▶",  label: "YouTube",   href: "https://youtube.com/@WeruTVFM" },
  { icon: "f",  label: "Facebook",  href: "https://facebook.com/WeruTV" },
  { icon: "✖",  label: "X",         href: "https://x.com/WeruTV" },
  { icon: "♪",  label: "TikTok",    href: "https://tiktok.com/@Werutv.fm96.4" },
  { icon: "📸", label: "Instagram", href: "https://instagram.com/werutv" },
];

export default function Footer() {
  return (
    <motion.footer
      className="relative z-10 px-5 pb-10 pt-6 overflow-hidden"
      style={{ background: "rgba(12,2,2,0.92)", backdropFilter: "blur(2px)" }}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Deep red ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(122,16,16,0.30) 0%, transparent 70%)",
      }}/>

      <div
        className="max-w-sm mx-auto px-5 py-5 rounded-2xl flex flex-col items-center gap-4 relative"
        style={{
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 0 0 1px rgba(200,16,46,0.12), inset 0 1px 0 rgba(255,255,255,0.08), 0 16px 40px rgba(0,0,0,0.50)",
        }}
      >
        {/* Social icons — staggered entry */}
        <div className="flex items-center gap-3">
          {socials.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-9 h-9 rounded-full flex items-center justify-center text-white/60 text-sm font-bold"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.35 }}
              whileHover={{ scale: 1.15, background: "rgba(249,125,0,0.20)", borderColor: "rgba(249,125,0,0.40)" }}
              whileTap={{ scale: 0.92 }}
            >
              {s.icon}
            </motion.a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/8" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-[10px] text-white/60">
            © {new Date().getFullYear()} Weru Digital. All rights reserved.
          </p>
          <p className="text-[10px] text-white/40 mt-0.5">
            werudigital.co.ke/connect
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
