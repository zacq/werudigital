"use client";

import { motion } from "framer-motion";

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
        {/* Copyright */}
        <div className="text-center">
          <p className="text-[10px] text-white/60">
            © {new Date().getFullYear()} Weru Digital. All rights reserved.
          </p>
          <a
            href="https://werudigital.co.ke/connect"
            className="text-[10px] text-white/40 mt-0.5 block hover:text-white/60 transition-colors"
          >
            werudigital.co.ke/connect
          </a>
          <a
            href="https://neuraflow.cloud/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-white/30 mt-2 block hover:text-white/50 transition-colors"
          >
            Developed by Neura
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
