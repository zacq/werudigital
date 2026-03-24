"use client";

import { motion } from "framer-motion";

const socials = [
  { icon: "▶", label: "YouTube", href: "https://youtube.com/@werutv" },
  { icon: "f", label: "Facebook", href: "https://facebook.com/werutv" },
  { icon: "✖", label: "X", href: "https://x.com/werutv" },
  { icon: "♪", label: "TikTok", href: "https://tiktok.com/@werutv" },
];

export default function Footer() {
  return (
    <motion.footer
      className="relative z-10 px-5 pb-8 pt-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div
        className="max-w-sm mx-auto px-5 py-4 rounded-2xl flex flex-col items-center gap-4"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Social icons */}
        <div className="flex items-center gap-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white/90 hover:bg-white/10 transition-all duration-200 text-sm font-bold"
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/8" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-[10px] text-white/30">
            © {new Date().getFullYear()} Weru Digital. All rights reserved.
          </p>
          <p className="text-[10px] text-white/20 mt-0.5">
            werudigital.co.ke/connect
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
