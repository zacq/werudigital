"use client";

import { motion } from "framer-motion";
import GlassButton from "@/components/ui/GlassButton";

const actions = [
  { icon: "📞", label: "Call Hotline", href: "tel:+254700000000", hint: "+254 700 000 000" },
  { icon: "💬", label: "WhatsApp", href: "https://wa.me/254700000000", hint: "Chat with us" },
  { icon: "✉️", label: "Email Us", href: "mailto:info@werudigital.co.ke", hint: "info@werudigital.co.ke" },
  { icon: "📍", label: "Find Us", href: "https://maps.google.com/?q=Weru+TV+Kenya", hint: "Get directions" },
];

export default function ContactHub() {
  return (
    <section className="relative z-10 px-5 pt-10 pb-12" style={{ background: "#f97d00" }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-5"
      >
        <h2 className="text-xl font-bold text-[#111111]">Get in Touch</h2>
        <p className="text-xs text-[#111111]/70 mt-1">We&apos;re always on air for you</p>
      </motion.div>

      <motion.div
        className="glass-strong max-w-sm mx-auto p-5 flex flex-col gap-3"
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.12), 0 12px 40px rgba(0,0,0,0.5)" }}
      >
        {actions.map((action, i) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
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
                <span className="text-[10px] text-white/60 font-normal">{action.hint}</span>
              </div>
            </GlassButton>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
