"use client";

import { motion } from "framer-motion";
import GlassButton from "@/components/ui/GlassButton";

const actions = [
  { icon: "📞", label: "Call Hotline", href: "tel:+254700000000",                         hint: "+254 700 000 000"       },
  { icon: "💬", label: "WhatsApp",     href: "https://wa.me/254700000000",                hint: "Chat with us"          },
  { icon: "✉️", label: "Email Us",     href: "mailto:info@werudigital.co.ke",             hint: "info@werudigital.co.ke"},
  { icon: "📍", label: "Find Us",      href: "https://maps.google.com/?q=Weru+TV+Kenya", hint: "Get directions"        },
];

export default function ContactHub() {
  return (
    <section
      className="relative z-10 px-5 pt-12 pb-14 overflow-hidden"
      style={{ background: "rgba(14,6,0,0.80)", backdropFilter: "blur(2px)" }}
    >
      {/* Warm amber ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 70% 55% at 50% 100%, rgba(249,125,0,0.16) 0%, transparent 70%)",
      }}/>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 50% 40% at 20% 50%, rgba(200,16,46,0.08) 0%, transparent 70%)",
      }}/>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-6 relative"
      >
        <h2 className="text-xl font-bold text-white text-center balance">Get in Touch</h2>
        <p className="text-xs text-white/45 mt-1 text-center">We&apos;re always on air for you</p>
      </motion.div>

      <motion.div
        className="glass-strong max-w-sm mx-auto p-5 flex flex-col gap-3 relative"
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        style={{
          background: "rgba(0,0,0,0.50)",
          boxShadow: "0 0 0 1px rgba(249,125,0,0.12), 0 16px 48px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,200,100,0.10)",
        }}
      >
        {actions.map((action, i) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.38, delay: i * 0.09, ease: "easeOut" }}
          >
            <GlassButton
              href={action.href}
              variant="pill"
              icon={action.icon}
              fullWidth
              className="justify-start"
            >
              <div className="flex flex-col items-start">
                <span className="font-semibold text-sm text-white">{action.label}</span>
                <span className="text-[10px] text-white/55 font-normal">{action.hint}</span>
              </div>
            </GlassButton>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
