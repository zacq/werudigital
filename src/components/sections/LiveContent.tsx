"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// Launch date — adjust to Weru TV's actual 10th anniversary date
const LAUNCH_DATE = new Date("2026-06-07T10:00:00+03:00");

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return timeLeft;
}

const previews = [
  { icon: "👕", hint: "Apparel",       label: "Merch Drop"   },
  { icon: "🏆", hint: "Limited Ed.",   label: "Collectibles" },
  { icon: "☕", hint: "Home & Living", label: "Lifestyle"    },
];

const GOLD   = "linear-gradient(180deg, #FFE78A 0%, #FFC93C 25%, #F5A300 55%, #D87A00 100%)";
const GOLD_S = "linear-gradient(135deg, #F5A300 0%, #D87A00 100%)";

export default function LiveContent() {
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH_DATE);

  return (
    <section
      className="relative z-10 pb-14 px-5 pt-10 overflow-hidden"
      style={{ background: "rgba(10,4,0,0.88)", backdropFilter: "blur(2px)" }}
    >
      {/* Deep red ambient glow top-right */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 50% at 90% 10%, rgba(200,16,46,0.10) 0%, transparent 70%)",
      }}/>
      {/* Gold ambient glow center */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 40% 30% at 50% 40%, rgba(245,163,0,0.06) 0%, transparent 70%)",
      }}/>

      {/* ── Section header ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-7"
      >
        <h2 className="text-xl font-bold text-white text-center">Shop</h2>
        <p className="text-xs text-white/60 mt-1 text-center">10th Anniversary Collection</p>
      </motion.div>

      {/* ── Main teaser card ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-sm mx-auto rounded-3xl overflow-hidden mb-5"
        style={{
          background: "linear-gradient(160deg, #1c0404 0%, #2e0808 55%, #1c0404 100%)",
          border: "1px solid rgba(200,16,46,0.22)",
          boxShadow: "0 0 50px rgba(200,16,46,0.12), inset 0 1px rgba(255,255,255,0.04)",
        }}
      >
        {/* Pulsating gold accent bar */}
        <div
          className="gold-pulse"
          style={{
            height: 3,
            background: "linear-gradient(90deg, transparent, #F5A300, #FFE78A, #F5A300, transparent)",
            borderRadius: 2,
          }}
        />

        <div className="p-6 text-center">

          {/* Pulsing COMING SOON badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5"
            style={{ background: "rgba(245,163,0,0.12)", border: "1px solid rgba(245,163,0,0.35)" }}
            animate={{ boxShadow: ["0 0 10px rgba(245,163,0,0.15)", "0 0 22px rgba(245,163,0,0.40)", "0 0 10px rgba(245,163,0,0.15)"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#F5A300" }}
              animate={{ opacity: [1, 0.25, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: "#FFD166" }}>
              Coming Soon
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h3
            className="text-3xl font-black mb-1 leading-tight"
            style={{ background: GOLD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            10th Anniversary
          </motion.h3>
          <p className="text-white/50 text-sm mb-1">Official Weru Digital Store</p>
          <p className="text-[11px] text-white/30 mb-6">Exclusive merchandise · Limited drops · Ships Kenya-wide</p>

          {/* ── Countdown ─────────────────────────────────────────── */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            {[
              { val: days,    label: "Days" },
              { val: hours,   label: "Hrs"  },
              { val: minutes, label: "Min"  },
              { val: seconds, label: "Sec"  },
            ].map(({ val, label }, i) => (
              <div key={label}>
                <motion.div
                  className="rounded-xl py-3 mb-1.5 relative overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
                  animate={label === "Sec" ? { borderColor: ["rgba(245,163,0,0.1)", "rgba(245,163,0,0.35)", "rgba(245,163,0,0.1)"] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <span
                    className="text-2xl font-black tabular"
                    style={{ background: GOLD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                  >
                    {String(val).padStart(2, "0")}
                  </span>
                </motion.div>
                <p className="text-[9px] text-white/35 uppercase tracking-[0.15em]">{label}</p>
              </div>
            ))}
          </div>

          {/* ── Waitlist CTA ──────────────────────────────────────── */}
          <motion.a
            href="https://wa.me/254700000000?text=Hi%20Weru%20Digital!%20I%20want%20to%20join%20the%2010th%20Anniversary%20Shop%20waitlist%20%F0%9F%8E%89"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-bold text-sm mb-2"
            style={{ background: GOLD_S, color: "#1a0404", boxShadow: "0 4px 18px rgba(245,163,0,0.30)" }}
            whileTap={{ scale: 0.97 }}
            whileHover={{ boxShadow: "0 6px 28px rgba(245,163,0,0.55)" }}
          >
            <span>💬</span> Join the Waitlist on WhatsApp
          </motion.a>
          <p className="text-[10px] text-white/25">Be the first to shop when we launch</p>
        </div>
      </motion.div>

      {/* ── Blurred product previews ───────────────────────────────── */}
      <motion.div
        className="flex gap-3 max-w-sm mx-auto"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {previews.map((p, i) => (
          <motion.div
            key={p.label}
            className="flex-1 rounded-2xl overflow-hidden relative flex flex-col items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              aspectRatio: "1",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
          >
            {/* Blurred icon hint */}
            <span className="text-4xl" style={{ opacity: 0.18, filter: "blur(3px)" }}>{p.icon}</span>

            {/* Lock icon */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
              <span className="text-base">🔒</span>
              <span className="text-[9px] font-semibold text-white/40 tracking-wide">{p.hint}</span>
            </div>

            {/* Bottom label */}
            <div
              className="absolute bottom-0 left-0 right-0 py-1.5"
              style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)" }}
            >
              <p className="text-[9px] text-white/40 text-center font-medium">{p.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Footer note ───────────────────────────────────────────── */}
      <motion.p
        className="text-center text-[10px] text-white/20 mt-5 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        Weru Digital · Est. 2016 · 10 Years of Broadcasting
      </motion.p>

    </section>
  );
}
