"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const GOLD = "linear-gradient(180deg, #FFE78A 0%, #FFC93C 25%, #F5A300 55%, #D87A00 100%)";

const questions = [
  {
    q: "When did Weru TV start broadcasting?",
    options: ["2012", "2016", "2014"],
    answer: 1,
  },
  {
    q: "What is American Extravaganza?",
    options: ["Weru TV 1st Anniversary", "A weekly music variety show", "A talent search competition"],
    answer: 0,
  },
  {
    q: "Which stand‑up comedy show once featured on Weru TV?",
    options: ["Churchill Show", "Laugh Factory Live", "Tuune Mbaru"],
    answer: 2,
  },
  {
    q: "Name three drama shows that aired on Weru TV.",
    options: [
      "Witho, Kaiguetie, Chibu Nkobotia",
      "Njagi, Mwenda, Karimi",
      "Mwisho wa Lami, Tahidi High, Inspekta Mwala",
    ],
    answer: 0,
  },
  {
    q: "Who hosts the Gikaro show on Weru TV?",
    options: ["Joyce Wangari", "Stella Karimi Kaunty", "Grace Muthoni"],
    answer: 1,
  },
  {
    q: "Who paired with Phineas Imaana for news bulletins in 2017?",
    options: ["Susan Karimi", "Anne Wanjiku", "Maureen Kinya"],
    answer: 2,
  },
  {
    q: "When does Gaaru E Ciaca air?",
    options: ["Wednesday 7:30 PM", "Friday 9:00 PM", "Thursday 8:20 PM"],
    answer: 2,
  },
  {
    q: "Who hosts Gichunki Gia Ciaca?",
    options: ["James Muriuki", "Martin Gichunge", "Peter Kimani"],
    answer: 1,
  },
  {
    q: "Where is Weru TV located?",
    options: ["Nyeri Town", "Embu, Eastern Kenya", "Kirogine, Meru"],
    answer: 2,
  },
  {
    q: "Name the first two hosts of Reggamania.",
    options: ["DJ Moto & MC Gee", "Empress Rita & Selector Prince", "Biggy Riddim & Lady Vibes"],
    answer: 1,
  },
];

type Phase = "quiz" | "submit" | "success";

function sanitizeName(raw: string): string {
  return raw.replace(/<[^>]*>/g, "").replace(/[<>"'`]/g, "").trim().slice(0, 120);
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

export default function QuizPromo() {
  const [phase, setPhase] = useState<Phase>("quiz");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(10).fill(null));
  const [dir, setDir] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "duplicate">("idle");
  const [errors, setErrors] = useState<{ name?: string; phone?: string; form?: string }>({});

  function selectAnswer(idx: number) {
    setAnswers(prev => {
      const next = [...prev];
      next[currentQ] = idx;
      return next;
    });
  }

  function goNext() {
    if (answers[currentQ] === null) return;
    setDir(1);
    if (currentQ === 9) {
      setPhase("submit");
    } else {
      setCurrentQ(q => q + 1);
    }
  }

  function goBack() {
    if (currentQ === 0) return;
    setDir(-1);
    setCurrentQ(q => q - 1);
  }

  function validateSubmit(): boolean {
    const e: typeof errors = {};
    if (!name.trim()) e.name = "Please enter your name";
    const cleanPhone = phone.replace(/\s/g, "");
    if (!cleanPhone) e.phone = "Please enter your phone number";
    else if (!/^(\+?254|0)[17]\d{8}$/.test(cleanPhone))
      e.phone = "Enter a valid Kenyan number (07xx / 01xx / +254…)";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateSubmit()) return;
    setSubmitStatus("loading");

    const answerTexts: Record<string, string> = {};
    questions.forEach((q, i) => {
      const selected = answers[i];
      answerTexts[`Q${i + 1}`] = selected !== null ? q.options[selected] : "";
    });

    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: sanitizeName(name), phone, answers: answerTexts }),
      });
      const data = await res.json();

      if (data.duplicate) {
        setSubmitStatus("duplicate");
        return;
      }
      if (!res.ok) {
        setErrors({ form: "Submission failed. Please try again." });
        setSubmitStatus("idle");
        return;
      }
      setPhase("success");
    } catch {
      setErrors({ form: "Network error. Please try again." });
      setSubmitStatus("idle");
    }
  }

  return (
    <section
      className="relative z-10 px-5 pt-12 pb-14 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #7A4500 0%, #5a2e00 50%, #3a1800 100%)" }}
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,163,0,0.28) 0%, transparent 70%)",
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 50% at 80% 80%, rgba(249,125,0,0.16) 0%, transparent 70%)",
      }} />

      {/* Promo badge */}
      <motion.div
        className="flex justify-center mb-6 relative"
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="gold-pulse inline-flex items-center gap-2 px-5 py-2 rounded-full"
          style={{ background: "rgba(245,163,0,0.18)", border: "1px solid rgba(245,163,0,0.55)" }}
        >
          <span>🏆</span>
          <span className="text-xs font-bold tracking-widest uppercase" style={{
            background: GOLD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            Limited Promo
          </span>
        </div>
      </motion.div>

      {/* Section title */}
      <motion.div
        className="text-center mb-7 relative"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.05 }}
      >
        <h2 className="text-2xl font-extrabold leading-tight" style={{
          fontFamily: "var(--font-nunito), 'Nunito', sans-serif",
          fontWeight: 800,
          background: GOLD,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.55))",
        }}>
          Weru Quiz Challenge
        </h2>
        <p className="text-xs text-white/50 mt-1">Answer. Win. Celebrate with us.</p>
      </motion.div>

      {/* Quiz card */}
      <motion.div
        className="max-w-sm mx-auto relative rounded-2xl overflow-hidden"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          background: "rgba(10,4,2,0.88)",
          border: "1px solid rgba(245,163,0,0.30)",
          boxShadow: "0 0 32px rgba(245,163,0,0.18), 0 16px 48px rgba(0,0,0,0.60)",
        }}
      >
        {/* Gold top accent */}
        <div style={{ height: 3, background: "linear-gradient(90deg, transparent, #F5A300, #FFE78A, #F5A300, transparent)" }} />

        <div className="px-5 pt-5 pb-6">
          <AnimatePresence mode="wait" custom={dir}>
            {phase === "quiz" && (
              <motion.div
                key={`q-${currentQ}`}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: "easeOut" as const }}
              >
                {/* Header */}
                <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "#F5A300" }}>
                  Celebrating 10 Years
                </p>
                <h3 className="text-xl font-extrabold text-white mb-1 leading-tight" style={{
                  fontFamily: "var(--font-nunito), 'Nunito', sans-serif", fontWeight: 800,
                }}>
                  10 for 10: Castle Escape
                </h3>
                <p className="text-[11px] text-white/50 mb-4 leading-relaxed">
                  Answer all 10 questions and stand a chance to win a one-night stay at{" "}
                  <span style={{ color: "#F5A300" }}>Tafaria Castle</span>.
                </p>

                {/* Divider + counter */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#F5A300" }}>
                      Weru TV History
                    </p>
                    <div style={{ height: 2, width: 40, background: "#F5A300", marginTop: 3, borderRadius: 1 }} />
                  </div>
                  <span className="text-xs font-bold" style={{ color: "#F5A300" }}>
                    {currentQ + 1} / 10
                  </span>
                </div>

                {/* Question */}
                <p className="text-base font-bold text-white leading-snug mb-5">
                  {questions[currentQ].q}
                </p>

                {/* Options */}
                <div className="flex flex-col gap-2 mb-6">
                  {questions[currentQ].options.map((opt, i) => {
                    const selected = answers[currentQ] === i;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => selectAnswer(i)}
                        className="flex items-center gap-3 w-full rounded-xl px-4 py-3 text-left transition-all"
                        style={{
                          background: selected ? "rgba(245,163,0,0.12)" : "rgba(255,255,255,0.04)",
                          border: `1px solid ${selected ? "#F5A300" : "rgba(255,255,255,0.12)"}`,
                        }}
                      >
                        <span
                          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold"
                          style={{
                            background: selected ? "#F5A300" : "rgba(255,255,255,0.10)",
                            color: selected ? "#1a0800" : "rgba(255,255,255,0.6)",
                          }}
                        >
                          {i + 1}
                        </span>
                        <span className="text-sm font-medium" style={{ color: selected ? "#FFE78A" : "rgba(255,255,255,0.80)" }}>
                          {opt}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  {currentQ > 0 ? (
                    <button
                      type="button"
                      onClick={goBack}
                      className="text-xs text-white/40 hover:text-white/70 transition-colors"
                    >
                      ← Back
                    </button>
                  ) : (
                    <span />
                  )}
                  <motion.button
                    type="button"
                    onClick={goNext}
                    disabled={answers[currentQ] === null}
                    className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
                    style={{
                      background: answers[currentQ] !== null
                        ? "linear-gradient(135deg, #7A5200, #5a3a00)"
                        : "rgba(255,255,255,0.06)",
                      color: answers[currentQ] !== null ? "#FFE78A" : "rgba(255,255,255,0.25)",
                      border: `1px solid ${answers[currentQ] !== null ? "rgba(245,163,0,0.40)" : "rgba(255,255,255,0.08)"}`,
                      cursor: answers[currentQ] !== null ? "pointer" : "not-allowed",
                    }}
                    whileTap={{ scale: answers[currentQ] !== null ? 0.96 : 1 }}
                  >
                    {currentQ === 9 ? "Submit Entry →" : "Next →"}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {phase === "submit" && (
              <motion.div
                key="submit"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "#F5A300" }}>
                  Almost There!
                </p>
                <h3 className="text-xl font-extrabold text-white mb-1" style={{
                  fontFamily: "var(--font-nunito), 'Nunito', sans-serif", fontWeight: 800,
                }}>
                  Submit Your Entry
                </h3>
                <p className="text-[11px] text-white/50 mb-5">
                  Complete all 10 answers. Leave your details to enter the draw.
                </p>

                <form onSubmit={handleSubmit} noValidate>
                  {/* Name */}
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: undefined })); }}
                      className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: `1px solid ${errors.name ? "#C8102E" : "rgba(255,255,255,0.12)"}`,
                      }}
                    />
                    {errors.name && <p className="text-[11px] text-red-400 mt-1 pl-1">{errors.name}</p>}
                  </div>

                  {/* Phone */}
                  <div className="mb-5">
                    <input
                      type="tel"
                      placeholder="Phone Number (07xx…)"
                      value={phone}
                      onChange={e => { setPhone(e.target.value); setErrors(p => ({ ...p, phone: undefined })); }}
                      className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: `1px solid ${errors.phone ? "#C8102E" : "rgba(255,255,255,0.12)"}`,
                      }}
                    />
                    {errors.phone && <p className="text-[11px] text-red-400 mt-1 pl-1">{errors.phone}</p>}
                    {submitStatus === "duplicate" && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[11px] text-amber-400 mt-2 pl-1 leading-relaxed"
                      >
                        ⚠️ This number has already entered. Double submission will lead to <strong>disqualification</strong>.
                      </motion.p>
                    )}
                    {errors.form && <p className="text-[11px] text-red-400 mt-1 pl-1">{errors.form}</p>}
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => { setPhase("quiz"); setCurrentQ(9); setDir(-1); }}
                      className="text-xs text-white/40 hover:text-white/70 transition-colors"
                    >
                      ← Review answers
                    </button>
                    <motion.button
                      type="submit"
                      disabled={submitStatus === "loading" || submitStatus === "duplicate"}
                      className="px-5 py-2.5 rounded-xl text-sm font-bold"
                      style={{
                        background: submitStatus === "loading" || submitStatus === "duplicate"
                          ? "rgba(245,163,0,0.30)"
                          : "linear-gradient(135deg, #F5A300, #D87A00)",
                        color: submitStatus === "loading" || submitStatus === "duplicate" ? "rgba(255,255,255,0.35)" : "#1a0800",
                        cursor: submitStatus === "loading" || submitStatus === "duplicate" ? "not-allowed" : "pointer",
                      }}
                      whileTap={{ scale: submitStatus === "idle" ? 0.96 : 1 }}
                    >
                      {submitStatus === "loading" ? "Submitting…" : submitStatus === "duplicate" ? "Already Entered" : "Submit Entry →"}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}

            {phase === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center py-6"
              >
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-xl font-extrabold text-white mb-2" style={{
                  fontFamily: "var(--font-nunito), 'Nunito', sans-serif", fontWeight: 800,
                }}>
                  Entry Submitted!
                </h3>
                <p className="text-sm text-white/60 mb-1">
                  You&apos;re in the draw for a night at{" "}
                  <span style={{ color: "#F5A300" }}>Tafaria Castle</span>.
                </p>
                <p className="text-xs text-white/35 mt-4">
                  Winner announced live on Weru TV. Good luck! 🏆
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Upcoming promos hint */}
      {phase !== "success" && (
        <p className="text-center text-[11px] text-white/30 mt-5 relative">
          More prizes coming soon — Lea Premium & Yetu Sacco
        </p>
      )}
    </section>
  );
}
