"use client";

import { motion } from "framer-motion";

const GOLD = "linear-gradient(180deg, #FFE78A 0%, #FFC93C 25%, #F5A300 55%, #D87A00 100%)";

const cards = [
  {
    emoji: "🎯",
    headline: "10 for 10: Castle Escape",
    sub: "10 questions for 10 years – win a night at Tafaria",
    cta: "Start Quiz →",
    href: "https://werudigital.co.ke/quiz",
    animation: "explode" as const,
    delay: 0,
  },
  {
    emoji: "🌾",
    headline: "2 Bales of Lea Premium Unga",
    sub: "10 years of feeding the nation – we're filling your family's kitchen to say thank you",
    cta: "Coming Soon",
    href: null, // activate: add link + change cta to "Play & Win →"
    animation: "implode" as const,
    delay: 0.12,
  },
  {
    emoji: "🏦",
    headline: "Win a Ksh 5,000 Yetu Sacco Account",
    sub: "Our 10th year, your new beginning – start your savings journey with Yetu Sacco, on us",
    cta: "Coming Soon",
    href: null, // activate: add link + change cta to "Join Now →"
    animation: "explode" as const,
    delay: 0.22,
  },
];

function cardVariants(type: "explode" | "implode", delay: number) {
  const initial =
    type === "explode"
      ? { scale: 0, opacity: 0 }
      : { scale: 2.2, opacity: 0 };

  return {
    initial,
    whileInView: { scale: 1, opacity: 1 },
    viewport: { once: true, margin: "-40px" },
    transition:
      type === "explode"
        ? { type: "spring" as const, stiffness: 500, damping: 18, delay }
        : { type: "spring" as const, stiffness: 280, damping: 24, delay },
  };
}

export default function QuizPromo() {
  return (
    <section
      className="relative z-10 px-5 pt-12 pb-14 overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #7A4500 0%, #5a2e00 50%, #3a1800 100%)",
      }}
    >
      {/* Ambient gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,163,0,0.30) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 80%, rgba(249,125,0,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Promo badge */}
      <motion.div
        className="flex justify-center mb-7 relative"
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="gold-pulse inline-flex items-center gap-2 px-5 py-2 rounded-full"
          style={{
            background: "rgba(245,163,0,0.18)",
            border: "1px solid rgba(245,163,0,0.55)",
          }}
        >
          <span>🏆</span>
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{ background: GOLD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          >
            Limited Promo
          </span>
        </motion.div>
      </motion.div>

      {/* Section title */}
      <motion.div
        className="text-center mb-8 relative"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.05 }}
      >
        <h2
          className="text-2xl font-extrabold leading-tight"
          style={{
            fontFamily: "var(--font-nunito), 'Nunito', sans-serif",
            fontWeight: 800,
            background: GOLD,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.55))",
          }}
        >
          Weru Quiz Challenge
        </h2>
        <p className="text-xs text-white/50 mt-1">Answer. Win. Celebrate with us.</p>
      </motion.div>

      {/* Cards */}
      <div className="flex flex-col gap-4 max-w-sm mx-auto relative">
        {cards.map((card) => {
          const anim = cardVariants(card.animation, card.delay);
          const isActive = card.href !== null;

          const cardContent = (
            <div className="flex items-start gap-4">
              <span className="text-4xl leading-none">{card.emoji}</span>
              <div className="flex-1 min-w-0">
                <p
                  className="font-extrabold text-lg leading-tight mb-1"
                  style={{
                    fontFamily: "var(--font-nunito), 'Nunito', sans-serif",
                    fontWeight: 800,
                    background: GOLD,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {card.headline}
                </p>
                <p className="text-[11px] text-white/60 leading-snug mb-3">{card.sub}</p>
                <div
                  className="inline-block rounded-full px-4 py-1.5 text-xs font-bold"
                  style={{
                    background: isActive ? GOLD : "rgba(245,163,0,0.30)",
                    color: isActive ? "#1a0800" : "rgba(255,255,255,0.45)",
                  }}
                >
                  {card.cta}
                </div>
              </div>
            </div>
          );

          const sharedMotionProps = {
            className: "glass-warm glow-gold block rounded-2xl p-5",
            style: {
              border: "1px solid rgba(245,163,0,0.40)",
              textDecoration: "none",
              cursor: isActive ? "pointer" : "default",
            },
            animate: {
              boxShadow: [
                "0 0 14px rgba(245,163,0,0.25), 0 4px 20px rgba(0,0,0,0.40)",
                "0 0 32px rgba(245,163,0,0.55), 0 4px 24px rgba(0,0,0,0.50)",
                "0 0 14px rgba(245,163,0,0.25), 0 4px 20px rgba(0,0,0,0.40)",
              ],
            },
            transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" as const },
            ...(isActive && { whileHover: { scale: 1.03, y: -3 }, whileTap: { scale: 0.97 } }),
          };

          return (
            <motion.div key={card.headline} {...anim}>
              {isActive ? (
                <motion.a
                  href={card.href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...sharedMotionProps}
                >
                  {cardContent}
                </motion.a>
              ) : (
                <motion.div {...sharedMotionProps}>
                  {cardContent}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
