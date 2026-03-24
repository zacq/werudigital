"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const ads = [
  {
    id: 1,
    brand: "Your Brand Here",
    tagline: "Reach thousands of engaged viewers daily",
    cta: "Advertise With Us",
    href: "mailto:ads@werudigital.co.ke",
    accent: "#f97d00",
  },
  {
    id: 2,
    brand: "Partner Spotlight",
    tagline: "Connect with Kenya's fastest-growing audience",
    cta: "Learn More",
    href: "mailto:ads@werudigital.co.ke",
    accent: "#f97d00",
  },
  {
    id: 3,
    brand: "Advertise on Weru",
    tagline: "TV · Radio · Digital — all in one package",
    cta: "Get in Touch",
    href: "mailto:ads@werudigital.co.ke",
    accent: "#C8102E",
  },
];

export default function AdZone() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % ads.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const ad = ads[current];

  return (
    <section className="relative z-10 px-5 pb-12">
      <div className="flex items-center justify-between mb-5 max-w-sm mx-auto">
        <div>
          <h2 className="text-xl font-bold text-white/90">Sponsored</h2>
          <p className="text-xs text-white/40 mt-1">Partner content</p>
        </div>
        <div className="flex gap-1.5">
          {ads.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "bg-[#f97d00] w-4" : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="max-w-sm mx-auto h-36 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={ad.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="glass absolute inset-0 p-5 flex flex-col justify-between"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: `1px solid ${ad.accent}44`,
              boxShadow: `0 0 24px ${ad.accent}22, 0 8px 32px rgba(0,0,0,0.25)`,
            }}
          >
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-1"
                style={{ color: ad.accent }}
              >
                {ad.brand}
              </p>
              <p className="text-sm text-white/80 leading-snug">{ad.tagline}</p>
            </div>
            <a
              href={ad.href}
              className="self-start text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 hover:opacity-80"
              style={{
                background: `${ad.accent}22`,
                border: `1px solid ${ad.accent}55`,
                color: ad.accent,
              }}
            >
              {ad.cta} →
            </a>

            {/* Accent corner glow */}
            <div
              className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${ad.accent}15, transparent 70%)`,
                transform: "translate(30%, -30%)",
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
