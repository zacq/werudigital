"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const INTERESTS = ["News", "Shows", "Business & Ads", "Entertainment", "Sports"];

const LS_CAPTURED  = "weru_lead_captured";   // never show again
const LS_DISMISSED = "weru_popup_dismissed"; // show again after 7 days
const REDISPLAY_MS = 7 * 24 * 60 * 60 * 1000;

function shouldShow(): boolean {
  if (typeof window === "undefined") return false;
  if (localStorage.getItem(LS_CAPTURED)) return false;
  const dismissed = localStorage.getItem(LS_DISMISSED);
  if (dismissed && Date.now() - Number(dismissed) < REDISPLAY_MS) return false;
  return true;
}

export default function LeadCaptureModal() {
  const [visible, setVisible]       = useState(false);
  const [name, setName]             = useState("");
  const [phone, setPhone]           = useState("");
  const [interests, setInterests]   = useState<string[]>(["News"]);
  const [errors, setErrors]         = useState<{ name?: string; phone?: string }>({});
  const [status, setStatus]         = useState<"idle" | "loading" | "success" | "duplicate">("idle");

  // Auto-show after 1.5 s, respecting suppression rules
  useEffect(() => {
    const t = setTimeout(() => { if (shouldShow()) setVisible(true); }, 1500);
    return () => clearTimeout(t);
  }, []);

  function dismiss() {
    localStorage.setItem(LS_DISMISSED, String(Date.now()));
    setVisible(false);
  }

  function toggleInterest(tag: string) {
    setInterests(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  }

  function validate(): boolean {
    const e: typeof errors = {};
    if (!name.trim())  e.name  = "Please enter your name";
    if (!phone.trim()) e.phone = "Please enter your phone number";
    else if (!/^(\+?254|0)[17]\d{8}$/.test(phone.replace(/\s/g, "")))
      e.phone = "Enter a valid Kenyan number (07xx / 01xx / +254…)";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, interests }),
    });

    const data = await res.json();

    if (!res.ok) {
      setStatus("idle");
      setErrors({ phone: "Something went wrong. Please try again." });
      return;
    }

    if (data.duplicate) {
      setStatus("duplicate");
      return;
    }

    localStorage.setItem(LS_CAPTURED, "true");
    setStatus("success");
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* ── Backdrop ──────────────────────────────────────────────── */}
          <motion.div
            className="fixed inset-0 z-50"
            style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(6px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={dismiss}
          />

          {/* ── Modal card ────────────────────────────────────────────── */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{ opacity: 0,    scale: 0.94,  y: 10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            // stop clicks on the card from bubbling to the backdrop
            onClick={e => e.stopPropagation()}
          >
            <div
              className="relative w-full max-w-sm rounded-3xl overflow-hidden"
              style={{
                background: "rgba(18,4,4,0.82)",
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
                border: "1px solid rgba(249,125,0,0.22)",
                boxShadow: "0 0 60px rgba(249,125,0,0.12), 0 24px 60px rgba(0,0,0,0.55)",
              }}
            >
              {/* Gold top accent */}
              <div style={{ height: 3, background: "linear-gradient(90deg, transparent, #F5A300, #FFE78A, #F5A300, transparent)" }} />

              {/* Close button */}
              <button
                onClick={dismiss}
                className="absolute top-4 right-4 text-white/40 hover:text-white/80 text-xl leading-none"
                aria-label="Close"
              >
                ✕
              </button>

              <div className="px-6 pb-7 pt-6 text-center">

                {/* Icon */}
                <div className="text-4xl mb-3">📺</div>

                {/* Heading */}
                <h2
                  className="text-xl font-black mb-1 text-white"
                  style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif", fontWeight: 800 }}
                >
                  Stay Updated with Weru TV
                </h2>
                <p className="text-xs text-white/55 mb-6 leading-relaxed">
                  Get exclusive content, show alerts &amp; news delivered to you.
                </p>

                {/* ── Success state ──────────────────────────────────── */}
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-6"
                  >
                    <div className="text-4xl mb-3">🎉</div>
                    <p className="text-white font-bold text-lg mb-1">You&apos;re on the list!</p>
                    <p className="text-white/55 text-sm">We&apos;ll be in touch with exclusive updates.</p>
                    <button
                      onClick={() => setVisible(false)}
                      className="mt-6 text-xs text-white/40 underline underline-offset-2"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>

                    {/* Name */}
                    <div className="mb-3 text-left">
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: undefined })); }}
                        className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/35 outline-none"
                        style={{
                          background: "rgba(255,255,255,0.07)",
                          border: `1px solid ${errors.name ? "#C8102E" : "rgba(255,255,255,0.10)"}`,
                        }}
                      />
                      {errors.name && <p className="text-[11px] text-red-400 mt-1 pl-1">{errors.name}</p>}
                    </div>

                    {/* Phone */}
                    <div className="mb-4 text-left">
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={e => { setPhone(e.target.value); setErrors(p => ({ ...p, phone: undefined })); }}
                        className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/35 outline-none"
                        style={{
                          background: "rgba(255,255,255,0.07)",
                          border: `1px solid ${errors.phone ? "#C8102E" : "rgba(255,255,255,0.10)"}`,
                        }}
                      />
                      {errors.phone && <p className="text-[11px] text-red-400 mt-1 pl-1">{errors.phone}</p>}
                      {status === "duplicate" && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-[11px] text-amber-400 mt-2 pl-1 leading-relaxed"
                        >
                          ⚠️ This number is already registered. Double submission &amp; wrong details will lead to <strong>disqualification</strong>.
                        </motion.p>
                      )}
                    </div>

                    {/* Interest chips */}
                    <div className="mb-5 text-left">
                      <p className="text-[11px] text-white/45 mb-2 pl-1">I&apos;m interested in:</p>
                      <div className="flex flex-wrap gap-2">
                        {INTERESTS.map(tag => {
                          const active = interests.includes(tag);
                          return (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => toggleInterest(tag)}
                              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                              style={{
                                background: active
                                  ? "linear-gradient(135deg, #F5A300, #D87A00)"
                                  : "rgba(255,255,255,0.08)",
                                border: `1px solid ${active ? "transparent" : "rgba(255,255,255,0.14)"}`,
                                color: active ? "#1a0404" : "rgba(255,255,255,0.7)",
                              }}
                            >
                              {tag}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={status === "loading" || status === "duplicate"}
                      className="w-full py-3.5 rounded-2xl font-bold text-sm mb-3"
                      style={{
                        background:
                          status === "loading" || status === "duplicate"
                            ? "rgba(245,163,0,0.35)"
                            : "linear-gradient(135deg, #F5A300 0%, #D87A00 100%)",
                        color: status === "duplicate" ? "rgba(255,255,255,0.35)" : "#1a0404",
                        boxShadow: "0 4px 18px rgba(245,163,0,0.30)",
                        fontFamily: "var(--font-nunito), 'Nunito', sans-serif",
                        fontWeight: 800,
                        cursor: status === "loading" || status === "duplicate" ? "not-allowed" : "pointer",
                      }}
                      whileTap={{ scale: status === "loading" || status === "duplicate" ? 1 : 0.97 }}
                    >
                      {status === "loading" ? "Subscribing…" : status === "duplicate" ? "Already Registered" : "Subscribe — It's Free"}
                    </motion.button>

                    {/* Dismiss */}
                    <button
                      type="button"
                      onClick={dismiss}
                      className="text-xs text-white/30 hover:text-white/55 transition-colors"
                    >
                      No thanks
                    </button>

                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
